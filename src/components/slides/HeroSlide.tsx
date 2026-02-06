import { motion, useTransform, MotionValue } from 'framer-motion'

interface SlideProps {
  index: number
  progress: MotionValue<number>
}

export default function HeroSlide({ index, progress }: SlideProps) {
  const slideStart = index / 6
  const slideEnd = (index + 1) / 6
  
  const opacity = useTransform(progress, [slideStart, slideStart + 0.05, slideEnd - 0.05, slideEnd], [0, 1, 1, 0])
  const y = useTransform(progress, [slideStart, slideStart + 0.1], [100, 0])
  const scale = useTransform(progress, [slideStart, slideStart + 0.1, slideEnd - 0.05, slideEnd], [0.9, 1, 1, 0.9])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0"
        style={{ opacity }}
      >
        {/* Floating orbs */}
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,102,204,0.08) 0%, transparent 70%)',
            top: '10%',
            right: '10%',
          }}
          animate={{ 
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(201,169,98,0.06) 0%, transparent 70%)',
            bottom: '20%',
            left: '15%',
          }}
          animate={{ 
            y: [0, 20, 0],
            x: [0, -15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 pattern-grid opacity-30" />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-10 text-center max-w-5xl px-8"
        style={{ opacity, y, scale }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <span className="inline-block font-['Space_Mono'] text-xs text-accent tracking-[0.4em] uppercase">
            A New Beginning
          </span>
        </motion.div>

        <motion.h1
          className="font-['Playfair_Display'] text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-ink leading-[0.95] mb-8"
        >
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="block"
          >
            Eradicating
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="block text-gradient"
          >
            Cancer
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-xl sm:text-2xl text-slate font-light max-w-2xl mx-auto"
        >
          Through research. Through innovation.
          <br />
          <span className="text-stone">Through unwavering commitment.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-16 flex items-center justify-center gap-3"
        >
          <span className="font-['Space_Mono'] text-xs text-stone tracking-widest uppercase">
            Scroll to explore
          </span>
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-accent"
          >
            →
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
