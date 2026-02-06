import { motion, useTransform, MotionValue } from 'framer-motion'

interface SlideProps {
  index: number
  progress: MotionValue<number>
}

export default function CTASlide({ index, progress }: SlideProps) {
  const slideStart = index / 6
  const slideEnd = (index + 1) / 6
  
  const opacity = useTransform(progress, [slideStart, slideStart + 0.05, slideEnd], [0, 1, 1])
  const y = useTransform(progress, [slideStart, slideStart + 0.1], [50, 0])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 pattern-dots opacity-30" />
      
      {/* Converging lines animation */}
      <motion.div style={{ opacity }} className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"
            style={{
              width: '200%',
              left: '-50%',
              top: `${20 + i * 10}%`,
              rotate: `${-10 + i * 2.5}deg`,
            }}
            animate={{
              x: ['-10%', '10%', '-10%'],
            }}
            transition={{
              duration: 10 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      <motion.div 
        className="relative z-10 text-center max-w-3xl px-8"
        style={{ opacity, y }}
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="inline-block mb-8"
        >
          <div className="w-20 h-20 rounded-full border-2 border-accent/30 flex items-center justify-center mx-auto">
            <div className="w-12 h-12 rounded-full border-2 border-accent/50 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-accent animate-pulse" />
            </div>
          </div>
        </motion.div>

        <h2 className="font-['Playfair_Display'] text-5xl sm:text-6xl font-bold text-ink mb-6">
          Be Part of
          <br />
          <span className="text-gradient">the Cure</span>
        </h2>
        
        <p className="text-xl text-slate mb-12">
          Join us on this journey. Together, we can leave an imprint that lasts forever.
        </p>

        <motion.div
          className="inline-flex items-center gap-4 px-10 py-5 bg-ink text-cream rounded-full cursor-pointer group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="font-['Space_Mono'] text-sm tracking-wider uppercase">
            Coming Soon
          </span>
          <motion.div 
            className="w-2 h-2 rounded-full bg-gold"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>

        <div className="mt-16 font-['Space_Mono'] text-xs text-stone">
          © {new Date().getFullYear()} Imprnt. Making an imprint on the future.
        </div>
      </motion.div>
    </div>
  )
}
