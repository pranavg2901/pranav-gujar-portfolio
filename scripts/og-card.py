"""Generates the 1200x630 card shown when the site is shared on LinkedIn.

The previous og:image was the square favicon, which a feed crops into a
meaningless strip of lime. This draws a real card at the exact size every
platform expects.

Dark on purpose: a feed is mostly white cards, so a near-black one with a lime
accent is the one that stops the scroll.

Run: python scripts/og-card.py
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

PUBLIC = Path(__file__).resolve().parent.parent / "public"
FONTS = Path("C:/Windows/Fonts")

W, H = 1200, 630
SCALE = 2  # Drawn at 2x and downscaled, which is what keeps the type crisp.

INK = "#050505"
LIME = "#c3f53c"
WHITE = "#f2f2f2"
MUTED = "#9b9b96"
GRID = "#171717"

NAME = "PRANAV GUJAR"
ROLE = "SOFTWARE ENGINEER"
LINE = "Backend systems and applied AI. I build Python services, data\npipelines and AI workflows, and run them in production."
STACK = "PYTHON  ·  FASTAPI  ·  LANGGRAPH  ·  POSTGRESQL  ·  DOCKER  ·  AWS"
URL = "pranavg2901.github.io"


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONTS / name), size * SCALE)


def px(value: int) -> int:
    return value * SCALE


def main() -> None:
    image = Image.new("RGB", (W * SCALE, H * SCALE), INK)
    draw = ImageDraw.Draw(image)

    # The same faint grid the site's hero sits on, so the card and the page
    # look like one thing.
    for x in range(0, W * SCALE, px(60)):
        draw.line([(x, 0), (x, H * SCALE)], fill=GRID, width=SCALE)
    for y in range(0, H * SCALE, px(60)):
        draw.line([(0, y), (W * SCALE, y)], fill=GRID, width=SCALE)

    # The favicon tile, so the card and the browser tab carry the same mark.
    tile = px(88)
    draw.rounded_rectangle(
        (px(72), px(64), px(72) + tile, px(64) + tile), radius=px(19), fill=LIME
    )
    p_font = font("arialbd.ttf", 62)
    left, top, right, bottom = p_font.getbbox("P")
    draw.text(
        (
            px(72) + (tile - (right - left)) / 2 - left,
            px(64) + (tile - (bottom - top)) / 2 - top,
        ),
        "P",
        font=p_font,
        fill=INK,
    )

    draw.text((px(184), px(88)), ROLE, font=font("consolab.ttf", 19), fill=LIME)
    draw.text(
        (px(184), px(120)),
        "2.5+ YEARS IN PRODUCTION  ·  PUNE, INDIA",
        font=font("consola.ttf", 17),
        fill=MUTED,
    )

    draw.text((px(72), px(250)), NAME, font=font("arialbd.ttf", 92), fill=WHITE)

    # The lime rule under the name is the same device the site uses to mark a
    # section, and it carries the colour down into the lower half of the card.
    draw.rectangle((px(72), px(372), px(230), px(378)), fill=LIME)

    draw.multiline_text(
        (px(72), px(412)),
        LINE,
        font=font("arial.ttf", 27),
        fill=MUTED,
        spacing=px(12),
    )

    draw.text((px(72), px(540)), STACK, font=font("consolab.ttf", 18), fill=LIME)

    url_font = font("consola.ttf", 18)
    draw.text(
        (W * SCALE - px(72) - draw.textlength(URL, font=url_font), px(540)),
        URL,
        font=url_font,
        fill=MUTED,
    )

    image.resize((W, H), Image.LANCZOS).save(PUBLIC / "og-card.png", optimize=True)
    size = (PUBLIC / "og-card.png").stat().st_size
    print(f"wrote public/og-card.png ({size // 1024}KB)")


if __name__ == "__main__":
    main()
