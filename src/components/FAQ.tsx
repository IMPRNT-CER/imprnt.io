import { motion } from 'framer-motion'

export default function FAQ() {
  return (
    <section className="py-32 bg-paper relative">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-['Space_Mono'] text-xs text-accent tracking-[0.2em] uppercase">
            Questions
          </span>
          
          <h2 className="font-['Playfair_Display'] text-4xl font-bold text-ink mt-6">
            What to Expect
          </h2>
        </motion.div>

        <div className="space-y-6">
          {[
            {
              q: "When will Imprnt launch?",
              a: "We're working diligently to bring something meaningful to the world. Sign up to be notified when we're ready."
            },
            {
              q: "How can I get involved?",
              a: "We'll be sharing opportunities for researchers, supporters, and advocates to contribute to our mission. Stay tuned."
            },
            {
              q: "What makes Imprnt different?",
              a: "We're building at the intersection of technology and medicine, with a singular focus: eradicating cancer through innovation."
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 border border-ink/10 rounded-xl bg-cream"
            >
              <h3 className="font-semibold text-ink mb-2">{item.q}</h3>
              <p className="text-slate text-sm leading-relaxed">{item.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
