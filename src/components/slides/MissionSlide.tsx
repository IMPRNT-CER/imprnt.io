import { motion, useTransform, MotionValue } from 'framer-motion'

interface SlideProps {
  index: number
  progress: MotionValue<number>
}

export default function MissionSlide({ index, progress }: SlideProps) {
  const slideStart = index / 6
  const slideEnd = (index + 1) / 6
  const slideMid = (slideStart + slideEnd) / 2
  
  const opacity = useTransform(progress, [slideStart, slideStart + 0.05, slideEnd - 0.05, slideEnd], [0, 1, 1, 0])
  const textX = useTransform(progress, [slideStart, slideMid], [100, 0])
  const lineScale = useTransform(progress, [slideStart + 0.05, slideMid], [0, 1])

  return (
    <div className="relative w-full h-full flex items-center overflow-hidden">
      {/* Background accent line */}
      <motion.div 
        className="absolute left-0 top-1/2 h-px bg-gradient-to-r from-accent via-accent to-transparent"
        style={{ 
          width: '100%',
          scaleX: lineScale,
          transformOrigin: 'left',
          opacity 
        }}
      />
      
      {/* Floating particles */}
      <motion.div style={{ opacity }} className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent/30 rounded-full"
            style={{
              left: `${10 + (i * 4)}%`,
              top: `${20 + (i % 5) * 15}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 lg:px-16">
        <motion.div style={{ opacity, x: textX }}>
          <span className="font-['Space_Mono'] text-xs text-accent tracking-[0.3em] uppercase">
            Our Mission
          </span>
          
          <h2 className="font-['Playfair_Display'] text-5xl sm:text-6xl lg:text-7xl font-bold text-cream mt-6 mb-8 leading-[1.1]">
            Making an
            <br />
            <span className="text-gold">Imprint</span>
            <br />
            on Medicine
          </h2>
          
          <p className="text-xl text-stone max-w-xl leading-relaxed">
            We believe cancer can be beaten. Through relentless research, 
            innovative technology, and unwavering commitment, we're working 
            to make cancer a thing of the past.
          </p>
        </motion.div>
      </div>

      {/* Large decorative number */}
      <motion.div 
        className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 font-['Playfair_Display'] text-[20rem] font-bold text-cream/[0.03] select-none"
        style={{ opacity }}
      >
        01
      </motion.div>
    </div>
  )
}
