import { motion } from 'framer-motion'

export default function Services() {
  return (
    <section className="py-32 bg-ink relative overflow-hidden">
      {/* Subtle glow */}
      <div className="glow-soft glow-accent w-[600px] h-[600px] top-0 right-0 opacity-10" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="font-['Space_Mono'] text-xs text-accent tracking-[0.2em] uppercase">
            What's Coming
          </span>
          
          <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-cream mt-6">
            The Future We're Building
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Advanced Research Platform",
              desc: "Connecting researchers worldwide to accelerate breakthroughs in cancer treatment.",
              status: "In Development"
            },
            {
              title: "Data-Driven Discovery",
              desc: "Harnessing AI and machine learning to identify patterns and potential cures faster.",
              status: "In Development"
            },
            {
              title: "Global Collaboration",
              desc: "Breaking down barriers between institutions to share knowledge and resources.",
              status: "Coming Soon"
            },
            {
              title: "Patient-Centered Innovation",
              desc: "Ensuring every advancement translates to real hope for real people.",
              status: "Our Promise"
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-8 border border-cream/10 rounded-2xl bg-charcoal/30 backdrop-blur-sm card-lift"
            >
              <span className="inline-block font-['Space_Mono'] text-xs text-gold tracking-wider uppercase mb-4">
                {item.status}
              </span>
              <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-cream mb-3">
                {item.title}
              </h3>
              <p className="text-stone text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
