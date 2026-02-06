import type { Meta, StoryObj } from '@storybook/react'
import { useMotionValue } from 'framer-motion'
import HeroSlide from './HeroSlide'
import MissionSlide from './MissionSlide'
import VisionSlide from './VisionSlide'
import PillarsSlide from './PillarsSlide'
import QuoteSlide from './QuoteSlide'
import CTASlide from './CTASlide'

// Wrapper to provide mock progress value
const SlideWrapper = ({ 
  children, 
  bg = 'bg-cream' 
}: { 
  children: React.ReactNode
  bg?: string 
}) => {
  return (
    <div className={`w-full h-screen ${bg}`}>
      {children}
    </div>
  )
}

// Mock progress for stories
const MockSlide = ({ 
  Component, 
  bg 
}: { 
  Component: React.ComponentType<{ index: number; progress: any }>
  bg: string 
}) => {
  const progress = useMotionValue(0.5) // Middle of animation
  return (
    <SlideWrapper bg={bg}>
      <Component index={0} progress={progress} />
    </SlideWrapper>
  )
}

const meta = {
  title: 'Slides',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta

export const Hero: StoryObj = {
  render: () => <MockSlide Component={HeroSlide} bg="bg-cream" />,
}

export const Mission: StoryObj = {
  render: () => <MockSlide Component={MissionSlide} bg="bg-ink" />,
}

export const Vision: StoryObj = {
  render: () => <MockSlide Component={VisionSlide} bg="bg-warm" />,
}

export const Pillars: StoryObj = {
  render: () => <MockSlide Component={PillarsSlide} bg="bg-paper" />,
}

export const Quote: StoryObj = {
  render: () => <MockSlide Component={QuoteSlide} bg="bg-ink" />,
}

export const CTA: StoryObj = {
  render: () => <MockSlide Component={CTASlide} bg="bg-cream" />,
}

// All slides in sequence
export const AllSlides: StoryObj = {
  render: () => {
    const progress = useMotionValue(0)
    const slides = [
      { Component: HeroSlide, bg: 'bg-cream' },
      { Component: MissionSlide, bg: 'bg-ink' },
      { Component: VisionSlide, bg: 'bg-warm' },
      { Component: PillarsSlide, bg: 'bg-paper' },
      { Component: QuoteSlide, bg: 'bg-ink' },
      { Component: CTASlide, bg: 'bg-cream' },
    ]
    
    return (
      <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
        {slides.map(({ Component, bg }, i) => (
          <div key={i} className={`flex-shrink-0 w-screen h-screen ${bg} snap-start`}>
            <Component index={i} progress={progress} />
          </div>
        ))}
      </div>
    )
  },
}
