import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useEvents } from './context/EventsContext'
import EventsGrid from '../components/Events/EventsGrid'

const Home = () => {
    const { eventos } = useEvents()
    const [carregado, setCarregado] = useState(false)
    const eventosEmDestaqueContagem = 4

    // Verificar se eventos existe e é um array
    const eventosEmDestaque = React.useMemo(() => {
        if (!eventos || !Array.isArray(eventos)) {
            return []
        }
        return eventos.slice(0, eventosEmDestaqueContagem)
    }, [eventos])

    useEffect(() => {
        const temporizador = setTimeout(() => setCarregado(true), 100)
        return () => clearTimeout(temporizador)
    }, [])

    return (
        <div className={`home-page ${carregado ? 'loaded' : ''}`}>
            {/* Hero Section com Animação */}
            <section className="hero-section">
                <div className="hero-background">
                    <div className="particle particle-1"></div>
                    <div className="particle particle-2"></div>
                    <div className="particle particle-3"></div>
                </div>

                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1 className="hero-title">
                                <span className="title-line">A Experiência</span>
                                <span className="title-line highlight">Perfeita Começa</span>
                                <span className="title-line">Aqui</span>
                            </h1>

                            <p className="hero-subtitle">
                                A plataforma número 1 para venda de bilhetes em Moçambique.
                                Conectamos você aos melhores eventos com segurança, rapidez e confiança.
                            </p>

                            <div className="hero-cta">
                                <Link to="/eventos" className="btn btn-primary btn-large">
                                    Explorar Eventos
                                    <span className="btn-icon">→</span>
                                </Link>
                                <Link to="/sobre" className="btn btn-outline btn-large">
                                    Conheça a Plataforma
                                </Link>
                            </div>
                        </div>

                        <div className="hero-visual">
                            <div className="ticket-card">
                                <div className="ticket-header">
                                    <div className="ticket-venue">MAGNICAS ARENA</div>
                                    <div className="ticket-date">15 DEZ • 21H</div>
                                </div>
                                <div className="ticket-main">
                                    <h3 className="ticket-title">SHOW ESTRELA</h3>
                                    <div className="ticket-price">
                                        <span className="price-from">A partir de</span>
                                        <span className="price-value">850 MZN</span>
                                    </div>
                                </div>
                                <div className="ticket-footer">
                                    <div className="ticket-availability">
                                        <div className="availability-dot"></div>
                                        <span>Últimos bilhetes</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Diferenciais da Plataforma */}
            <section className="platform-features">
                <div className="container">
                    <div className="section-header">
                        <h2>Por que escolher nossa plataforma?</h2>
                        <p>Segurança, praticidade e a melhor experiência para você</p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M12 15V3M12 15L8 11M12 15L16 11M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3>Pagamento Seguro</h3>
                            <p>Transações 100% protegidas com criptografia de ponta a ponta</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M13 10V3L4 14H11V21L20 10H13Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3>Entrega Instantânea</h3>
                            <p>Bilhetes digitais enviados na hora para seu email e celular</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3>Garantia Validada</h3>
                            <p>Cada bilhete verificado e autenticado pela plataforma</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M13.73 21C13.5542 21.3031 13.3018 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3>Suporte 24/7</h3>
                            <p>Equipe especializada disponível para ajudar a qualquer momento</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Eventos em Destaque */}
            <section className="featured-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Eventos Imperdíveis</h2>
                        <p>Descubra as melhores experiências que temos para você</p>
                    </div>

                    <EventsGrid
                        eventos={eventosEmDestaque}
                        carregando={!Array.isArray(eventos)}
                        mensagemVazia={
                            <div className="empty-events">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <h3>Novos eventos em breve!</h3>
                                <p>Fique atento às próximas experiências incríveis</p>
                            </div>
                        }
                    />

                    <div className="view-all-wrapper">
                        <Link to="/eventos" className="btn btn-primary">
                            Ver Todos os Eventos
                            <span className="btn-icon">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="final-cta">
                <div className="container">
                    <div className="cta-content">
                        <h2>Pronto para viver momentos inesquecíveis?</h2>
                        <p>Junte-se a milhares de pessoas que já transformaram suas experiências</p>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home