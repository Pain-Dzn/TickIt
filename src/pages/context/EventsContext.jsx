import React, { createContext, useContext, useState } from 'react'
import { eventsData } from '../data/eventsData'

const EventsContext = createContext()

export const useEvents = () => {
    const context = useContext(EventsContext)
    if (!context) {
        throw new Error('useEvents deve ser usado dentro de EventsProvider')
    }
    return context
}

export const EventsProvider = ({ children }) => {
    const [eventos] = useState(eventsData)
    const [filtros, setFiltros] = useState({
        busca: '',
        provincia: '',
        categoria: '',
        data: '',
        preco: ''
    })

    const eventosFiltrados = eventos.filter(evento => {
        const correspondeBusca = !filtros.busca ||
            evento.name.pt.toLowerCase().includes(filtros.busca.toLowerCase()) ||
            evento.location.city.toLowerCase().includes(filtros.busca.toLowerCase()) ||
            evento.artist?.toLowerCase().includes(filtros.busca.toLowerCase())

        const correspondeProvincia = !filtros.provincia || evento.location.province === filtros.provincia
        const correspondeCategoria = !filtros.categoria || evento.category === filtros.categoria
        const correspondeData = !filtros.data || evento.date === filtros.data
        const correspondePreco = !filtros.preco || (
            (filtros.preco === 'gratis' && evento.startingPrice === 0) ||
            (filtros.preco === '0-500' && evento.startingPrice > 0 && evento.startingPrice <= 500) ||
            (filtros.preco === '500-1000' && evento.startingPrice > 500 && evento.startingPrice <= 1000) ||
            (filtros.preco === '1000-2000' && evento.startingPrice > 1000 && evento.startingPrice <= 2000) ||
            (filtros.preco === '2000+' && evento.startingPrice > 2000)
        )

        return correspondeBusca && correspondeProvincia && correspondeCategoria && correspondeData && correspondePreco
    })

    const atualizarFiltros = (novosFiltros) => {
        setFiltros(prev => ({ ...prev, ...novosFiltros }))
    }

    const limparFiltros = () => {
        setFiltros({
            busca: '',
            provincia: '',
            categoria: '',
            data: '',
            preco: ''
        })
    }

    const obterEventoPorId = (id) => {
        return eventos.find(evento => evento.id === parseInt(id))
    }

    const valor = {
        eventos: eventosFiltrados,
        todosEventos: eventos,
        filtros,
        atualizarFiltros,
        limparFiltros,
        obterEventoPorId
    }

    return (
        <EventsContext.Provider value={valor}>
            {children}
        </EventsContext.Provider>
    )
}

export default EventsContext