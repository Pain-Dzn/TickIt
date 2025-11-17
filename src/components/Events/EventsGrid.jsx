import React from 'react'
import EventCard from './EventCard'

const EventsGrid = ({ events, loading = false, language = 'pt', columnsMobile = 1 }) => {
    const translations = {
        pt: {
            noEvents: 'Nenhum evento encontrado',
            adjustFilters: 'Tente ajustar os seus filtros de busca'
        },
        en: {
            noEvents: 'No events found',
            adjustFilters: 'Try adjusting your search filters'
        }
    }

    const t = translations[language] || translations.pt

    if (loading) {
        return (
            <div className={`events-grid mobile-cols-${columnsMobile}`}>
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="event-card skeleton">
                        <div className="event-card-image skeleton"></div>
                        <div className="event-card-content">
                            <div className="skeleton skeleton-text"></div>
                            <div className="skeleton skeleton-text"></div>
                            <div className="skeleton skeleton-text"></div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (events.length === 0) {
        return (
            <div className="events-empty">
                <div className="empty-state">
                    <div className="empty-icon">
                        <i className="fas fa-search"></i>
                    </div>
                    <h3>{t.noEvents}</h3>
                    <p>{t.adjustFilters}</p>
                </div>
            </div>
        )
    }

    return (
        <div className={`events-grid mobile-cols-${columnsMobile}`}>
            {events.map(event => (
                <EventCard key={event.id} event={event} language={language} />
            ))}
        </div>
    )
}

export default EventsGrid