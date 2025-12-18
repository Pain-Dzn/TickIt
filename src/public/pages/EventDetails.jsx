import React, { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEvents } from './context/EventsContext'
import { useCart } from './context/CartContext'
import {
    ArrowLeft, Calendar, MapPin, User, Mic, FileText,
    Ticket, Clock, AlertTriangle, Plus, Minus,
    ArrowRight, Maximize2, ShoppingCart
} from 'lucide-react'
import './EventDetails.css'

const EventDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { obterEventoPorId } = useEvents()
    const { addToCart } = useCart()

    const [event, setEvent] = useState(null)
    const [selectedTickets, setSelectedTickets] = useState({})
    const [loading, setLoading] = useState(true)
    const [fullscreen, setFullscreen] = useState(false)
    const posterRef = useRef(null)

    useEffect(() => {
        const foundEvent = obterEventoPorId(id)
        setEvent(foundEvent)
        setLoading(false)

        if (foundEvent) {
            const initialTickets = {}
            foundEvent.tickets.forEach(ticket => {
                if (ticket.available > 0) {
                    initialTickets[ticket.id] = {
                        quantity: 0,
                        ticket: ticket
                    }
                }
            })
            setSelectedTickets(initialTickets)
        }
    }, [id, obterEventoPorId])

    const isTicketAvailable = (ticket) => {
        return ticket.available > 0
    }

    const getCurrentPhase = (tickets) => {
        const availableTickets = tickets.filter(ticket => ticket.available > 0)
        if (availableTickets.length > 0) {
            return availableTickets[0].phase
        }
        return 'Esgotado'
    }

    const handleQuantityChange = (ticketId, change) => {
        setSelectedTickets(prev => {
            const currentData = prev[ticketId]
            if (!currentData) return prev

            const currentQty = currentData.quantity || 0
            const newQty = Math.max(0, currentQty + change)
            const ticket = currentData.ticket

            if (newQty > ticket.available) {
                return prev
            }

            return {
                ...prev,
                [ticketId]: {
                    ...currentData,
                    quantity: newQty,
                    subtotal: newQty * ticket.price
                }
            }
        })
    }

    const handleAddToCart = () => {
        const ticketsToAdd = []

        Object.values(selectedTickets).forEach(ticketData => {
            if (ticketData.quantity > 0 && ticketData.ticket) {
                ticketsToAdd.push({
                    ...ticketData.ticket,
                    quantity: ticketData.quantity,
                    eventId: event.id,
                    eventName: event.name.pt,
                    eventDate: event.date,
                    eventImage: event.image,
                    eventTime: event.time,
                    eventLocation: `${event.location.venue}, ${event.location.city}`
                })
            }
        })

        if (ticketsToAdd.length === 0) {
            alert('Por favor, selecione pelo menos um bilhete.')
            return
        }

        // Adicionar cada bilhete ao carrinho
        ticketsToAdd.forEach(ticket => {
            addToCart(ticket)
        })

        navigate('/checkout')
    }

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            if (posterRef.current.requestFullscreen) {
                posterRef.current.requestFullscreen()
            }
            setFullscreen(true)
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            }
            setFullscreen(false)
        }
    }

    // Calcular totais corretamente
    const calculateTotals = () => {
        let totalTickets = 0
        let totalPrice = 0

        Object.values(selectedTickets).forEach(ticketData => {
            if (ticketData && ticketData.quantity) {
                totalTickets += ticketData.quantity
                totalPrice += (ticketData.quantity * ticketData.ticket.price)
            }
        })

        return { totalTickets, totalPrice }
    }

    const { totalTickets, totalPrice } = calculateTotals()

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
                        <h2>Evento não encontrado</h2>
                        <p>O evento que procura não existe ou foi removido.</p>
                        <Link to="/eventos" className="btn btn-primary">
                            <ArrowLeft size={16} /> Voltar aos Eventos
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    const availableTickets = event.tickets.filter(ticket => ticket.available > 0)
    const currentPhase = getCurrentPhase(availableTickets)

    return (
        <div className="event-details">
            <div className="container">
                <div className="event-header">
                    <Link to="/eventos" className="back-link">
                        <ArrowLeft size={16} /> Voltar aos Eventos
                    </Link>
                </div>

                <div className="event-content">
                    <div className="event-main">
                        <div className="event-poster-container">
                            <div
                                className="event-poster"
                                ref={posterRef}
                            >
                                <img
                                    src={event.image}
                                    alt={event.name.pt}
                                    className={fullscreen ? 'fullscreen' : ''}
                                />
                                <div className="fullscreen-btn" onClick={toggleFullscreen}>
                                    <Maximize2 size={20} />
                                </div>
                                {availableTickets.length === 0 && (
                                    <div className="sold-out-banner">
                                        <Ticket size={16} />
                                        <span>Esgotado</span>
                                    </div>
                                )}
                            </div>
                            <div className="poster-actions">
                                <button
                                    onClick={toggleFullscreen}
                                    className="btn btn-secondary btn-sm"
                                >
                                    <Maximize2 size={16} /> Ver em tela cheia
                                </button>
                            </div>
                        </div>

                        <div className="event-basic-info">
                            <h1>{event.name.pt}</h1>

                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="info-label">
                                        <Calendar size={16} />
                                        Data & Hora
                                    </span>
                                    <span className="info-value">
                                        {new Date(event.date).toLocaleDateString('pt-MZ', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })} • {event.time}
                                    </span>
                                </div>

                                <div className="info-item">
                                    <span className="info-label">
                                        <MapPin size={16} />
                                        Local
                                    </span>
                                    <span className="info-value">
                                        {event.location.venue}, {event.location.city}
                                    </span>
                                </div>

                                <div className="info-item">
                                    <span className="info-label">
                                        <User size={16} />
                                        Promotor
                                    </span>
                                    <span className="info-value">{event.promoter}</span>
                                </div>

                                {event.artist && (
                                    <div className="info-item">
                                        <span className="info-label">
                                            <Mic size={16} />
                                            Artista
                                        </span>
                                        <span className="info-value">{event.artist}</span>
                                    </div>
                                )}
                            </div>

                            <div className="event-description">
                                <h3>
                                    <FileText size={20} />
                                    Descrição
                                </h3>
                                <p>{event.description.pt}</p>
                            </div>
                        </div>
                    </div>

                    <div className="tickets-section">
                        <div className="tickets-header">
                            <h2>
                                <Ticket size={24} />
                                Bilhetes Disponíveis
                            </h2>
                            {currentPhase && currentPhase !== 'Esgotado' && (
                                <div className="current-phase">
                                    <span className="phase-badge">
                                        <Clock size={16} />
                                        Fase Atual: {currentPhase}
                                    </span>
                                </div>
                            )}
                        </div>

                        {availableTickets.length === 0 ? (
                            <div className="no-tickets">
                                <Ticket size={32} />
                                <p>Todos os bilhetes estão esgotados para este evento.</p>
                            </div>
                        ) : (
                            <>
                                <div className="tickets-grid">
                                    {availableTickets.map(ticket => {
                                        const ticketData = selectedTickets[ticket.id]
                                        const quantity = ticketData?.quantity || 0
                                        const subtotal = quantity * ticket.price

                                        return (
                                            <div key={ticket.id} className={`ticket-option ${ticket.available < 10 ? 'almost-gone' : ''}`}>
                                                <div className="ticket-header">
                                                    <div className="ticket-type-info">
                                                        <h4>
                                                            <Ticket size={16} />
                                                            {ticket.type.toUpperCase()}
                                                        </h4>
                                                        <span className="ticket-phase">{ticket.phase}</span>
                                                    </div>
                                                    <div className="ticket-price">{ticket.price.toLocaleString('pt-MZ')} MT</div>
                                                </div>

                                                <div className="ticket-availability">
                                                    <span>
                                                        <Ticket size={14} />
                                                        {ticket.available} disponíveis
                                                    </span>
                                                    {ticket.available < 10 && (
                                                        <span className="almost-gone-badge">
                                                            <AlertTriangle size={12} />
                                                            Últimos bilhetes!
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="ticket-controls">
                                                    <button
                                                        onClick={() => handleQuantityChange(ticket.id, -1)}
                                                        disabled={quantity === 0}
                                                        className="quantity-btn"
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="quantity-display">
                                                        {quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => handleQuantityChange(ticket.id, 1)}
                                                        disabled={quantity >= ticket.available}
                                                        className="quantity-btn"
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>

                                                {quantity > 0 && (
                                                    <div className="ticket-subtotal">
                                                        {quantity} × {ticket.price.toLocaleString('pt-MZ')} MT = {subtotal.toLocaleString('pt-MZ')} MT
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>

                                {totalTickets > 0 && (
                                    <div className="cart-summary-sticky">
                                        <div className="summary-content">
                                            <div className="summary-info">
                                                <div className="summary-details">
                                                    <span className="total-tickets">
                                                        <Ticket size={16} />
                                                        {totalTickets} bilhete{totalTickets !== 1 ? 's' : ''} selecionado{totalTickets !== 1 ? 's' : ''}
                                                    </span>
                                                    <div className="ticket-breakdown">
                                                        {Object.entries(selectedTickets).map(([ticketId, ticketData]) => {
                                                            if (ticketData.quantity > 0) {
                                                                return (
                                                                    <div key={ticketId} className="breakdown-item">
                                                                        <span className="breakdown-type">{ticketData.ticket.type.toUpperCase()}:</span>
                                                                        <span className="breakdown-quantity">{ticketData.quantity}x</span>
                                                                        <span className="breakdown-price">{(ticketData.quantity * ticketData.ticket.price).toLocaleString('pt-MZ')} MT</span>
                                                                    </div>
                                                                )
                                                            }
                                                            return null
                                                        })}
                                                    </div>
                                                </div>
                                                <div className="summary-total">
                                                    <span className="total-price">{totalPrice.toLocaleString('pt-MZ')} MT</span>
                                                    <small>Total</small>
                                                </div>
                                            </div>
                                            <button onClick={handleAddToCart} className="btn btn-primary btn-lg">
                                                <ShoppingCart size={20} /> Continuar para Pagamento
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