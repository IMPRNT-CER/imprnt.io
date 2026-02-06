export default function Footer() {
  return (
    <footer className="py-12 bg-charcoal border-t border-cream/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-['Playfair_Display'] text-xl font-bold text-cream">
            Imprnt
          </div>
          
          <div className="font-['Space_Mono'] text-xs text-stone">
            © {new Date().getFullYear()} Imprnt. All rights reserved.
          </div>
          
          <div className="text-stone text-sm">
            Making an imprint on the future.
          </div>
        </div>
      </div>
    </footer>
  )
}
