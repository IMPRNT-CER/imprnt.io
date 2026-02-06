import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pattern-dots" />
      
      {/* Floating glows */}
      <div className="glow-soft glow-accent w-[800px] h-[800px] -top-40 -right-40 animate-float-slow opacity-30" />
      <div className="glow-soft glow-warm w-[600px] h-[600px] -bottom-40 -left-40 animate-float opacity-20" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block font-['Space_Mono'] text-xs text-accent tracking-[0.3em] uppercase mb-8">
            A New Chapter Begins
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-['Playfair_Display'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-ink leading-[1.1] mb-8"
        >
          Eradicating
          <br />
          <span className="text-gradient">Cancer</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl sm:text-2xl text-slate font-light leading-relaxed max-w-2xl mx-auto mb-12"
        >
          Advancing research. Accelerating cures.
          <br />
          <span className="text-stone">Something transformative is coming.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <div className="px-8 py-4 bg-ink text-cream font-['Space_Mono'] text-sm tracking-wider rounded-full">
            Coming Soon
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-stone/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 bg-stone/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
