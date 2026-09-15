import { ShoppingBag, Menu as MenuIcon, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

const NAV = [
  { label: 'Menu', href: '#menu' },
  { label: 'Bestsellers', href: '#bestsellers' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const { count, openCart } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100/70 bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-2.5">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-600 text-lg font-bold text-white shadow-soft">
            A
          </span>
          <span className="leading-tight">
            <span className="block font-display text-xl font-extrabold text-brand-700">
              Adithya
            </span>
            <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-stone-500">
              Bakery &amp; Fast Food
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-stone-600 transition-colors hover:text-brand-600"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={openCart}
            className="relative inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-105 active:scale-95"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-stone-900 px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full border border-brand-100 bg-white text-stone-700 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-brand-100 bg-cream px-4 pb-4 pt-2 md:hidden">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-xl px-3 py-3 text-sm font-medium text-stone-700 hover:bg-brand-50"
            >
              {n.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
