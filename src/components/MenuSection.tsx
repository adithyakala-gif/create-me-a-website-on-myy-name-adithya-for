import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { CATEGORIES, MENU } from '../data'
import type { Category } from '../types'
import MenuCard from './MenuCard'

type Filter = 'All' | Category

export default function MenuSection() {
  const [filter, setFilter] = useState<Filter>('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return MENU.filter((item) => {
      const matchesCategory = filter === 'All' || item.category === filter
      const matchesQuery =
        q === '' ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [filter, query])

  return (
    <section id="menu" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-500">
          Our Menu
        </p>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-stone-900 sm:text-4xl">
          Pick your favourites
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-stone-500">
          Browse by category or search for a craving. Tap{' '}
          <span className="font-semibold text-brand-600">Add</span> to drop items
          into your cart.
        </p>
      </div>

      {/* Search */}
      <div className="mx-auto mt-8 max-w-md">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search breads, burgers, cakes…"
            className="w-full rounded-full border border-brand-100 bg-white py-3 pl-12 pr-4 text-sm text-stone-800 shadow-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
          />
        </div>
      </div>

      {/* Category filters */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setFilter('All')}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            filter === 'All'
              ? 'bg-brand-600 text-white shadow-soft'
              : 'bg-white text-stone-600 ring-1 ring-brand-100 hover:bg-brand-50'
          }`}
        >
          ✨ All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setFilter(c.key)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              filter === c.key
                ? 'bg-brand-600 text-white shadow-soft'
                : 'bg-white text-stone-600 ring-1 ring-brand-100 hover:bg-brand-50'
            }`}
          >
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-stone-500">
          No items match “{query}”. Try a different search.
        </p>
      )}
    </section>
  )
}
