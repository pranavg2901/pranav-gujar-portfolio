import { Container } from '@/components/ui/Container'
import { Hero } from '@/components/sections/Hero'
import { Metrics } from '@/components/sections/Metrics'
import { Work } from '@/components/sections/Work'
import { Experience } from '@/components/sections/Experience'
import { Skills } from '@/components/sections/Skills'
import { Background } from '@/components/sections/Background'
import { Contact } from '@/components/sections/Contact'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function HomePage() {
  useDocumentTitle()

  return (
    <>
      <Hero />
      <Metrics />

      {/* Rides up over the dark band on a large radius, so the two surfaces
          overlap rather than butting together in a straight seam. */}
      <div className="relative -mt-12 rounded-t-[2.5rem] bg-surface md:-mt-16 md:rounded-t-[3.5rem]">
        <Container>
          <Work />
          <Experience />
          <Skills />
          <Background />
          <Contact />
        </Container>
      </div>
    </>
  )
}
