import { motion } from 'framer-motion'

export default function About() {
  return (
    <section className="py-32 bg-paper relative overflow-hidden">
      <div className="absolute inset-0 pattern-grid opacity-50" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-['Space_Mono'] text-xs text-accent tracking-[0.2em] uppercase">
            Our Mission
          </span>
          
          <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-ink mt-6 mb-8">
            Making an Imprint on the Future of Medicine
          </h2>
          
          <p className="text-lg text-slate leading-relaxed max-w-2xl mx-auto">
            We believe cancer can be beaten. Through relentless research, 
            innovative technology, and unwavering commitment, we're working 
            to make cancer a thing of the past.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 grid sm:grid-cols-3 gap-8"
        >
          {[
            { number: "01", title: "Research", desc: "Pushing the boundaries of what's possible" },
            { number: "02", title: "Innovation", desc: "Technology that accelerates discovery" },
            { number: "03", title: "Impact", desc: "Transforming lives, one breakthrough at a time" },
          ].map((item, i) => (
            <div key={i} className="text-left p-6">
              <span className="font-['Space_Mono'] text-xs text-stone">{item.number}</span>
              <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-ink mt-2 mb-3">
                {item.title}
              </h3>
              <p className="text-stone text-sm">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
