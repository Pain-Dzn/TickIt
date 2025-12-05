import React from 'react'
import { Link } from 'react-router-dom'

const EventCard = ({ evento }) => {
    const formatarData = (dataString) => {
        const data = new Date(dataString)
        return data.toLocaleDateString('pt-MZ', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    const formatarPreco = (preco) => {
        return new Intl.NumberFormat('pt-MZ', {
            style: 'currency',
            currency: 'MZN'
        }).format(preco)
    }

    return (
        <div className="card-evento fade-in">
            <div className="imagem-card-evento">
                <img
                    src={evento.image}
                    alt={evento.name.pt}
                    loading="lazy"
                />
                <div className="overlay-card-evento">
                    <span className="categoria-evento">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M20.59 13.41L13.42 20.58C12.05 21.95 10.11 21.95 8.74 20.58L3.42 15.26C2.05 13.89 2.05 11.95 3.42 10.58L10.59 3.41C11.37 2.63 12.63 2.63 13.41 3.41L20.58 10.58C21.36 11.36 21.36 12.63 20.59 13.41Z"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {evento.category}
                    </span>
                </div>
            </div>

            <div className="conteudo-card-evento">
                <div className="data-hora-evento">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z"
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="data-evento">{formatarData(evento.date)}</span>
                    <span className="hora-evento">• {evento.time}</span>
                </div>

                <h3 className="titulo-evento">{evento.name.pt}</h3>

                <div className="localizacao-evento">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M17.657 16.657L13.414 20.9C13.039 21.254 12.531 21.457 12 21.457C11.469 21.457 10.961 21.254 10.586 20.9L6.343 16.657C5.224 15.538 4.462 14.112 4.153 12.56C3.844 11.008 4.003 9.403 4.609 7.938C5.215 6.473 6.239 5.227 7.537 4.381C8.835 3.535 10.344 3.129 11.884 3.219C13.424 3.309 14.874 3.89 16.066 4.882C17.258 5.874 18.131 7.229 18.562 8.76C18.994 10.291 18.964 11.921 18.475 13.433C17.986 14.945 17.061 16.264 15.828 17.228"
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{evento.location.venue}, {evento.location.city}</span>
                </div>

                {evento.artist && (
                    <div className="artista-evento">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <strong>Artista:</strong> {evento.artist}
                    </div>
                )}

                <div className="rodape-card-evento">
                    <div className="preco-evento">
                        <span className="texto-apartir">a partir de</span>
                        <span className="valor-preco">{formatarPreco(evento.startingPrice)}</span>
                    </div>

                    <Link
                        to={`/evento/${evento.id}`}
                        className="btn btn-primary btn-sm"
                    >
                        Comprar
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M5 12H19M12 5L19 12L12 19"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default EventCard