import React from 'react'

const HowItWorks = () => {
    const steps = [
        {
            number: 1,
            icon: '🎫',
            title: 'Compra o Bilhete',
            description: 'Adquire o teu bilhete normalmente através do nosso sistema online ou nos pontos de venda.'
        },
        {
            number: 2,
            icon: '💳',
            title: 'Recebe a Pulseira',
            description: 'No evento, troca o teu bilhete por uma pulseira cashless personalizada.'
        },
        {
            number: 3,
            icon: '💰',
            title: 'Carrega Saldo',
            description: 'Carrega a pulseira com o valor desejado nos postos de carregamento.'
        },
        {
            number: 4,
            icon: '📱',
            title: 'Usa no Evento',
            description: 'Aproxima a pulseira nos terminais para fazer pagamentos rápidos e seguros.'
        }
    ]

    return (
        <section className="how-it-works">
            <div className="container">
                <div className="section-header">
                    <h2>Como Funciona</h2>
                    <p>Simples, rápido e seguro em 4 passos</p>
                </div>

                <div className="steps-container">
                    {steps.map((step, index) => (
                        <div key={step.number} className="step-item">
                            <div className="step-number">{step.number}</div>

                            <div className="step-content">
                                <div className="step-icon">{step.icon}</div>
                                <h3 className="step-title">{step.title}</h3>
                                <p className="step-description">{step.description}</p>
                            </div>

                            {index < steps.length - 1 && (
                                <div className="step-connector"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HowItWorks