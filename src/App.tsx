import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Navbar from './components/Navbar'
import HeroSlide from './components/slides/HeroSlide'
import MissionSlide from './components/slides/MissionSlide'
import VisionSlide from './components/slides/VisionSlide'
import PillarsSlide from './components/slides/PillarsSlide'
import QuoteSlide from './components/slides/QuoteSlide'
import CTASlide from './components/slides/CTASlide'

const slides = [
  { id: 'hero', component: HeroSlide, bg: 'bg-cream' },
  { id: 'mission', component: MissionSlide, bg: 'bg-ink' },
  { id: 'vision', component: VisionSlide, bg: 'bg-warm' },
  { id: 'pillars', component: PillarsSlide, bg: 'bg-paper' },
  { id: 'quote', component: QuoteSlide, bg: 'bg-ink' },
  { id: 'cta', component: CTASlide, bg: 'bg-cream' },
]

function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef })
  
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(slides.length - 1) * 100}%`])

  return (
    <div className="h-screen overflow-hidden bg-ink">
      <Navbar />
      
      {/* Horizontal scroll container */}
      <div 
        ref={containerRef}
        className="h-screen overflow-y-scroll scrollbar-hide"
        style={{ scrollbarWidth: 'none' }}
      >
        {/* Spacer for scroll - each "page" of vertical scroll = one horizontal slide */}
        <div style={{ height: `${slides.length * 100}vh` }}>
          <div className="sticky top-0 h-screen overflow-hidden">
            <motion.div 
              style={{ x }}
              className="flex h-full"
            >
              {slides.map(({ id, component: SlideComponent, bg }, index) => (
                <div
                  key={id}
                  className={`flex-shrink-0 w-screen h-screen ${bg} relative overflow-hidden`}
                >
                  <SlideComponent index={index} progress={scrollYProgress} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <motion.div 
        className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-50"
      >
        {slides.map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-stone/30"
            style={{
              scale: useTransform(
                scrollYProgress,
                [(i - 0.5) / slides.length, i / slides.length, (i + 0.5) / slides.length],
                [1, 1.5, 1]
              ),
              opacity: useTransform(
                scrollYProgress,
                [(i - 0.5) / slides.length, i / slides.length, (i + 0.5) / slides.length],
                [0.3, 1, 0.3]
              ),
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default App
