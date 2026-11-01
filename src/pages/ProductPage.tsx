import { useParams } from 'react-router-dom'
import { StudyArticle } from '@/components/study/StudyArticle'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { products } from '@/content/products'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

/**
 * The page for an employer's product, at /work/<slug>.
 *
 * Same article as a case study, with one deliberate difference in the
 * labelling: the eyebrow names the company rather than calling it a case
 * study, and the first fact says who owns it. A reader should not have to
 * work out which of these I built for myself and which I was paid to build.
 */
export function ProductPage() {
  const { slug } = useParams<{ slug: string }>()
  const index = products.findIndex((product) => product.slug === slug)
  const product = index === -1 ? undefined : products[index]

  useDocumentTitle(product?.name)

  if (!product) return <NotFoundPage />

  // Wraps, so the last product points back at the first rather than ending
  // on nothing.
  const next = products.length > 1 ? products[(index + 1) % products.length] : undefined

  return (
    <StudyArticle
      back={{ to: '/#experience', label: 'All experience' }}
      eyebrow={`${product.company} / ${product.period}`}
      title={product.name}
      subtitle={product.fullName}
      tags={product.tags}
      links={product.links}
      study={product.study}
      next={
        next && next.slug !== product.slug
          ? { to: `/work/${next.slug}`, label: 'Next product', name: next.name }
          : undefined
      }
    />
  )
}
