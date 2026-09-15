import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatINR } from '../utils/format'

const FALLBACK =
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=300&q=60'

const DELIVERY_FEE = 40
const FREE_DELIVERY_THRESHOLD = 499

export default function CartDrawer({
  onCheckout,
}: {
  onCheckout: () => void
}) {
  const { isOpen, closeCart, lines, subtotal, increment, decrement, remove, clear } =
    useCart()

  const deliveryFee =
    subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
  const total = subtotal + deliveryFee
  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-brand-100 px-5 py-4">
              <h2 className="flex items-center gap-2 font-display text-xl font-bold text-stone-900">
                <ShoppingBag className="h-5 w-5 text-brand-600" />
                Your Cart
              </h2>
              <button
                onClick={closeCart}
                className="grid h-9 w-9 place-items-center rounded-full bg-white text-stone-500 ring-1 ring-brand-100 hover:text-brand-600"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-brand-50 text-4xl">
                  🛒
                </span>
                <p className="text-lg font-semibold text-stone-800">
                  Your cart is empty
                </p>
                <p className="text-sm text-stone-500">
                  Add some delicious bakes and fast food to get started.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-brand-700"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                {/* Free delivery progress */}
                <div className="border-b border-brand-100 bg-white px-5 py-3">
                  {remaining > 0 ? (
                    <p className="text-xs text-stone-600">
                      Add{' '}
                      <span className="font-bold text-brand-600">
                        {formatINR(remaining)}
                      </span>{' '}
                      more for <span className="font-semibold">free delivery</span>
                    </p>
                  ) : (
                    <p className="text-xs font-semibold text-emerald-600">
                      🎉 You&apos;ve unlocked free delivery!
                    </p>
                  )}
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-brand-100">
                    <div
                      className="h-full rounded-full bg-brand-500 transition-all"
                      style={{
                        width: `${Math.min(
                          100,
                          (subtotal / FREE_DELIVERY_THRESHOLD) * 100,
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
                  {lines.map(({ item, qty }) => (
                    <div
                      key={item.id}
                      className="flex gap-3 rounded-2xl border border-brand-100 bg-white p-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        onError={(e) => {
                          e.currentTarget.src = FALLBACK
                        }}
                        className="h-20 w-20 flex-shrink-0 rounded-xl object-cover"
                      />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="truncate text-sm font-bold text-stone-900">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => remove(item.id)}
                            className="text-stone-400 transition hover:text-red-500"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-xs text-stone-500">
                          {formatINR(item.price)} each
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="inline-flex items-center gap-3 rounded-full bg-brand-50 px-2 py-1">
                            <button
                              onClick={() => decrement(item.id)}
                              className="grid h-6 w-6 place-items-center rounded-full bg-white text-brand-700 shadow-sm hover:bg-brand-100"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-5 text-center text-sm font-bold text-stone-900">
                              {qty}
                            </span>
                            <button
                              onClick={() => increment(item.id)}
                              className="grid h-6 w-6 place-items-center rounded-full bg-white text-brand-700 shadow-sm hover:bg-brand-100"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="text-sm font-extrabold text-brand-700">
                            {formatINR(item.price * qty)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={clear}
                    className="mx-auto mt-2 block text-xs font-medium text-stone-400 hover:text-red-500"
                  >
                    Clear cart
                  </button>
                </div>

                <div className="space-y-3 border-t border-brand-100 bg-white px-5 py-4">
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-stone-600">
                      <span>Subtotal</span>
                      <span className="font-semibold text-stone-800">
                        {formatINR(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Delivery</span>
                      <span className="font-semibold text-stone-800">
                        {deliveryFee === 0 ? 'FREE' : formatINR(deliveryFee)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-dashed border-brand-100 pt-2 text-base">
                      <span className="font-bold text-stone-900">Total</span>
                      <span className="font-extrabold text-brand-700">
                        {formatINR(total)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={onCheckout}
                    className="w-full rounded-full bg-brand-600 py-3.5 text-sm font-bold text-white shadow-soft transition-transform hover:scale-[1.02] active:scale-95"
                  >
                    Proceed to Checkout · {formatINR(total)}
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
