import { motion } from 'framer-motion'

export default function Testimonials() {
  return (
    <section className="py-32 bg-warm relative overflow-hidden">
      <div className="absolute inset-0 pattern-dots" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-['Space_Mono'] text-xs text-accent tracking-[0.2em] uppercase">
            Why This Matters
          </span>
          
          <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-ink mt-6 mb-16">
            Every Life is Worth Fighting For
          </h2>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="text-6xl text-accent/20 font-serif absolute -top-4 left-0">"</div>
          <p className="text-2xl sm:text-3xl text-ink font-['Playfair_Display'] italic leading-relaxed pl-8">
            The day cancer becomes a manageable condition—not a death sentence—is the day 
            humanity takes one of its greatest leaps forward.
          </p>
          <div className="mt-8 text-stone font-['Space_Mono'] text-sm">
            — The Vision We Share
          </div>
        </motion.blockquote>
      </div>
    </section>
  )
}
