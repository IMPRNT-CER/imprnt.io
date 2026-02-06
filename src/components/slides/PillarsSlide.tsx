import { motion, useTransform, MotionValue } from 'framer-motion'

interface SlideProps {
  index: number
  progress: MotionValue<number>
}

export default function PillarsSlide({ index, progress }: SlideProps) {
  const slideStart = index / 6
  const slideEnd = (index + 1) / 6
  
  const opacity = useTransform(progress, [slideStart, slideStart + 0.05, slideEnd - 0.05, slideEnd], [0, 1, 1, 0])

  const features = [
    { title: 'Advanced Research Platform', status: 'In Development', icon: '◈' },
    { title: 'Data-Driven Discovery', status: 'In Development', icon: '◇' },
    { title: 'Global Collaboration', status: 'Coming Soon', icon: '○' },
    { title: 'Patient-Centered Care', status: 'Our Promise', icon: '△' },
  ]

  return (
    <div className="relative w-full h-full flex items-center">
      <div className="absolute inset-0 pattern-grid opacity-30" />
      
      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 lg:px-16">
        <motion.div style={{ opacity }} className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="font-['Space_Mono'] text-xs text-accent tracking-[0.3em] uppercase">
              What We're Building
            </span>
            <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-ink mt-4 mb-6">
              The Future of
              <br />
              Cancer Research
            </h2>
            <p className="text-slate leading-relaxed">
              Connecting researchers, accelerating discoveries, and ensuring 
              every advancement translates to real hope for real people.
            </p>
          </div>

          <div className="space-y-4">
            {features.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-6 p-6 bg-cream rounded-xl border border-ink/5 group hover:border-accent/20 transition-colors"
              >
                <span className="text-2xl text-accent/60 group-hover:text-accent transition-colors">
                  {item.icon}
                </span>
                <div className="flex-1">
                  <h3 className="font-medium text-ink">{item.title}</h3>
                  <span className="font-['Space_Mono'] text-xs text-gold tracking-wider uppercase">
                    {item.status}
                  </span>
                </div>
                <motion.span 
                  className="text-accent/40 group-hover:text-accent group-hover:translate-x-1 transition-all"
                >
                  →
                </motion.span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
