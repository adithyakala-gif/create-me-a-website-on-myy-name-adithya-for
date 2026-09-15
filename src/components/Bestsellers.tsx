import { MENU } from '../data'
import MenuCard from './MenuCard'

export default function Bestsellers() {
  const items = MENU.filter((m) => m.badge === 'Bestseller')

  return (
    <section
      id="bestsellers"
      className="bg-gradient-to-b from-brand-50/60 to-transparent py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-500">
            Most Loved
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-stone-900 sm:text-4xl">
            Adithya Bestsellers 🔥
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-stone-500">
            The crowd favourites our customers keep coming back for.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
