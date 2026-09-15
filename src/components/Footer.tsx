import { Clock, Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="contact" className="bg-stone-900 text-stone-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-600 text-lg font-bold text-white">
              A
            </span>
            <span className="leading-tight">
              <span className="block font-display text-xl font-extrabold text-white">
                Adithya
              </span>
              <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-stone-400">
                Bakery &amp; Fast Food
              </span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone-400">
            Fresh bakes and hot fast food, delivered with love across the city.
          </p>
          <div className="mt-4 flex gap-3">
            {[Instagram, Facebook, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full bg-stone-800 text-stone-300 transition hover:bg-brand-600 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-white">
            Explore
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {['Menu', 'Bestsellers', 'About', 'Offers'].map((l) => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase()}`}
                  className="text-stone-400 transition hover:text-brand-400"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-white">
            Contact
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-stone-400">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-400" />
              12 Baker&apos;s Lane, Jubilee Hills, Hyderabad
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 flex-shrink-0 text-brand-400" />
              +91 98765 43210
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 flex-shrink-0 text-brand-400" />
              hello@adithyabakery.com
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-white">
            Hours
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-stone-400">
            <li className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 flex-shrink-0 text-brand-400" />
              Mon – Fri · 7:00 AM – 11:00 PM
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 flex-shrink-0 text-brand-400" />
              Sat – Sun · 8:00 AM – 12:00 AM
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-800 py-5 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} Adithya Bakery &amp; Fast Food. Made with 🧡
        for food lovers.
      </div>
    </footer>
  )
}
