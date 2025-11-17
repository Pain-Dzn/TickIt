import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEvents } from '../pages/context/EventsContext'
import { useCart } from '../pages/context/CartContext'

const EventDetails = ({ language = 'pt' }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { getEventById } = useEvents()
    const { addToCart } = useCart()

    const [event, setEvent] = useState(null)
    const [selectedTickets, setSelectedTickets] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const foundEvent = getEventById(id)
        setEvent(foundEvent)
        setLoading(false)

        // Inicializar selectedTickets
        if (foundEvent) {
            const initialTickets = {}
            foundEvent.tickets.forEach(ticket => {
                // Mostrar apenas tickets da fase atual
                if (isTicketAvailable(ticket)) {
                    initialTickets[ticket.id] = 0
                }
            })
            setSelectedTickets(initialTickets)
        }
    }, [id, getEventById])

    // Verificar qual fase do ticket está ativa
    const isTicketAvailable = (ticket) => {
        const now = new Date()
        const startDate = new Date(ticket.startDate)
        const endDate = new Date(ticket.endDate)
        return now >= startDate && now <= endDate
    }

    // Obter fase atual baseada na data
    const getCurrentPhase = (tickets) => {
        const now = new Date()
        for (const ticket of tickets) {
            const startDate = new Date(ticket.startDate)
            const endDate = new Date(ticket.endDate)
            if (now >= startDate && now <= endDate) {
                return ticket.phase
            }
        }
        return tickets[0]?.phase || 'Geral'
    }

    const handleQuantityChange = (ticketId, change) => {
        setSelectedTickets(prev => {
            const currentQty = prev[ticketId] || 0
            const newQty = Math.max(0, currentQty + change)

            const ticket = event.tickets.find(t => t.id === ticketId)
            if (ticket && newQty > ticket.available) {
                return prev
            }

            return {
                ...prev,
                [ticketId]: newQty
            }
        })
    }

    const handleAddToCart = () => {
        let hasTickets = false

        Object.entries(selectedTickets).forEach(([ticketId, quantity]) => {
            if (quantity > 0) {
                hasTickets = true
                const ticket = event.tickets.find(t => t.id === ticketId)
                addToCart({
                    ...ticket,
                    quantity,
                    eventId: event.id,
                    eventName: event.name[language],
                    eventDate: event.date,
                    eventImage: event.image,
                    eventTime: event.time,
                    eventLocation: `${event.location.venue}, ${event.location.city}`
                })
            }
        })

        if (hasTickets) {
            navigate('/checkout')
        } else {
            alert(language === 'pt' ? 'Por favor, selecione pelo menos um bilhete.' : 'Please select at least one ticket.')
        }
    }

    const totalTickets = Object.values(selectedTickets).reduce((sum, qty) => sum + qty, 0)
    const totalPrice = Object.entries(selectedTickets).reduce((sum, [ticketId, quantity]) => {
        const ticket = event?.tickets.find(t => t.id === ticketId)
        return sum + (ticket ? ticket.price * quantity : 0)
    }, 0)

    const translations = {
        pt: {
            back: 'Voltar aos Eventos',
            date: 'Data & Hora',
            location: 'Local',
            promoter: 'Promotor',
            description: 'Descrição',
            availableTickets: 'Bilhetes Disponíveis',
            currentPhase: 'Fase Atual',
            ticketType: 'Tipo de Bilhete',
            price: 'Preço',
            quantity: 'Quantidade',
            available: 'disponíveis',
            total: 'Total',
            tickets: 'bilhetes',
            continue: 'Continuar para Pagamento',
            selectTickets: 'Selecione os bilhetes',
            artist: 'Artista',
            loading: 'Carregando...',
            eventNotFound: 'Evento não encontrado',
            eventNotFoundDesc: 'O evento que procura não existe ou foi removido.',
            backToEvents: 'Voltar aos Eventos',
            almostGone: 'Últimos bilhetes!',
            soldOut: 'Esgotado'
        },
        en: {
            back: 'Back to Events',
            date: 'Date & Time',
            location: 'Location',
            promoter: 'Promoter',
            description: 'Description',
            availableTickets: 'Available Tickets',
            currentPhase: 'Current Phase',
            ticketType: 'Ticket Type',
            price: 'Price',
            quantity: 'Quantity',
            available: 'available',
            total: 'Total',
            tickets: 'tickets',
            continue: 'Continue to Payment',
            selectTickets: 'Select tickets',
            artist: 'Artist',
            loading: 'Loading...',
            eventNotFound: 'Event not found',
            eventNotFoundDesc: 'The event you are looking for does not exist or has been removed.',
            backToEvents: 'Back to Events',
            almostGone: 'Last tickets!',
            soldOut: 'Sold Out'
        }
    }

    const t = translations[language] || translations.pt

    if (loading) {
        return (
            <div className="event-details loading">
                <div className="container">
                    <div className="skeleton skeleton-header"></div>
                    <div className="skeleton skeleton-content"></div>
                </div>
            </div>
        )
    }

    if (!event) {
        return (
            <div className="event-details not-found">
                <div className="container">
                    <div className="error-state">
                        <h2>{t.eventNotFound}</h2>
                        <p>{t.eventNotFoundDesc}</p>
                        <Link to="/eventos" className="btn btn-primary">
                            {t.backToEvents}
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    const availableTickets = event.tickets.filter(ticket => isTicketAvailable(ticket))
    const currentPhase = getCurrentPhase(availableTickets)

    return (
        <div className="event-details">
            <div className="container">
                {/* Cabeçalho */}
                <div className="event-header">
                    <Link to="/eventos" className="back-link">
                        <i className="fas fa-arrow-left"></i> {t.back}
                    </Link>
                </div>

                <div className="event-content">
                    {/* Poster e Informações Básicas */}
                    <div className="event-main">
                        <div className="event-poster">
                            <img src={event.image} alt={event.name[language]} />
                            {availableTickets.length === 0 && (
                                <div className="sold-out-banner">
                                    <i className="fas fa-ticket-alt"></i>
                                    <span>{t.soldOut}</span>
                                </div>
                            )}
                        </div>

                        <div className="event-basic-info">
                            <h1>{event.name[language]}</h1>

                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="info-label">
                                        <i className="fas fa-calendar"></i>
                                        {t.date}
                                    </span>
                                    <span className="info-value">
                                        {new Date(event.date).toLocaleDateString(language, {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })} • {event.time}
                                    </span>
                                </div>

                                <div className="info-item">
                                    <span className="info-label">
                                        <i className="fas fa-map-marker-alt"></i>
                                        {t.location}
                                    </span>
                                    <span className="info-value">
                                        {event.location.venue}, {event.location.city}
                                    </span>
                                </div>

                                <div className="info-item">
                                    <span className="info-label">
                                        <i className="fas fa-user-tie"></i>
                                        {t.promoter}
                                    </span>
                                    <span className="info-value">{event.promoter}</span>
                                </div>

                                {event.artist && (
                                    <div className="info-item">
                                        <span className="info-label">
                                            <i className="fas fa-microphone"></i>
                                            {t.artist}
                                        </span>
                                        <span className="info-value">{event.artist}</span>
                                    </div>
                                )}
                            </div>

                            <div className="event-description">
                                <h3>
                                    <i className="fas fa-file-text"></i>
                                    {t.description}
                                </h3>
                                <p>{event.description[language]}</p>
                            </div>
                        </div>
                    </div>

                    {/* Seleção de Bilhetes */}
                    <div className="tickets-section">
                        <div className="tickets-header">
                            <h2>
                                <i className="fas fa-ticket-alt"></i>
                                {t.availableTickets}
                            </h2>
                            {currentPhase && (
                                <div className="current-phase">
                                    <span className="phase-badge">
                                        <i className="fas fa-clock"></i>
                                        {t.currentPhase}: {currentPhase}
                                    </span>
                                </div>
                            )}
                        </div>

                        {availableTickets.length === 0 ? (
                            <div className="no-tickets">
                                <i className="fas fa-frown"></i>
                                <p>{language === 'pt' ? 'Todos os bilhetes estão esgotados para este evento.' : 'All tickets are sold out for this event.'}</p>
                            </div>
                        ) : (
                            <>
                                <div className="tickets-grid">
                                    {availableTickets.map(ticket => (
                                        <div key={ticket.id} className={`ticket-option ${ticket.available < 10 ? 'almost-gone' : ''
                                            }`}>
                                            <div className="ticket-header">
                                                <div className="ticket-type-info">
                                                    <h4>
                                                        <i className="fas fa-ticket"></i>
                                                        {ticket.type.toUpperCase()}
                                                    </h4>
                                                    <span className="ticket-phase">{ticket.phase}</span>
                                                </div>
                                                <div className="ticket-price">{ticket.price} MT</div>
                                            </div>

                                            <div className="ticket-availability">
                                                <span>
                                                    <i className="fas fa-ticket"></i>
                                                    {ticket.available} {t.available}
                                                </span>
                                                {ticket.available < 10 && (
                                                    <span className="almost-gone-badge">
                                                        <i className="fas fa-exclamation-triangle"></i>
                                                        {t.almostGone}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="ticket-controls">
                                                <button
                                                    onClick={() => handleQuantityChange(ticket.id, -1)}
                                                    disabled={!selectedTickets[ticket.id]}
                                                    className="quantity-btn"
                                                >
                                                    <i className="fas fa-minus"></i>
                                                </button>
                                                <span className="quantity-display">
                                                    {selectedTickets[ticket.id] || 0}
                                                </span>
                                                <button
                                                    onClick={() => handleQuantityChange(ticket.id, 1)}
                                                    disabled={(selectedTickets[ticket.id] || 0) >= ticket.available}
                                                    className="quantity-btn"
                                                >
                                                    <i className="fas fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Resumo do Carrinho */}
                                {totalTickets > 0 && (
                                    <div className="cart-summary-sticky">
                                        <div className="summary-content">
                                            <div className="summary-info">
                                                <span className="total-tickets">
                                                    <i className="fas fa-ticket-alt"></i>
                                                    {totalTickets} {t.tickets}
                                                </span>
                                                <span className="total-price">{totalPrice} MT</span>
                                            </div>
                                            <button onClick={handleAddToCart} className="btn btn-primary btn-lg">
                                                {t.continue} <i className="fas fa-arrow-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventDetails