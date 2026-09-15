import { motion } from 'framer-motion'
import { Plus, Star, Check } from 'lucide-react'
import { useState } from 'react'
import type { MenuItem } from '../types'
import { useCart } from '../context/CartContext'
import { formatINR } from '../utils/format'

const badgeStyles: Record<NonNullable<MenuItem['badge']>, string> = {
  Bestseller: 'bg-brand-600 text-white',
  New: 'bg-emerald-600 text-white',
  Veg: 'bg-green-100 text-green-700 ring-1 ring-green-600/30',
  Spicy: 'bg-red-100 text-red-700 ring-1 ring-red-500/30',
}

const FALLBACK =
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=70'

export default function MenuCard({ item }: { item: MenuItem }) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)
  const [imgSrc, setImgSrc] = useState(item.image)

  const handleAdd = () => {
    add(item)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1200)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-sm transition-shadow hover:shadow-soft"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={imgSrc}
          alt={item.name}
          loading="lazy"
          onError={() => setImgSrc(FALLBACK)}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {item.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold ${badgeStyles[item.badge]}`}
          >
            {item.badge}
          </span>
        )}
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[11px] font-bold text-stone-800 backdrop-blur">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          {item.rating.toFixed(1)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-bold text-stone-900">
          {item.name}
        </h3>
        <p className="mt-1 flex-1 text-sm leading-relaxed text-stone-500">
          {item.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-extrabold text-brand-700">
            {formatINR(item.price)}
          </span>
          <button
            onClick={handleAdd}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-soft transition-all active:scale-95 ${
              added ? 'bg-emerald-600' : 'bg-brand-600 hover:bg-brand-700'
            }`}
          >
            {added ? (
              <>
                <Check className="h-4 w-4" /> Added
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </motion.article>
  )
}
