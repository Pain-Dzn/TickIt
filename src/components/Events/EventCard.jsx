import React from 'react'
import { Link } from 'react-router-dom'

const EventCard = ({ event, language = 'pt' }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString(language, {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat(language === 'pt' ? 'pt-MZ' : 'en-US', {
            style: 'currency',
            currency: 'MZN'
        }).format(price)
    }

    const translations = {
        pt: {
            from: 'a partir de',
            buy: 'Comprar',
            artist: 'Artista:'
        },
        en: {
            from: 'from',
            buy: 'Buy',
            artist: 'Artist:'
        }
    }

    const t = translations[language] || translations.pt

    return (
        <div className="event-card fade-in">
            <div className="event-card-image">
                <img
                    src={event.image}
                    alt={event.name[language]}
                    loading="lazy"
                />
                <div className="event-card-overlay">
                    <span className="event-category">
                        <i className="fas fa-tag"></i>
                        {event.category}
                    </span>
                </div>
            </div>

            <div className="event-card-content">
                <div className="event-date-time">
                    <i className="fas fa-calendar"></i>
                    <span className="event-date">{formatDate(event.date)}</span>
                    <span className="event-time">• {event.time}</span>
                </div>

                <h3 className="event-title">{event.name[language]}</h3>

                <div className="event-location">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{event.location.venue}, {event.location.city}</span>
                </div>

                {event.artist && (
                    <div className="event-artist">
                        <i className="fas fa-user"></i>
                        <strong>{t.artist}</strong> {event.artist}
                    </div>
                )}

                <div className="event-card-footer">
                    <div className="event-price">
                        <span className="price-from">{t.from}</span>
                        <span className="price-amount">{formatPrice(event.startingPrice)}</span>
                    </div>

                    <Link
                        to={`/evento/${event.id}`}
                        className="btn btn-primary btn-sm"
                    >
                        {t.buy} <i className="fas fa-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default EventCard