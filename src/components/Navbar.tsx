import { motion } from 'framer-motion'

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-ink/5"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="font-['Playfair_Display'] text-2xl font-bold text-ink tracking-tight">
          Imprnt
        </div>
        <div className="font-['Space_Mono'] text-xs text-stone tracking-widest uppercase">
          Coming Soon
        </div>
      </div>
    </motion.nav>
  )
}
