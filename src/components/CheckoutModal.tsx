import { AnimatePresence, motion } from 'framer-motion'
import {
  Banknote,
  CheckCircle2,
  CreditCard,
  Loader2,
  Lock,
  Smartphone,
  X,
} from 'lucide-react'
import { useMemo, useState, type FormEvent } from 'react'
import { useCart } from '../context/CartContext'
import { formatINR } from '../utils/format'

type PayMethod = 'card' | 'upi' | 'cod'
type Stage = 'form' | 'processing' | 'success'

const DELIVERY_FEE = 40
const FREE_DELIVERY_THRESHOLD = 499

const onlyDigits = (v: string) => v.replace(/\D/g, '')

// Basic Luhn checksum so obviously-invalid card numbers are rejected.
function luhnValid(num: string) {
  let sum = 0
  let alt = false
  for (let i = num.length - 1; i >= 0; i--) {
    let d = parseInt(num[i], 10)
    if (alt) {
      d *= 2
      if (d > 9) d -= 9
    }
    sum += d
    alt = !alt
  }
  return sum % 10 === 0 && num.length >= 13
}

export default function CheckoutModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { lines, subtotal, clear } = useCart()
  const [stage, setStage] = useState<Stage>('form')
  const [method, setMethod] = useState<PayMethod>('card')
  const [orderId, setOrderId] = useState('')

  // Contact / delivery
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [pincode, setPincode] = useState('')

  // Card
  const [card, setCard] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [cardName, setCardName] = useState('')

  // UPI
  const [upi, setUpi] = useState('')

  const [errors, setErrors] = useState<Record<string, string>>({})

  const deliveryFee =
    subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
  const total = subtotal + deliveryFee

  const itemCount = useMemo(
    () => lines.reduce((n, l) => n + l.qty, 0),
    [lines],
  )

  const validate = () => {
    const e: Record<string, string> = {}
    if (name.trim().length < 2) e.name = 'Please enter your name'
    if (onlyDigits(phone).length !== 10) e.phone = 'Enter a valid 10-digit number'
    if (address.trim().length < 8) e.address = 'Enter your full delivery address'
    if (onlyDigits(pincode).length !== 6) e.pincode = 'Enter a valid 6-digit pincode'

    if (method === 'card') {
      const digits = onlyDigits(card)
      if (!luhnValid(digits)) e.card = 'Enter a valid card number'
      if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        e.expiry = 'MM/YY'
      } else {
        const [mm, yy] = expiry.split('/').map((n) => parseInt(n, 10))
        if (mm < 1 || mm > 12) e.expiry = 'Invalid month'
        const now = new Date()
        const expYear = 2000 + yy
        const expDate = new Date(expYear, mm)
        if (expDate <= now) e.expiry = 'Card expired'
      }
      if (onlyDigits(cvv).length < 3) e.cvv = '3 digits'
      if (cardName.trim().length < 2) e.cardName = 'Name on card required'
    }

    if (method === 'upi') {
      if (!/^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(upi.trim()))
        e.upi = 'Enter a valid UPI ID (e.g. name@bank)'
    }

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setStage('processing')
    // Simulate a payment gateway round-trip.
    window.setTimeout(() => {
      setOrderId('ADY' + Math.floor(100000 + Math.random() * 900000))
      setStage('success')
      clear()
    }, 1900)
  }

  const reset = () => {
    setStage('form')
    setErrors({})
    onClose()
  }

  const formatCard = (v: string) =>
    onlyDigits(v)
      .slice(0, 16)
      .replace(/(\d{4})(?=\d)/g, '$1 ')
      .trim()

  const formatExpiry = (v: string) => {
    const d = onlyDigits(v).slice(0, 4)
    if (d.length <= 2) return d
    return d.slice(0, 2) + '/' + d.slice(2)
  }

  const inputClass = (field: string) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 ${
      errors[field]
        ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
        : 'border-brand-100 focus:border-brand-400 focus:ring-brand-200'
    }`

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={stage === 'processing' ? undefined : reset}
            className="fixed inset-0 z-[60] bg-stone-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            className="fixed inset-x-0 bottom-0 z-[70] mx-auto max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-cream shadow-2xl sm:inset-0 sm:my-auto sm:h-fit sm:rounded-3xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-brand-100 bg-cream/95 px-5 py-4 backdrop-blur">
              <h2 className="font-display text-xl font-bold text-stone-900">
                {stage === 'success' ? 'Order Confirmed' : 'Checkout'}
              </h2>
              {stage !== 'processing' && (
                <button
                  onClick={reset}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white text-stone-500 ring-1 ring-brand-100 hover:text-brand-600"
                  aria-label="Close checkout"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {stage === 'success' ? (
              <div className="flex flex-col items-center px-6 py-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                >
                  <CheckCircle2 className="h-20 w-20 text-emerald-500" />
                </motion.div>
                <h3 className="mt-4 font-display text-2xl font-extrabold text-stone-900">
                  Thank you, {name.split(' ')[0] || 'friend'}! 🎉
                </h3>
                <p className="mt-2 max-w-sm text-sm text-stone-600">
                  Your order is confirmed and our bakers are on it. You&apos;ll
                  get it hot &amp; fresh soon.
                </p>
                <div className="mt-6 w-full rounded-2xl border border-brand-100 bg-white p-4 text-left">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500">Order ID</span>
                    <span className="font-bold text-stone-900">{orderId}</span>
                  </div>
                  <div className="mt-2 flex justify-between text-sm">
                    <span className="text-stone-500">Amount</span>
                    <span className="font-bold text-brand-700">
                      {method === 'cod' ? `${formatINR(total)} (Cash)` : formatINR(total)}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between text-sm">
                    <span className="text-stone-500">Est. delivery</span>
                    <span className="font-bold text-stone-900">25–35 min</span>
                  </div>
                </div>
                <button
                  onClick={reset}
                  className="mt-6 w-full rounded-full bg-brand-600 py-3.5 text-sm font-bold text-white shadow-soft hover:bg-brand-700"
                >
                  Continue Ordering
                </button>
              </div>
            ) : stage === 'processing' ? (
              <div className="flex flex-col items-center justify-center gap-4 px-6 py-20 text-center">
                <Loader2 className="h-14 w-14 animate-spin text-brand-600" />
                <p className="font-display text-lg font-bold text-stone-900">
                  Processing your payment…
                </p>
                <p className="text-sm text-stone-500">
                  Please don&apos;t close this window.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-5 py-5">
                {/* Order summary */}
                <div className="rounded-2xl border border-brand-100 bg-white p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-stone-800">
                      {itemCount} item{itemCount !== 1 ? 's' : ''}
                    </span>
                    <span className="text-stone-500">
                      Delivery {deliveryFee === 0 ? 'FREE' : formatINR(deliveryFee)}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between border-t border-dashed border-brand-100 pt-2">
                    <span className="font-bold text-stone-900">Total payable</span>
                    <span className="text-lg font-extrabold text-brand-700">
                      {formatINR(total)}
                    </span>
                  </div>
                </div>

                {/* Delivery details */}
                <h3 className="mt-5 mb-2 text-sm font-bold uppercase tracking-wide text-stone-500">
                  Delivery details
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <input
                      className={inputClass('name')}
                      placeholder="Full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <input
                      className={inputClass('phone')}
                      placeholder="Phone"
                      inputMode="numeric"
                      value={phone}
                      onChange={(e) => setPhone(onlyDigits(e.target.value).slice(0, 10))}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                    )}
                  </div>
                  <div>
                    <input
                      className={inputClass('pincode')}
                      placeholder="Pincode"
                      inputMode="numeric"
                      value={pincode}
                      onChange={(e) => setPincode(onlyDigits(e.target.value).slice(0, 6))}
                    />
                    {errors.pincode && (
                      <p className="mt-1 text-xs text-red-500">{errors.pincode}</p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <textarea
                      className={inputClass('address')}
                      placeholder="Delivery address (house, street, area)"
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    {errors.address && (
                      <p className="mt-1 text-xs text-red-500">{errors.address}</p>
                    )}
                  </div>
                </div>

                {/* Payment method */}
                <h3 className="mt-5 mb-2 text-sm font-bold uppercase tracking-wide text-stone-500">
                  Payment method
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { key: 'card', label: 'Card', icon: CreditCard },
                      { key: 'upi', label: 'UPI', icon: Smartphone },
                      { key: 'cod', label: 'Cash', icon: Banknote },
                    ] as const
                  ).map((m) => (
                    <button
                      type="button"
                      key={m.key}
                      onClick={() => setMethod(m.key)}
                      className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-3 text-xs font-semibold transition ${
                        method === m.key
                          ? 'border-brand-500 bg-brand-50 text-brand-700 ring-2 ring-brand-200'
                          : 'border-brand-100 bg-white text-stone-600 hover:bg-brand-50'
                      }`}
                    >
                      <m.icon className="h-5 w-5" />
                      {m.label}
                    </button>
                  ))}
                </div>

                {method === 'card' && (
                  <div className="mt-4 space-y-3">
                    <div>
                      <input
                        className={inputClass('card')}
                        placeholder="Card number"
                        inputMode="numeric"
                        value={card}
                        onChange={(e) => setCard(formatCard(e.target.value))}
                      />
                      {errors.card && (
                        <p className="mt-1 text-xs text-red-500">{errors.card}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <input
                          className={inputClass('expiry')}
                          placeholder="MM/YY"
                          inputMode="numeric"
                          value={expiry}
                          onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                        />
                        {errors.expiry && (
                          <p className="mt-1 text-xs text-red-500">{errors.expiry}</p>
                        )}
                      </div>
                      <div>
                        <input
                          className={inputClass('cvv')}
                          placeholder="CVV"
                          inputMode="numeric"
                          type="password"
                          value={cvv}
                          onChange={(e) => setCvv(onlyDigits(e.target.value).slice(0, 4))}
                        />
                        {errors.cvv && (
                          <p className="mt-1 text-xs text-red-500">{errors.cvv}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <input
                        className={inputClass('cardName')}
                        placeholder="Name on card"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                      {errors.cardName && (
                        <p className="mt-1 text-xs text-red-500">{errors.cardName}</p>
                      )}
                    </div>
                  </div>
                )}

                {method === 'upi' && (
                  <div className="mt-4">
                    <input
                      className={inputClass('upi')}
                      placeholder="yourname@bank"
                      value={upi}
                      onChange={(e) => setUpi(e.target.value)}
                    />
                    {errors.upi && (
                      <p className="mt-1 text-xs text-red-500">{errors.upi}</p>
                    )}
                    <p className="mt-2 text-xs text-stone-500">
                      You&apos;ll receive a collect request on your UPI app.
                    </p>
                  </div>
                )}

                {method === 'cod' && (
                  <div className="mt-4 rounded-xl bg-brand-50 p-4 text-sm text-stone-600">
                    Pay <span className="font-bold text-brand-700">{formatINR(total)}</span>{' '}
                    in cash when your order arrives. Please keep exact change handy.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={lines.length === 0}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 py-3.5 text-sm font-bold text-white shadow-soft transition-transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Lock className="h-4 w-4" />
                  {method === 'cod'
                    ? `Place Order · ${formatINR(total)}`
                    : `Pay ${formatINR(total)}`}
                </button>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-stone-400">
                  <Lock className="h-3 w-3" /> Secured demo checkout · no real
                  charge is made
                </p>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
