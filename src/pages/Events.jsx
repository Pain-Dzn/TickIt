import React from 'react'
import { useEvents } from './context/EventsContext'
import EventsGrid from '../components/Events/EventsGrid'
import EventFilters from '../components/Events/EventFilters'

const Events = () => {
    const { events } = useEvents()

    return (
        <div className="events-page">
            <div className="container">
                <div className="page-header">
                    <h1>Todos os Eventos</h1>
                    <p>Descubra os melhores eventos em Moçambique</p>
                </div>

                <div className="events-layout">
                    {/* Sidebar com Filtros */}
                    <aside className="events-sidebar">
                        <EventFilters />
                    </aside>

                    {/* Grid de Eventos */}
                    <main className="events-main">
                        <div className="events-header">
                            <h2>
                                {events.length} evento{events.length !== 1 ? 's' : ''} encontrado{events.length !== 1 ? 's' : ''}
                            </h2>
                        </div>

                        <EventsGrid events={events} />
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Events