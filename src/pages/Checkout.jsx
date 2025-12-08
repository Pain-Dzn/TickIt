import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from './context/CartContext'
import { useEvents } from './context/EventsContext'
import {
    ArrowLeft, User, Mail, Phone, CreditCard,
    Smartphone, Banknote, Shield, Zap, Ticket,
    Trash2, Plus, Minus, FileText, Check
} from 'lucide-react'
import './Checkout.css'

const Checkout = () => {
    const navigate = useNavigate()
    const { cart, getCartTotal, updateQuantity, removeFromCart, finalizarCompra, getCartSummary } = useCart()
    const { venderBilhetes } = useEvents()

    const [customerInfo, setCustomerInfo] = useState({
        fullName: '',
        email: '',
        phone: ''
    })

    const [paymentMethod, setPaymentMethod] = useState('mpesa')
    const [isProcessing, setIsProcessing] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsProcessing(true)

        if (!customerInfo.fullName.trim()) {
            alert('Por favor, insira seu nome completo.')
            setIsProcessing(false)
            return
        }

        if (!customerInfo.email.trim() || !customerInfo.email.includes('@')) {
            alert('Por favor, insira um email válido.')
            setIsProcessing(false)
            return
        }

        if (!customerInfo.phone.trim()) {
            alert('Por favor, insira seu número de WhatsApp.')
            setIsProcessing(false)
            return
        }

        try {
            const bilhetesGerados = {}
            const compraId = `COMP-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`

            cart.forEach(item => {
                const codes = Array.from({ length: item.quantity }, (_, i) =>
                    `TKT-${item.eventId}-${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 8).toUpperCase()}-${i + 1}`
                )
                bilhetesGerados[item.id] = codes

                venderBilhetes(item.eventId, item.id, item.quantity)
            })

            await finalizarCompra(customerInfo, paymentMethod, bilhetesGerados, compraId)

            navigate(`/compra-sucesso/${compraId}`)

        } catch (error) {
            console.error('Erro ao processar compra:', error)
            alert('❌ Ocorreu um erro ao processar sua compra. Tente novamente.')
            setIsProcessing(false)
        }
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
                            <Ticket size={48} className="empty-icon" />
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
    const cartSummary = getCartSummary()

    return (
        <div className="checkout-page">
            <div className="container">
                <div className="checkout-header">
                    <h1>Finalizar Compra</h1>
                    <p>Complete os seus dados para finalizar a compra</p>
                </div>

                <div className="checkout-layout">
                    <div className="checkout-form-section">
                        <form onSubmit={handleSubmit} className="checkout-form">
                            <div className="form-section">
                                <h2>
                                    <User size={20} />
                                    Suas Informações
                                </h2>
                                <p className="form-help-text">
                                    Os bilhetes serão enviados para o email fornecido.
                                </p>

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
                                            placeholder="Ex: Ana Macuácua"
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
                                        <small className="form-hint">
                                            <Mail size={12} /> Receberá os bilhetes aqui
                                        </small>
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
                                        <small className="form-hint">
                                            <Phone size={12} /> Para contato sobre o evento
                                        </small>
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h2>
                                    <CreditCard size={20} />
                                    Método de Pagamento
                                </h2>

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
                                            <span className="payment-icon">
                                                <Smartphone size={24} />
                                            </span>
                                            <div className="payment-info">
                                                <span className="payment-name">M-Pesa</span>
                                                <span className="payment-desc">Pagamento rápido via móvel</span>
                                            </div>
                                            {paymentMethod === 'mpesa' && <Check size={20} className="check-icon" />}
                                        </div>
                                    </label>

                                    <label className={`payment-method ${paymentMethod === 'paypal' ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="paypal"
                                            checked={paymentMethod === 'paypal'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <div className="payment-content">
                                            <span className="payment-icon">
                                                <CreditCard size={24} />
                                            </span>
                                            <div className="payment-info">
                                                <span className="payment-name">PayPal</span>
                                                <span className="payment-desc">Pagamento internacional</span>
                                            </div>
                                            {paymentMethod === 'paypal' && <Check size={20} className="check-icon" />}
                                        </div>
                                    </label>

                                    <label className={`payment-method ${paymentMethod === 'emola' ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="emola"
                                            checked={paymentMethod === 'emola'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <div className="payment-content">
                                            <span className="payment-icon">
                                                <Banknote size={24} />
                                            </span>
                                            <div className="payment-info">
                                                <span className="payment-name">Emola</span>
                                                <span className="payment-desc">Pagamento digital</span>
                                            </div>
                                            {paymentMethod === 'emola' && <Check size={20} className="check-icon" />}
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
                                            <span className="payment-icon">
                                                <CreditCard size={24} />
                                            </span>
                                            <div className="payment-info">
                                                <span className="payment-name">Cartão de Crédito</span>
                                                <span className="payment-desc">Visa, Mastercard</span>
                                            </div>
                                            {paymentMethod === 'card' && <Check size={20} className="check-icon" />}
                                        </div>
                                    </label>
                                </div>

                                {paymentMethod === 'mpesa' && (
                                    <div className="payment-instructions">
                                        <p><strong>Instruções M-Pesa:</strong></p>
                                        <ol>
                                            <li>Vá ao menu M-Pesa no seu telemóvel</li>
                                            <li>Selecione "Pagar" ou "Pagar Serviço"</li>
                                            <li>Digite o código do comerciante: <strong>171717</strong></li>
                                            <li>Digite o valor: <strong>{total.toLocaleString('pt-MZ')} MT</strong></li>
                                            <li>Confirme a transação</li>
                                        </ol>
                                    </div>
                                )}
                            </div>

                            <div className="form-actions">
                                <button
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    className="btn btn-secondary"
                                    disabled={isProcessing}
                                >
                                    <ArrowLeft size={16} /> Voltar
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg"
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? 'Processando...' : `Confirmar Pagamento de ${total.toLocaleString('pt-MZ')} MT`}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="order-summary-section">
                        <div className="order-summary">
                            <h3>
                                <FileText size={20} />
                                Resumo do Pedido
                            </h3>

                            {/* Resumo por tipo de bilhete */}
                            <div className="ticket-type-summary">
                                <h4>Seus Bilhetes:</h4>
                                {Object.entries(cartSummary).map(([type, data]) => (
                                    <div key={type} className="type-summary-item">
                                        <span className="type-name">{type.toUpperCase()}</span>
                                        <div className="type-details">
                                            <span className="type-quantity">{data.quantity}x</span>
                                            <span className="type-total">{data.total.toLocaleString('pt-MZ')} MT</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="order-items">
                                <h4>Detalhes:</h4>
                                {cart.map(item => (
                                    <div key={item.id} className="order-item">
                                        <div className="item-image">
                                            <img src={item.eventImage} alt={item.eventName} />
                                        </div>

                                        <div className="item-details">
                                            <h5>{item.eventName}</h5>
                                            <p className="item-type">{item.type.toUpperCase()} - {item.phase}</p>
                                            <div className="item-price">{item.price.toLocaleString('pt-MZ')} MT cada</div>
                                        </div>

                                        <div className="item-controls">
                                            <div className="quantity-controls">
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, -1)}
                                                    className="quantity-btn"
                                                    type="button"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="quantity">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, 1)}
                                                    className="quantity-btn"
                                                    type="button"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="remove-btn"
                                                type="button"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>

                                        <div className="item-total">
                                            {(item.price * item.quantity).toLocaleString('pt-MZ')} MT
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="order-totals">
                                <div className="total-line">
                                    <span>Subtotal:</span>
                                    <span>{total.toLocaleString('pt-MZ')} MT</span>
                                </div>
                                <div className="total-line">
                                    <span>Taxa de serviço:</span>
                                    <span>0 MT</span>
                                </div>
                                <div className="total-line grand-total">
                                    <span>Total a pagar:</span>
                                    <span className="grand-total-amount">{total.toLocaleString('pt-MZ')} MT</span>
                                </div>
                            </div>

                            <div className="security-badges">
                                <div className="security-badge">
                                    <Shield size={16} />
                                    <span>Pagamento Seguro</span>
                                </div>
                                <div className="security-badge">
                                    <Ticket size={16} />
                                    <span>QR Code Único</span>
                                </div>
                                <div className="security-badge">
                                    <Zap size={16} />
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