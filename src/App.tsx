import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Bestsellers from './components/Bestsellers'
import MenuSection from './components/MenuSection'
import About from './components/About'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import CheckoutModal from './components/CheckoutModal'
import { useCart } from './context/CartContext'

export default function App() {
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const { closeCart } = useCart()

  const startCheckout = () => {
    closeCart()
    setCheckoutOpen(true)
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main>
        <Hero />
        <Bestsellers />
        <MenuSection />
        <About />
      </main>
      <Footer />

      <CartDrawer onCheckout={startCheckout} />
      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </div>
  )
}
