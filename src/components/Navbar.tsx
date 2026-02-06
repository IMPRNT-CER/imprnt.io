import { motion } from 'framer-motion'

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 mix-blend-difference"
    >
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        <div className="font-['Playfair_Display'] text-2xl font-bold text-white tracking-tight">
          Imprnt
        </div>
        <div className="font-['Space_Mono'] text-xs text-white/70 tracking-[0.2em] uppercase">
          Coming Soon
        </div>
      </div>
    </motion.nav>
  )
}
