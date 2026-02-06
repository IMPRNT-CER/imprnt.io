import { motion, useTransform, MotionValue } from 'framer-motion'

interface SlideProps {
  index: number
  progress: MotionValue<number>
}

export default function VisionSlide({ index, progress }: SlideProps) {
  const slideStart = index / 6
  const slideEnd = (index + 1) / 6
  
  const opacity = useTransform(progress, [slideStart, slideStart + 0.05, slideEnd - 0.05, slideEnd], [0, 1, 1, 0])
  const cardY = useTransform(progress, [slideStart, slideStart + 0.1], [60, 0])

  const visions = [
    { 
      number: '01', 
      title: 'Research', 
      desc: 'Pushing the boundaries of what science can achieve',
      delay: 0 
    },
    { 
      number: '02', 
      title: 'Innovation', 
      desc: 'Technology that accelerates discovery tenfold',
      delay: 0.1 
    },
    { 
      number: '03', 
      title: 'Impact', 
      desc: 'Transforming lives, one breakthrough at a time',
      delay: 0.2 
    },
  ]

  return (
    <div className="relative w-full h-full flex items-center">
      <div className="absolute inset-0 pattern-dots opacity-50" />
      
      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 lg:px-16">
        <motion.div style={{ opacity }} className="mb-16">
          <span className="font-['Space_Mono'] text-xs text-accent tracking-[0.3em] uppercase">
            The Vision
          </span>
          <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-ink mt-4">
            Three Pillars of Change
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {visions.map((item, i) => (
            <motion.div
              key={item.number}
              style={{ opacity, y: cardY }}
              transition={{ delay: item.delay }}
              className="group"
            >
              <div className="relative p-8 bg-paper rounded-2xl border border-ink/5 card-lift overflow-hidden">
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <span className="font-['Space_Mono'] text-5xl font-bold text-ink/5 group-hover:text-accent/20 transition-colors duration-500">
                    {item.number}
                  </span>
                  <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-ink mt-4 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Corner accent */}
                <motion.div 
                  className="absolute bottom-0 right-0 w-16 h-16"
                  style={{
                    background: 'linear-gradient(135deg, transparent 50%, rgba(0,102,204,0.05) 50%)',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
