import React from 'react'
import './Cashless.css'

const Cashless = () => {
    return (
        <div className="cashless-page">
            {/* Header */}
            <header className="cashless-header">
                <div className="cashless-container">
                    <h1 className="cashless-title">TABATER</h1>
                    <div className="cashless-description">
                        <p>
                            O sistema cashless em eventos é um método de pagamento que permite que os participantes do evento
                            realizem transações sem precisar de dinheiro em papel ou moedas. Em vez disso, eles usam pulseiras,
                            cartões ou outros dispositivos eletrônicos para fazer pagamentos.
                        </p>
                        <p>
                            Para usar o sistema cashless em um evento, os participantes primeiro precisam carregar dinheiro em
                            suas pulseiras (pulseiras cashless) ou cartões eletrônicos antes do evento ou durante o evento em
                            pontos de recarga disponibilizados pelos organizadores. Então, quando eles querem fazer uma compra,
                            basta aproximar a pulseira ou o cartão do dispositivo de pagamento, e o valor da compra será deduzido
                            do saldo carregado.
                        </p>
                        <p>
                            Existem várias vantagens em usar um sistema cashless em eventos, como:
                        </p>
                    </div>
                </div>
            </header>

            {/* Vantagens Section */}
            <section className="advantages-section">
                <div className="cashless-container">
                    <div className="advantages-grid">
                        {/* Vantagens para Usuários */}
                        <div className="advantages-column">
                            <h3 className="advantages-column-title">Vantagens para usuários:</h3>
                            <ul className="advantages-list">
                                <li className="advantage-item">
                                    <strong>Rapidez:</strong> as transações são mais rápidas e eficientes, com menos filas e espera;
                                </li>
                                <li className="advantage-item">
                                    <strong>Conveniência:</strong> elimina a necessidade de transportar dinheiro em espécie e preocupações com troco;
                                </li>
                                <li className="advantage-item">
                                    <strong>Segurança:</strong> reduz a possibilidade de roubo ou perda de dinheiro em espécie;
                                </li>
                                <li className="advantage-item">
                                    <strong>Controle:</strong> permite um controle mais preciso sobre os gastos, ajudando a gerenciar o orçamento durante o evento;
                                </li>
                                <li className="advantage-item">
                                    <strong>Personalização:</strong> as pulseiras ou cartões personalizados com a marca do evento podem ser uma lembrança e souvenir.
                                </li>
                            </ul>
                        </div>

                        {/* Vantagens para Organizadores */}
                        <div className="advantages-column">
                            <h3 className="advantages-column-title">Vantagens para organizadores:</h3>
                            <ul className="advantages-list">
                                <li className="advantage-item">
                                    <strong>Segurança:</strong> elimina a necessidade de manusear grandes quantias de dinheiro em espécie;
                                </li>
                                <li className="advantage-item">
                                    <strong>Controle financeiro:</strong> facilita o controle do fluxo de caixa e a identificação de possíveis fraudes ou desvios;
                                </li>
                                <li className="advantage-item">
                                    <strong>Eficiência operacional:</strong> reduz as filas e o tempo de espera nas transações, melhorando a experiência do evento para os participantes;
                                </li>
                                <li className="advantage-item">
                                    <strong>Insights de dados:</strong> o sistema cashless pode fornecer dados valiosos sobre o comportamento do consumidor, como as áreas mais populares do evento, horários de maior movimento, etc., ajudando os organizadores a tomar decisões mais informadas para futuros eventos.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Journey Section */}
            <section className="journey-section">
                <div className="cashless-container">
                    <div className="journey-header">
                        <h2 className="journey-main-title">CASHLESS</h2>
                        <h3 className="journey-subtitle">JORNADA</h3>
                    </div>

                    <div className="instructions-header">
                        <h4 className="instructions-title">INSTRUÇÕES DA SUA PULSEIRA RFID</h4>
                    </div>

                    <div className="journey-steps">
                        {/* Step 1 */}
                        <div className="journey-step">
                            <div className="step-number">1</div>
                            <div className="step-content">
                                <h5 className="step-title">BILHETE</h5>
                                <p className="step-description">Compre o seu bilhete.</p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="journey-step">
                            <div className="step-number">2</div>
                            <div className="step-content">
                                <h5 className="step-title">RECEBA SUA PULSEIRA</h5>
                                <p className="step-description">Troque o seu bilhete pela pulseira RFID na chegada.</p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="journey-step">
                            <div className="step-number">3</div>
                            <div className="step-content">
                                <h5 className="step-title">ENTRADA</h5>
                                <p className="step-description">Faça a sua entrada através do controlo de segurança e acesso.</p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="journey-step">
                            <div className="step-number">4</div>
                            <div className="step-content">
                                <h5 className="step-title">CARREGAR</h5>
                                <p className="step-description">Carregue dinheiro na sua pulseira RFID, seja online ou num ponto de carregamento no local.</p>
                            </div>
                        </div>

                        {/* Step 5 */}
                        <div className="journey-step">
                            <div className="step-number">5</div>
                            <div className="step-content">
                                <h5 className="step-title">FAÇA COMPRAS</h5>
                                <p className="step-description">Compre comida, bebidas, mercadorias e outros produtos usando o crédito da sua pulseira.</p>
                            </div>
                        </div>

                        {/* Step 6 */}
                        <div className="journey-step">
                            <div className="step-number">6</div>
                            <div className="step-content">
                                <h5 className="step-title">REEMBOLSO</h5>
                                <p className="step-description">Recolha o crédito restante online ou no local.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="cashless-footer">
                <div className="cashless-container">
                    <p>&copy; 2024 Tabater | Sistema Cashless para Eventos</p>
                </div>
            </footer>
        </div>
    )
}

export default Cashless