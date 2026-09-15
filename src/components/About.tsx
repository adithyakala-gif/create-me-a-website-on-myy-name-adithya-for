import { motion } from 'framer-motion'

const STATS = [
  { value: '15+', label: 'Years baking' },
  { value: '80+', label: 'Menu items' },
  { value: '50k+', label: 'Happy orders' },
  { value: '4.8★', label: 'Avg. rating' },
]

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-[2rem] shadow-soft">
            <img
              src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=900&q=75"
              alt="Adithya bakery kitchen"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-500">
            Our Story
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-stone-900 sm:text-4xl">
            Baked with love, served with a smile
          </h2>
          <p className="mt-4 leading-relaxed text-stone-600">
            Adithya started as a tiny neighbourhood bakery with one wood-fired
            oven and a simple promise — everything fresh, everything made from
            scratch. Today we blend the warmth of traditional baking with the
            buzz of your favourite fast food, so there&apos;s something for every
            craving.
          </p>
          <p className="mt-3 leading-relaxed text-stone-600">
            Every loaf is proofed overnight, every cake is decorated by hand, and
            every burger is grilled to order. Quality you can taste, delivered to
            your door.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-brand-100 bg-white p-4 text-center shadow-sm"
              >
                <p className="font-display text-2xl font-extrabold text-brand-600">
                  {s.value}
                </p>
                <p className="mt-1 text-xs font-medium text-stone-500">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
