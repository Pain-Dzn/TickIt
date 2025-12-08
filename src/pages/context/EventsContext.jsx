import React, { createContext, useContext, useState, useEffect } from 'react'
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
    const [eventos, setEventos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log("🚀 INICIANDO CARREGAMENTO DE EVENTOS...");

        const carregarEventos = () => {
            const storedEvents = localStorage.getItem('eventos_vendidos')

            console.log("📦 LocalStorage possui dados?", !!storedEvents);

            if (storedEvents) {
                try {
                    const parsedEvents = JSON.parse(storedEvents)
                    console.log("📊 Eventos no localStorage:", parsedEvents.length);

                    // Log detalhado de cada ticket
                    parsedEvents.forEach((evento, i) => {
                        console.log(`\n📅 Evento ${i + 1}: ${evento.name.pt}`);
                        evento.tickets.forEach(ticket => {
                            console.log(`  🎫 ${ticket.type}: available=${ticket.available}, vendidos=${ticket.vendidos || 0}`);
                        });
                    });

                    // Verificar se TODOS estão esgotados
                    const todosEsgotados = parsedEvents.every(evento =>
                        evento.tickets.every(ticket => {
                            const eventoOriginal = eventsData.find(e => e.id === evento.id)
                            const ticketOriginal = eventoOriginal?.tickets.find(t => t.id === ticket.id)
                            const totalInicial = ticketOriginal?.available || 0
                            const vendidos = ticket.vendidos || 0
                            const disponivel = totalInicial - vendidos

                            console.log(`    Calculando: total=${totalInicial}, vendidos=${vendidos}, disponível=${disponivel}`);
                            return disponivel <= 0
                        })
                    )

                    console.log("🔍 Todos esgotados?", todosEsgotados);

                    if (todosEsgotados) {
                        console.log('🔄 RESETANDO - Todos os bilhetes esgotados');
                        const eventosIniciais = eventsData.map(evento => ({
                            ...evento,
                            tickets: evento.tickets.map(ticket => ({
                                ...ticket,
                                vendidos: 0,
                                codesGerados: [],
                                available: ticket.available
                            }))
                        }))

                        console.log("✅ Eventos resetados:", eventosIniciais[0].tickets[0]);
                        setEventos(eventosIniciais)
                        localStorage.setItem('eventos_vendidos', JSON.stringify(eventosIniciais))
                        setLoading(false)
                        return
                    }

                    // Recalcular available
                    console.log('✅ Recalculando bilhetes disponíveis...');
                    const eventosComBilhetes = parsedEvents.map(evento => {
                        const eventoOriginal = eventsData.find(e => e.id === evento.id)

                        return {
                            ...evento,
                            tickets: evento.tickets.map(ticket => {
                                const ticketOriginal = eventoOriginal?.tickets.find(t => t.id === ticket.id)
                                const totalInicial = ticketOriginal?.available || 0
                                const vendidos = ticket.vendidos || 0
                                const calculado = Math.max(0, totalInicial - vendidos)

                                console.log(`  📝 Recalculado: ${ticket.type} = ${totalInicial} - ${vendidos} = ${calculado}`);

                                return {
                                    ...ticket,
                                    vendidos: vendidos,
                                    codesGerados: ticket.codesGerados || [],
                                    available: calculado
                                }
                            })
                        }
                    })

                    console.log("✅ Eventos carregados do localStorage");
                    setEventos(eventosComBilhetes)
                    setLoading(false)
                    return

                } catch (error) {
                    console.error('❌ ERRO ao carregar eventos:', error)
                }
            }

            // Primeira vez - dados iniciais
            console.log('🆕 Primeira vez - carregando dados iniciais');
            const eventosIniciais = eventsData.map(evento => ({
                ...evento,
                tickets: evento.tickets.map(ticket => {
                    console.log(`  ✨ Criando ticket ${ticket.type}: available=${ticket.available}`);
                    return {
                        ...ticket,
                        vendidos: 0,
                        codesGerados: [],
                        available: ticket.available
                    }
                })
            }))

            console.log("✅ Dados iniciais criados:", eventosIniciais[0].tickets[0]);
            setEventos(eventosIniciais)
            localStorage.setItem('eventos_vendidos', JSON.stringify(eventosIniciais))
            setLoading(false)
        }

        carregarEventos()
    }, [])

    useEffect(() => {
        if (eventos.length > 0 && !loading) {
            console.log("💾 Salvando no localStorage...");
            localStorage.setItem('eventos_vendidos', JSON.stringify(eventos))
        }
    }, [eventos, loading])

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
            (evento.artist && evento.artist.toLowerCase().includes(filtros.busca.toLowerCase()))

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

    const venderBilhetes = (eventoId, ticketId, quantidade) => {
        console.log(`🎫 VENDENDO: ${quantidade} bilhetes do ticket ${ticketId} do evento ${eventoId}`);

        setEventos(prev => {
            const novosEventos = prev.map(evento => {
                if (evento.id === eventoId) {
                    const novosTickets = evento.tickets.map(ticket => {
                        if (ticket.id === ticketId) {
                            const vendidosAtuais = ticket.vendidos || 0
                            const disponiveisAtuais = ticket.available

                            console.log(`  📊 Estado atual: vendidos=${vendidosAtuais}, disponível=${disponiveisAtuais}`);

                            if (disponiveisAtuais < quantidade) {
                                console.error(`  ❌ ERRO: Tentando vender ${quantidade}, mas só há ${disponiveisAtuais}`);
                                return ticket
                            }

                            const novosVendidos = vendidosAtuais + quantidade
                            const novosDisponiveis = disponiveisAtuais - quantidade

                            const novosCodes = Array.from({ length: quantidade }, (_, i) =>
                                `TKT-${eventoId}-${ticketId}-${Date.now()}-${Math.random().toString(36).substr(2, 8).toUpperCase()}-${i + 1}`
                            )

                            console.log(`  ✅ Novo estado: vendidos=${novosVendidos}, disponível=${novosDisponiveis}`);

                            return {
                                ...ticket,
                                vendidos: novosVendidos,
                                codesGerados: [...(ticket.codesGerados || []), ...novosCodes],
                                available: novosDisponiveis
                            }
                        }
                        return ticket
                    })

                    return {
                        ...evento,
                        tickets: novosTickets
                    }
                }
                return evento
            })

            return novosEventos
        })
    }

    const obterBilhetesVendidos = (eventoId, ticketId) => {
        const evento = eventos.find(e => e.id === eventoId)
        if (!evento) return []

        const ticket = evento.tickets.find(t => t.id === ticketId)
        return ticket?.codesGerados || []
    }

    const resetarEventos = () => {
        console.log("🔄 RESETANDO EVENTOS...");
        const eventosResetados = eventsData.map(evento => ({
            ...evento,
            tickets: evento.tickets.map(ticket => ({
                ...ticket,
                vendidos: 0,
                codesGerados: [],
                available: ticket.available
            }))
        }))

        setEventos(eventosResetados)
        localStorage.setItem('eventos_vendidos', JSON.stringify(eventosResetados))
        console.log("✅ Eventos resetados!");
        alert('✅ Todos os eventos foram resetados para os valores iniciais!')
    }

    const forcarReset = () => {
        console.log('💥 FORÇANDO RESET COMPLETO...');
        localStorage.removeItem('eventos_vendidos')
        localStorage.removeItem('cart')
        console.log('✅ localStorage limpo!');
        window.location.reload()
    }

    const valor = {
        eventos: eventosFiltrados,
        todosEventos: eventos,
        filtros,
        atualizarFiltros,
        limparFiltros,
        obterEventoPorId,
        venderBilhetes,
        obterBilhetesVendidos,
        resetarEventos,
        forcarReset,
        loading
    }

    return (
        <EventsContext.Provider value={valor}>
            {children}
        </EventsContext.Provider>
    )
}

export default EventsContext