import React from 'react'

const PaymentMethods = ({ selectedMethod, onMethodChange }) => {
    const paymentOptions = [
        {
            id: 'mpesa',
            name: 'M-Pesa',
            icon: '📱',
            description: 'Pagamento rápido via móvel',
            details: 'Receberá instruções via SMS'
        },
        {
            id: 'card',
            name: 'Cartão de Crédito',
            icon: '💳',
            description: 'Visa, Mastercard',
            details: 'Pagamento seguro criptografado'
        },
        {
            id: 'transfer',
            name: 'Transferência',
            icon: '🏦',
            description: 'Transferência bancária',
            details: 'Dados fornecidos após confirmação'
        }
    ]

    return (
        <div className="payment-methods">
            <h3>Método de Pagamento</h3>

            <div className="payment-options">
                {paymentOptions.map(option => (
                    <label
                        key={option.id}
                        className={`payment-option ${selectedMethod === option.id ? 'selected' : ''}`}
                    >
                        <input
                            type="radio"
                            name="payment"
                            value={option.id}
                            checked={selectedMethod === option.id}
                            onChange={(e) => onMethodChange(e.target.value)}
                        />

                        <div className="payment-content">
                            <div className="payment-icon">{option.icon}</div>

                            <div className="payment-info">
                                <div className="payment-name">{option.name}</div>
                                <div className="payment-description">{option.description}</div>
                                <div className="payment-details">{option.details}</div>
                            </div>

                            <div className="payment-check">
                                <div className="checkmark"></div>
                            </div>
                        </div>
                    </label>
                ))}
            </div>
        </div>
    )
}

export default PaymentMethods