import React, { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext()

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within CartProvider')
    }
    return context
}

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    const addToCart = useCallback((ticket) => {
        setCart(prev => {
            const existing = prev.find(item =>
                item.id === ticket.id && item.eventId === ticket.eventId
            )

            if (existing) {
                return prev.map(item =>
                    item.id === ticket.id && item.eventId === ticket.eventId
                        ? { ...item, quantity: item.quantity + ticket.quantity }
                        : item
                )
            }

            return [...prev, ticket]
        })
    }, [])

    const removeFromCart = useCallback((ticketId) => {
        setCart(prev => prev.filter(item => item.id !== ticketId))
    }, [])

    const updateQuantity = useCallback((ticketId, quantity) => {
        if (quantity === 0) {
            removeFromCart(ticketId)
            return
        }

        setCart(prev =>
            prev.map(item =>
                item.id === ticketId ? { ...item, quantity } : item
            )
        )
    }, [removeFromCart])

    const clearCart = useCallback(() => {
        setCart([])
    }, [])

    const getCartTotal = useCallback(() => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    }, [cart])

    const getCartCount = useCallback(() => {
        return cart.reduce((count, item) => count + item.quantity, 0)
    }, [cart])

    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}