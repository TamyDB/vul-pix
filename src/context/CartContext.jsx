import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems]   = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const addItem = (card, price, discount = 0) => {
    setItems(prev => {
      const existing = prev.find(i => i.card.TCGAPIID === card.TCGAPIID)
      if (existing) {
        return prev.map(i =>
          i.card.TCGAPIID === card.TCGAPIID
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prev, { card, price, discount, quantity: 1 }]
    })
    setIsOpen(true)
  }

  const removeItem = (id) =>
    setItems(prev => prev.filter(i => i.card.TCGAPIID !== id))

  const updateQty = (id, qty) => {
    if (qty <= 0) { removeItem(id); return }
    setItems(prev =>
      prev.map(i => i.card.TCGAPIID === id ? { ...i, quantity: qty } : i)
    )
  }

  const clearCart = () => setItems([])

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, isOpen, setIsOpen, addItem, removeItem, updateQty, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
