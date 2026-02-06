import { motion, useTransform, MotionValue } from 'framer-motion'

interface SlideProps {
  index: number
  progress: MotionValue<number>
}

export default function QuoteSlide({ index, progress }: SlideProps) {
  const slideStart = index / 6
  const slideEnd = (index + 1) / 6
  
  const opacity = useTransform(progress, [slideStart, slideStart + 0.05, slideEnd - 0.05, slideEnd], [0, 1, 1, 0])
  const quoteScale = useTransform(progress, [slideStart, slideStart + 0.1], [0.95, 1])
  const quoteY = useTransform(progress, [slideStart, slideStart + 0.1], [30, 0])

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Ambient glow */}
      <motion.div 
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,102,204,0.1) 0%, transparent 60%)',
          opacity,
        }}
      />

      {/* Floating quote marks */}
      <motion.div
        style={{ opacity }}
        className="absolute left-[10%] top-[20%] font-['Playfair_Display'] text-[15rem] text-cream/[0.03] select-none"
      >
        "
      </motion.div>
      <motion.div
        style={{ opacity }}
        className="absolute right-[10%] bottom-[20%] font-['Playfair_Display'] text-[15rem] text-cream/[0.03] select-none rotate-180"
      >
        "
      </motion.div>

      {/* Quote content */}
      <motion.div 
        className="relative z-10 max-w-4xl px-8 text-center"
        style={{ opacity, scale: quoteScale, y: quoteY }}
      >
        <span className="font-['Space_Mono'] text-xs text-accent tracking-[0.3em] uppercase mb-8 block">
          The Vision We Share
        </span>
        
        <blockquote className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-medium text-cream leading-[1.3] italic">
          The day cancer becomes a manageable condition—not a death sentence—is the day 
          humanity takes one of its greatest leaps forward.
        </blockquote>

        <div className="mt-12 flex items-center justify-center gap-4">
          <div className="w-12 h-px bg-gold/50" />
          <span className="font-['Space_Mono'] text-sm text-stone tracking-wider">
            Our North Star
          </span>
          <div className="w-12 h-px bg-gold/50" />
        </div>
      </motion.div>
    </div>
  )
}
