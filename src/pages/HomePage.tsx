import { Container } from '@/components/ui/Container'
import { Hero, Marquee } from '@/components/sections/Hero'
import { Metrics } from '@/components/sections/Metrics'
import { Work } from '@/components/sections/Work'
import { About } from '@/components/sections/About'
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
      <Marquee />
      <Container>
        <Metrics />
        <Work />
        <About />
        <Experience />
        <Skills />
        <Background />
        <Contact />
      </Container>
    </>
  )
}
