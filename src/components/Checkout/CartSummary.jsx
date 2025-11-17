import React from 'react'
import { useCart } from '../../context/CartContext'

const CartSummary = () => {
    const { cart, getCartTotal, getCartCount } = useCart()

    if (cart.length === 0) {
        return (
            <div className="cart-summary empty">
                <div className="empty-cart">
                    <span className="empty-icon">🛒</span>
                    <p>O seu carrinho está vazio</p>
                </div>
            </div>
        )
    }

    return (
        <div className="cart-summary">
            <h3>Resumo do Carrinho</h3>

            <div className="cart-items">
                {cart.map(item => (
                    <div key={item.id} className="cart-item">
                        <div className="item-info">
                            <h4>{item.eventName}</h4>
                            <p>{item.type.toUpperCase()} - {item.phase}</p>
                        </div>
                        <div className="item-details">
                            <span className="quantity">x{item.quantity}</span>
                            <span className="price">{item.price * item.quantity} MT</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cart-totals">
                <div className="total-line">
                    <span>Subtotal:</span>
                    <span>{getCartTotal()} MT</span>
                </div>
                <div className="total-line">
                    <span>Taxas:</span>
                    <span>0 MT</span>
                </div>
                <div className="total-line grand-total">
                    <span>Total:</span>
                    <span>{getCartTotal()} MT</span>
                </div>
            </div>
        </div>
    )
}

export default CartSummary