import { motion } from 'framer-motion'

export default function CTA() {
  return (
    <section className="py-32 bg-ink relative overflow-hidden">
      {/* Glows */}
      <div className="glow-soft glow-accent w-[500px] h-[500px] -bottom-40 left-1/2 -translate-x-1/2 opacity-20" />
      
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-cream mb-6">
            Be Part of the Cure
          </h2>
          
          <p className="text-xl text-stone mb-12">
            Join us on this journey. Together, we can leave an imprint that lasts forever.
          </p>

          <div className="inline-flex items-center gap-4 px-8 py-4 border border-cream/20 rounded-full">
            <span className="font-['Space_Mono'] text-cream text-sm tracking-wider">
              Updates Coming Soon
            </span>
            <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
