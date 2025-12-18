import React from 'react'
import EventCard from './EventCard'

const EventsGrid = ({ eventos, carregando = false, colunasMobile = 1 }) => {
    if (carregando) {
        return (
            <div className={`grid-eventos mobile-cols-${colunasMobile}`}>
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="card-evento skeleton">
                        <div className="imagem-card-evento skeleton"></div>
                        <div className="conteudo-card-evento">
                            <div className="skeleton skeleton-text"></div>
                            <div className="skeleton skeleton-text"></div>
                            <div className="skeleton skeleton-text"></div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (eventos.length === 0) {
        return (
            <div className="eventos-vazios">
                <div className="estado-vazio">
                    <div className="icone-vazio">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h3>Nenhum evento encontrado</h3>
                    <p>Tente ajustar os seus filtros de busca</p>
                </div>
            </div>
        )
    }

    return (
        <div className={`grid-eventos mobile-cols-${colunasMobile}`}>
            {eventos.map(evento => (
                <EventCard key={evento.id} evento={evento} />
            ))}
        </div>
    )
}

export default EventsGrid