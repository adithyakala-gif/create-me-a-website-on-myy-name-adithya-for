import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react'
import type { CartLine, MenuItem } from '../types'

interface CartState {
  lines: CartLine[]
}

type Action =
  | { type: 'add'; item: MenuItem }
  | { type: 'increment'; id: string }
  | { type: 'decrement'; id: string }
  | { type: 'remove'; id: string }
  | { type: 'clear' }
  | { type: 'hydrate'; lines: CartLine[] }

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'add': {
      const existing = state.lines.find((l) => l.item.id === action.item.id)
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.item.id === action.item.id ? { ...l, qty: l.qty + 1 } : l,
          ),
        }
      }
      return { lines: [...state.lines, { item: action.item, qty: 1 }] }
    }
    case 'increment':
      return {
        lines: state.lines.map((l) =>
          l.item.id === action.id ? { ...l, qty: l.qty + 1 } : l,
        ),
      }
    case 'decrement':
      return {
        lines: state.lines
          .map((l) =>
            l.item.id === action.id ? { ...l, qty: l.qty - 1 } : l,
          )
          .filter((l) => l.qty > 0),
      }
    case 'remove':
      return { lines: state.lines.filter((l) => l.item.id !== action.id) }
    case 'clear':
      return { lines: [] }
    case 'hydrate':
      return { lines: action.lines }
    default:
      return state
  }
}

interface CartContextValue {
  lines: CartLine[]
  count: number
  subtotal: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  add: (item: MenuItem) => void
  increment: (id: string) => void
  decrement: (id: string) => void
  remove: (id: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'adithya-cart-v1'

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] })
  const [isOpen, setIsOpen] = useState(false)

  // Hydrate from localStorage once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const lines = JSON.parse(raw) as CartLine[]
        if (Array.isArray(lines)) dispatch({ type: 'hydrate', lines })
      }
    } catch {
      /* ignore malformed storage */
    }
  }, [])

  // Persist whenever the cart changes.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines))
    } catch {
      /* storage may be unavailable */
    }
  }, [state.lines])

  const value = useMemo<CartContextValue>(() => {
    const count = state.lines.reduce((sum, l) => sum + l.qty, 0)
    const subtotal = state.lines.reduce(
      (sum, l) => sum + l.qty * l.item.price,
      0,
    )
    return {
      lines: state.lines,
      count,
      subtotal,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      add: (item) => {
        dispatch({ type: 'add', item })
        setIsOpen(true)
      },
      increment: (id) => dispatch({ type: 'increment', id }),
      decrement: (id) => dispatch({ type: 'decrement', id }),
      remove: (id) => dispatch({ type: 'remove', id }),
      clear: () => dispatch({ type: 'clear' }),
    }
  }, [state.lines, isOpen])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
