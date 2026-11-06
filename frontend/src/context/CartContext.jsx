import { useState, useEffect } from 'react'
import { CartContext } from './cartContextDefinition.js'
import ivoryEleganceImg from '../assets/images/wd 1.jpg'
import chocolateDelightImg from '../assets/images/3.jpg'

const CART_STORAGE_KEY = 'zuena_cake_cart'

const INITIAL_DEMO_ITEMS = [
  {
    id: 'demo-item-1',
    number: '01',
    productId: 'creation-1',
    slug: 'champagne-crimson-royal-wedding-cake',
    title: 'The Champagne & Crimson Royal Wedding Cake',
    tierCount: 3,
    tierLabel: '3 Grand Tiers',
    guests: '80 – 120 Guests',
    flavor: 'Madagascar Bourbon Vanilla & Strawberry Compote',
    specialNote: 'Complimentary gold cake board styling',
    quantity: 1,
    priceUGX: 450000,
    priceFormatted: 'UGX 450,000',
    image: ivoryEleganceImg,
    imageAlt: 'The Champagne & Crimson Royal Wedding Cake on a gold stand',
  },
  {
    id: 'demo-item-2',
    number: '02',
    productId: 'creation-10',
    slug: 'truffle-ganache-berry-cascade',
    title: 'Truffle Ganache & Berry Cascade',
    tierCount: 2,
    tierLabel: '2 Decadent Tiers',
    guests: '35 – 50 Guests',
    flavor: 'Triple Belgian Dark Chocolate Ganache (House Specialty)',
    specialNote: '',
    quantity: 1,
    priceUGX: 210000,
    priceFormatted: 'UGX 210,000',
    image: chocolateDelightImg,
    imageAlt: 'Truffle Ganache & Berry Cascade two-tier dark chocolate drip cake',
  },
]

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      }
    } catch {
      // Fallback if localStorage parse fails
    }
    return INITIAL_DEMO_ITEMS
  })

  // Persist items to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Storage quota or private browsing safeguard
    }
  }, [items])

  // Synchronize across tabs if localStorage is updated elsewhere
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === CART_STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue)
          if (Array.isArray(parsed)) {
            setItems(parsed)
          }
        } catch {
          // ignore error
        }
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const renumberItems = (itemList) => {
    return itemList.map((item, idx) => ({
      ...item,
      number: String(idx + 1).padStart(2, '0'),
    }))
  }

  const addToCart = (newItem) => {
    setItems((prev) => {
      // Check if an identical configuration already exists
      const existingIdx = prev.findIndex(
        (it) =>
          it.productId === newItem.productId &&
          it.tierCount === newItem.tierCount &&
          it.flavor === newItem.flavor &&
          (it.specialNote || '') === (newItem.specialNote || '')
      )

      let updated
      if (existingIdx >= 0) {
        // Increase quantity of existing configured item
        updated = [...prev]
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + (newItem.quantity || 1),
        }
      } else {
        // Append as a new distinct configured cart item
        const configuredItem = {
          ...newItem,
          id: newItem.id || `cart-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          quantity: newItem.quantity || 1,
        }
        updated = [...prev, configuredItem]
      }
      return renumberItems(updated)
    })
  }

  const removeItem = (id) => {
    setItems((prev) => {
      const filtered = prev.filter((item) => item.id !== id)
      return renumberItems(filtered)
    })
  }

  const resetItems = () => {
    setItems(renumberItems(INITIAL_DEMO_ITEMS))
  }

  const clearCart = () => {
    setItems([])
  }

  const totalCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0)
  const totalUGX = items.reduce((sum, item) => sum + item.priceUGX * (item.quantity || 1), 0)
  const totalFormatted = `UGX ${totalUGX.toLocaleString()}`

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeItem,
        resetItems,
        clearCart,
        totalCount,
        totalUGX,
        totalFormatted,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
