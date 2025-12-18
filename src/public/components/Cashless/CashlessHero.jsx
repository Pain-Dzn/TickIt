import React from 'react'
import { Link } from 'react-router-dom'

const CashlessHero = () => {
    return (
        <section className="cashless-hero">
            <div className="container">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1>
                            Sistema <span className="highlight">Cashless</span> Tabater
                        </h1>
                        <p className="hero-subtitle">
                            Revolucione a experiência nos seus eventos com pagamentos rápidos,
                            seguros e sem dinheiro físico. Mais eficiência, menos filas.
                        </p>

                        <div className="hero-stats">
                            <div className="stat">
                                <span className="stat-number">70%</span>
                                <span className="stat-label">Menos tempo em filas</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">2s</span>
                                <span className="stat-label">Por transação</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">99%</span>
                                <span className="stat-label">Satisfação</span>
                            </div>
                        </div>

                        <div className="hero-actions">
                            <Link to="/eventos" className="btn btn-primary btn-lg">
                                Ver Eventos com Cashless
                            </Link>
                            <button className="btn btn-outline btn-lg">
                                Saber Mais para Organizadores
                            </button>
                        </div>
                    </div>

                    <div className="hero-visual">
                        <div className="cashless-demo">
                            <div className="wristband">
                                <div className="wristband-chip">💳</div>
                                <div className="wristband-info">
                                    <span className="wristband-name">TABATER CASHILESS</span>
                                    <span className="wristband-balance">Saldo: 500 MT</span>
                                </div>
                            </div>

                            <div className="terminal">
                                <div className="terminal-screen">
                                    <div className="transaction">
                                        <span>Bebida - 50 MT</span>
                                        <span className="transaction-status">✅ Pago</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CashlessHero