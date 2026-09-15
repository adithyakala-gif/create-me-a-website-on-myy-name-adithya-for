import { motion } from 'framer-motion'
import { Clock, Star, Truck } from 'lucide-react'

export default function Hero() {
  return (
    <section id="home" className="hero-gradient relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700"
          >
            <Star className="h-3.5 w-3.5 fill-brand-500 text-brand-500" />
            Freshly baked every morning
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 font-display text-4xl font-extrabold leading-[1.05] text-stone-900 text-balance sm:text-5xl lg:text-6xl"
          >
            Warm bakes &amp; hot{' '}
            <span className="text-brand-600">fast food</span>, delivered to
            your door.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-5 max-w-md text-base leading-relaxed text-stone-600 sm:text-lg"
          >
            From artisan breads and celebration cakes to sizzling burgers and
            wood-fired pizzas — Adithya brings your cravings to life. Pick your
            favourites, add to cart, and check out in seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#menu"
              className="rounded-full bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-105 active:scale-95"
            >
              Explore the Menu
            </a>
            <a
              href="#bestsellers"
              className="rounded-full border border-brand-200 bg-white px-7 py-3.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
            >
              View Bestsellers
            </a>
          </motion.div>

          <div className="mt-10 flex flex-wrap gap-6">
            {[
              { icon: Truck, title: 'Free delivery', sub: 'On orders ₹499+' },
              { icon: Clock, title: '30 min', sub: 'Avg. delivery time' },
              { icon: Star, title: '4.8 / 5', sub: '12,000+ ratings' },
            ].map((s) => (
              <div key={s.title} className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-brand-600 shadow-sm">
                  <s.icon className="h-5 w-5" />
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-bold text-stone-900">
                    {s.title}
                  </span>
                  <span className="block text-xs text-stone-500">{s.sub}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-[2.5rem] border-8 border-white shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=75"
              alt="Assorted fresh bakery and fast food"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>

          <div className="animate-float absolute -left-4 top-8 hidden rounded-2xl bg-white/95 px-4 py-3 shadow-xl backdrop-blur sm:block">
            <p className="text-xs font-medium text-stone-500">Today&apos;s special</p>
            <p className="text-sm font-bold text-brand-700">
              🍫 Choco Truffle Cake
            </p>
          </div>
          <div className="animate-float absolute -right-3 bottom-10 hidden rounded-2xl bg-white/95 px-4 py-3 shadow-xl backdrop-blur sm:block [animation-delay:2s]">
            <p className="text-xs font-medium text-stone-500">Hot &amp; crispy</p>
            <p className="text-sm font-bold text-brand-700">🍔 Double Cheese Burger</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
