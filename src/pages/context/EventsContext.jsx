import React, { createContext, useContext, useState } from 'react'
import { eventsData } from '../data/eventsData'

const EventsContext = createContext()

export const useEvents = () => {
    const context = useContext(EventsContext)
    if (!context) {
        throw new Error('useEvents must be used within EventsProvider')
    }
    return context
}

export const EventsProvider = ({ children }) => {
    const [events] = useState(eventsData)
    const [filters, setFilters] = useState({
        search: '',
        province: '',
        category: '',
        date: ''
    })

    const filteredEvents = events.filter(event => {
        const matchesSearch = !filters.search ||
            event.name.pt.toLowerCase().includes(filters.search.toLowerCase()) ||
            event.location.city.toLowerCase().includes(filters.search.toLowerCase()) ||
            event.artist?.toLowerCase().includes(filters.search.toLowerCase())

        const matchesProvince = !filters.province || event.location.province === filters.province
        const matchesCategory = !filters.category || event.category === filters.category
        const matchesDate = !filters.date || event.date === filters.date

        return matchesSearch && matchesProvince && matchesCategory && matchesDate
    })

    const updateFilters = (newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }))
    }

    const clearFilters = () => {
        setFilters({
            search: '',
            province: '',
            category: '',
            date: ''
        })
    }

    const getEventById = (id) => {
        return events.find(event => event.id === parseInt(id))
    }

    const value = {
        events: filteredEvents,
        allEvents: events,
        filters,
        updateFilters,
        clearFilters,
        getEventById
    }

    return (
        <EventsContext.Provider value={value}>
            {children}
        </EventsContext.Provider>
    )
}
export default EventsContext