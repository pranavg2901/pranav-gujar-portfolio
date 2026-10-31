"""Generates every favicon file from one source of truth.

The letter is a real typeface glyph — Arial Bold's uppercase P — rather than
shapes drawn by hand. Hand-drawn geometry kept reading as a lowercase p at
16px; a type designer already solved the proportions.

The glyph outline is converted to an SVG path with fontTools, so the SVG and
the PNGs are the same letterform and no font has to be present on the
visitor's machine for the SVG to render correctly.

Run: python scripts/favicon.py
"""

from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

FONT = Path("C:/Windows/Fonts/arialbd.ttf")
PUBLIC = Path(__file__).resolve().parent.parent / "public"

LIME = "#c3f53c"
INK = "#050505"
SIZE = 64          # SVG viewBox, and the PNG grid before scaling
RADIUS = 14        # Rounded-corner radius on the tile
CAP_HEIGHT = 40    # How tall the P stands inside the 64-unit tile
GLYPH = "P"


def glyph_path() -> str:
    """Arial Bold's P as an SVG path, centred in the tile at CAP_HEIGHT tall."""
    font = TTFont(FONT)
    glyph_set = font.getGlyphSet()
    name = font.getBestCmap()[ord(GLYPH)]
    glyph = glyph_set[name]

    bounds = BoundsPen(glyph_set)
    glyph.draw(bounds)
    x_min, y_min, x_max, y_max = bounds.bounds

    scale = CAP_HEIGHT / (y_max - y_min)
    # Font space has y pointing up and SVG has it pointing down, hence the
    # negative y scale, then translate so the inked box sits dead centre.
    offset_x = (SIZE - (x_max - x_min) * scale) / 2 - x_min * scale
    offset_y = (SIZE + CAP_HEIGHT) / 2 + y_min * scale

    pen = SVGPathPen(glyph_set)
    glyph.draw(TransformPen(pen, (scale, 0, 0, -scale, offset_x, offset_y)))
    return pen.getCommands()


def write_svg(path: str) -> None:
    (PUBLIC / "favicon.svg").write_text(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" '
        'role="img" aria-label="Pranav Gujar">\n'
        "  <!-- Lime field, black letter: a dark icon disappears against dark\n"
        "       browser chrome, this stays findable in any tab strip. The P is\n"
        "       Arial Bold's glyph converted to a path by scripts/favicon.py,\n"
        "       so it needs no font installed and matches the PNG fallbacks\n"
        "       exactly. Edit the script, not this file. -->\n"
        f'  <rect width="64" height="64" rx="14" fill="{LIME}"/>\n'
        f'  <path d="{path}" fill="{INK}"/>\n'
        "</svg>\n",
        encoding="utf-8",
    )


def render_png(size: int) -> Image.Image:
    """Drawn at 4x and downscaled, which is what keeps 32px edges clean."""
    scale = 4
    box = size * scale
    image = Image.new("RGBA", (box, box), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle(
        (0, 0, box - 1, box - 1), radius=RADIUS / SIZE * box, fill=LIME
    )

    # Size the font by measured cap height rather than by nominal point size,
    # so the letter occupies the same share of the tile as it does in the SVG.
    target = CAP_HEIGHT / SIZE * box
    font = ImageFont.truetype(str(FONT), int(target))
    left, top, right, bottom = font.getbbox(GLYPH)
    font = ImageFont.truetype(str(FONT), int(target * target / (bottom - top)))
    left, top, right, bottom = font.getbbox(GLYPH)

    draw.text(
        ((box - (right - left)) / 2 - left, (box - (bottom - top)) / 2 - top),
        GLYPH,
        font=font,
        fill=INK,
    )
    return image.resize((size, size), Image.LANCZOS)


def main() -> None:
    write_svg(glyph_path())

    for size in (32, 180, 512):
        render_png(size).save(PUBLIC / f"favicon-{size}.png")

    # One .ico holding several sizes, for Windows and for older browsers that
    # ignore the SVG entirely.
    render_png(64).save(
        PUBLIC / "favicon.ico",
        sizes=[(16, 16), (32, 32), (48, 48), (64, 64)],
    )
    print("wrote favicon.svg, favicon-32/180/512.png, favicon.ico")


if __name__ == "__main__":
    main()
