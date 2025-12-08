import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="container">
                    <div className="about-hero-content">
                        <h1>Sobre o TickIt</h1>
                        <p className="about-hero-subtitle">
                            A plataforma líder em venda de bilhetes em Moçambique
                        </p>
                    </div>
                </div>
            </section>

            {/* Nossa História */}
            <section className="about-section">
                <div className="container">
                    <div className="about-content">
                        <div className="about-text">
                            <h2>Nossa História</h2>
                            <p>
                                O TickIt nasceu da necessidade de simplificar e modernizar a forma como
                                moçambicanos compram bilhetes para eventos. Percebemos que havia uma lacuna
                                no mercado para uma plataforma confiável, segura e fácil de usar.
                            </p>
                            <p>
                                Desde o nosso lançamento, temos trabalhado incansavelmente para conectar
                                pessoas aos melhores eventos, garantindo uma experiência de compra sem
                                complicações e com total segurança.
                            </p>
                        </div>
                        <div className="about-visual">
                            <div className="visual-card">
                                <div className="visual-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3>2020</h3>
                                <p>Ano de fundação</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Nossa Missão */}
            <section className="about-section mission-section">
                <div className="container">
                    <div className="mission-grid">
                        <div className="mission-card">
                            <div className="mission-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3>Missão</h3>
                            <p>
                                Democratizar o acesso a eventos e experiências únicas, oferecendo
                                uma plataforma segura, eficiente e acessível para todos os moçambicanos.
                            </p>
                        </div>

                        <div className="mission-card">
                            <div className="mission-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5C16.478 5 20.268 7.943 21.542 12C20.268 16.057 16.478 19 12 19C7.523 19 3.732 16.057 2.458 12Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3>Visão</h3>
                            <p>
                                Ser a plataforma de referência em Moçambique para compra de bilhetes,
                                reconhecida pela confiança, inovação e excelência no serviço.
                            </p>
                        </div>

                        <div className="mission-card">
                            <div className="mission-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 6V12L16 14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3>Valores</h3>
                            <p>
                                Transparência, segurança, inovação e compromisso com a satisfação
                                dos nossos clientes são os pilares que guiam todas as nossas ações.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Números */}
            <section className="about-section stats-section">
                <div className="container">
                    <h2 className="stats-title">TickIt em Números</h2>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-number">10K+</div>
                            <div className="stat-label">Bilhetes Vendidos</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">500+</div>
                            <div className="stat-label">Eventos Realizados</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">5K+</div>
                            <div className="stat-label">Clientes Satisfeitos</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">24/7</div>
                            <div className="stat-label">Suporte Disponível</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Por que escolher */}
            <section className="about-section why-section">
                <div className="container">
                    <h2 className="section-title">Por que escolher o TickIt?</h2>
                    <div className="why-grid">
                        <div className="why-card">
                            <div className="why-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M12 15V3M12 15L8 11M12 15L16 11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 17L12 22L22 17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 12L12 17L22 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3>Segurança Garantida</h3>
                            <p>Todas as transações são protegidas com criptografia de ponta a ponta</p>
                        </div>

                        <div className="why-card">
                            <div className="why-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M13 10V3L4 14H11V21L20 10H13Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3>Entrega Instantânea</h3>
                            <p>Receba seus bilhetes digitais imediatamente após a compra</p>
                        </div>

                        <div className="why-card">
                            <div className="why-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M12 8C13.1046 8 14 7.10457 14 6C14 4.89543 13.1046 4 12 4C10.8954 4 10 4.89543 10 6C10 7.10457 10.8954 8 12 8Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 20C13.1046 20 14 19.1046 14 18C14 16.8954 13.1046 16 12 16C10.8954 16 10 16.8954 10 18C10 19.1046 10.8954 20 12 20Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3>Fácil de Usar</h3>
                            <p>Interface intuitiva e processo de compra simplificado</p>
                        </div>

                        <div className="why-card">
                            <div className="why-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0034 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3>Suporte Dedicado</h3>
                            <p>Equipe pronta para ajudar você a qualquer momento</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="about-cta">
                <div className="container">
                    <div className="cta-content">
                        <h2>Pronto para começar?</h2>
                        <p>Explore nossos eventos e garanta já o seu bilhete</p>
                        <Link to="/eventos" className="btn btn-primary btn-large">
                            Ver Eventos Disponíveis
                            <span className="btn-icon">→</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About