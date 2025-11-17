import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from './context/CartContext'

const Checkout = () => {
    const Checkout = ({ language = 'pt' }) => {
        // ... código existente ...

        const translations = {
            pt: {
                title: 'Finalizar Compra',
                step1: 'Passo 1 de 2: Suas Informações',
                fullName: 'Nome Completo',
                email: 'Email',
                phone: 'WhatsApp',
                nuit: 'NUIT (Opcional)',
                orderSummary: 'Resumo do Pedido',
                total: 'Total',
                back: 'Voltar',
                continue: 'Continuar Pagamento',
                paymentMethods: 'Métodos de Pagamento',
                mpesa: 'M-Pesa',
                card: 'Cartão de Crédito',
                transfer: 'Transferência Bancária',
                complete: 'Finalizar Compra',
                success: 'Compra Realizada com Sucesso!',
                emptyCart: 'O seu carrinho está vazio',
                emptyDesc: 'Adicione alguns bilhetes antes de finalizar a compra.',
                exploreEvents: 'Explorar Eventos',
                subtotal: 'Subtotal',
                serviceFee: 'Taxa de serviço',
                securePayment: 'Pagamento Seguro',
                instantDelivery: 'Entrega Imediata',
                // ... adicione mais traduções conforme necessário
            },
            en: {
                title: 'Checkout',
                step1: 'Step 1 of 2: Your Information',
                fullName: 'Full Name',
                email: 'Email',
                phone: 'WhatsApp',
                nuit: 'NUIT (Optional)',
                orderSummary: 'Order Summary',
                total: 'Total',
                back: 'Back',
                continue: 'Continue to Payment',
                paymentMethods: 'Payment Methods',
                mpesa: 'M-Pesa',
                card: 'Credit Card',
                transfer: 'Bank Transfer',
                complete: 'Complete Purchase',
                success: 'Purchase Completed Successfully!',
                emptyCart: 'Your cart is empty',
                emptyDesc: 'Add some tickets before checking out.',
                exploreEvents: 'Explore Events',
                subtotal: 'Subtotal',
                serviceFee: 'Service fee',
                securePayment: 'Secure Payment',
                instantDelivery: 'Instant Delivery',
            }
        }

        const t = translations[language] || translations.pt

    }
    const navigate = useNavigate()
    const { cart, clearCart, getCartTotal, updateQuantity, removeFromCart } = useCart()

    const [customerInfo, setCustomerInfo] = useState({
        fullName: '',
        email: '',
        phone: '',
        nuit: ''
    })

    const [paymentMethod, setPaymentMethod] = useState('mpesa')
    const [isProcessing, setIsProcessing] = useState(false)

    const mozambicanNames = [
        'Ana Macuácua', 'Carlos Matsinhe', 'Domingos Guenha', 'Elena Massango',
        'Fernando Chissano', 'Graça Mabunda', 'Helder Nhampossa', 'Ilda Langa',
        'João Muchanga', 'Leonor Sitoe', 'Manuel Tembe', 'Natália Cossa',
        'Osvaldo Muianga', 'Paula Zita', 'Quim Santos', 'Rosa Chambisso',
        'Sérgio Fumo', 'Teresa Manjate', 'Ulisses Muteque', 'Vera Manhiça'
    ]

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsProcessing(true)

        // Simular processamento
        setTimeout(() => {
            alert('🎉 Compra realizada com sucesso! Os bilhetes foram enviados para o seu email.')
            clearCart()
            navigate('/')
        }, 2000)
    }

    const handleQuantityChange = (ticketId, change) => {
        const item = cart.find(item => item.id === ticketId)
        if (item) {
            const newQuantity = item.quantity + change
            if (newQuantity > 0) {
                updateQuantity(ticketId, newQuantity)
            } else {
                removeFromCart(ticketId)
            }
        }
    }

    if (cart.length === 0) {
        return (
            <div className="checkout-page">
                <div className="container">
                    <div className="empty-cart">
                        <div className="empty-state">
                            <span className="empty-icon">🛒</span>
                            <h2>O seu carrinho está vazio</h2>
                            <p>Adicione alguns bilhetes antes de finalizar a compra.</p>
                            <button
                                onClick={() => navigate('/eventos')}
                                className="btn btn-primary"
                            >
                                Explorar Eventos
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const total = getCartTotal()

    return (
        <div className="checkout-page">
            <div className="container">
                <div className="checkout-header">
                    <h1>Finalizar Compra</h1>
                    <p>Complete os seus dados para finalizar a compra</p>
                </div>

                <div className="checkout-layout">
                    {/* Formulário */}
                    <div className="checkout-form-section">
                        <form onSubmit={handleSubmit} className="checkout-form">
                            {/* Informações Pessoais */}
                            <div className="form-section">
                                <h2>📋 Suas Informações</h2>

                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="fullName">Nome Completo *</label>
                                        <input
                                            id="fullName"
                                            type="text"
                                            value={customerInfo.fullName}
                                            onChange={(e) => setCustomerInfo(prev => ({
                                                ...prev,
                                                fullName: e.target.value
                                            }))}
                                            placeholder={mozambicanNames[0]}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email *</label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={customerInfo.email}
                                            onChange={(e) => setCustomerInfo(prev => ({
                                                ...prev,
                                                email: e.target.value
                                            }))}
                                            placeholder="exemplo@email.com"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phone">WhatsApp *</label>
                                        <input
                                            id="phone"
                                            type="tel"
                                            value={customerInfo.phone}
                                            onChange={(e) => setCustomerInfo(prev => ({
                                                ...prev,
                                                phone: e.target.value
                                            }))}
                                            placeholder="+258 85 635 0220"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="nuit">NUIT (Opcional)</label>
                                        <input
                                            id="nuit"
                                            type="text"
                                            value={customerInfo.nuit}
                                            onChange={(e) => setCustomerInfo(prev => ({
                                                ...prev,
                                                nuit: e.target.value
                                            }))}
                                            placeholder="123456789"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Método de Pagamento */}
                            <div className="form-section">
                                <h2>💳 Método de Pagamento</h2>

                                <div className="payment-methods">
                                    <label className={`payment-method ${paymentMethod === 'mpesa' ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="mpesa"
                                            checked={paymentMethod === 'mpesa'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <div className="payment-content">
                                            <span className="payment-icon">📱</span>
                                            <div className="payment-info">
                                                <span className="payment-name">M-Pesa</span>
                                                <span className="payment-desc">Pagamento rápido via móvel</span>
                                            </div>
                                        </div>
                                    </label>

                                    <label className={`payment-method ${paymentMethod === 'card' ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="card"
                                            checked={paymentMethod === 'card'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <div className="payment-content">
                                            <span className="payment-icon">💳</span>
                                            <div className="payment-info">
                                                <span className="payment-name">Cartão de Crédito</span>
                                                <span className="payment-desc">Visa, Mastercard</span>
                                            </div>
                                        </div>
                                    </label>

                                    <label className={`payment-method ${paymentMethod === 'transfer' ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="transfer"
                                            checked={paymentMethod === 'transfer'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <div className="payment-content">
                                            <span className="payment-icon">🏦</span>
                                            <div className="payment-info">
                                                <span className="payment-name">Transferência Bancária</span>
                                                <span className="payment-desc">BCI, Standard Bank</span>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Botão de Submissão */}
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg w-full"
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Processando...' : `Pagar ${total} MT`}
                            </button>
                        </form>
                    </div>

                    {/* Resumo do Pedido */}
                    <div className="order-summary-section">
                        <div className="order-summary">
                            <h3>📦 Resumo do Pedido</h3>

                            <div className="order-items">
                                {cart.map(item => (
                                    <div key={item.id} className="order-item">
                                        <div className="item-image">
                                            <img src={item.eventImage} alt={item.eventName} />
                                        </div>

                                        <div className="item-details">
                                            <h4>{item.eventName}</h4>
                                            <p>{item.type.toUpperCase()} - {item.phase}</p>
                                            <div className="item-price">{item.price} MT cada</div>
                                        </div>

                                        <div className="item-controls">
                                            <div className="quantity-controls">
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, -1)}
                                                    className="quantity-btn"
                                                >
                                                    -
                                                </button>
                                                <span className="quantity">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, 1)}
                                                    className="quantity-btn"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="remove-btn"
                                            >
                                                🗑️
                                            </button>
                                        </div>

                                        <div className="item-total">
                                            {item.price * item.quantity} MT
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="order-totals">
                                <div className="total-line">
                                    <span>Subtotal:</span>
                                    <span>{total} MT</span>
                                </div>
                                <div className="total-line">
                                    <span>Taxa de serviço:</span>
                                    <span>0 MT</span>
                                </div>
                                <div className="total-line grand-total">
                                    <span>Total:</span>
                                    <span>{total} MT</span>
                                </div>
                            </div>

                            <div className="security-badges">
                                <div className="security-badge">
                                    <span>🔒</span>
                                    <span>Pagamento Seguro</span>
                                </div>
                                <div className="security-badge">
                                    <span>⚡</span>
                                    <span>Entrega Imediata</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout