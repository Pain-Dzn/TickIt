import React, { useState } from 'react'
import { useEvents } from './context/EventsContext'
import EventsGrid from '../components/Events/EventsGrid'
import SearchBar from '../components/UI/SearchBar'
import { provincias, categorias, tiposPreco } from './data/provincesData'

const Events = () => {
    const { eventos, filtros, atualizarFiltros } = useEvents()
    const [buscaLocal, setBuscaLocal] = useState(filtros.busca || '')

    const lidarBusca = (termoBusca) => {
        setBuscaLocal(termoBusca)
        atualizarFiltros({ busca: termoBusca })
    }

    const temFiltrosAtivos = filtros.provincia || filtros.categoria || filtros.data || filtros.preco

    return (
        <div className="pagina-eventos">
            <div className="container">
                <div className="cabecalho-pagina">
                    <h1>Todos os Eventos</h1>
                    <p>Descubra os melhores eventos em Moçambique</p>
                </div>

                {/* Barra de Pesquisa com Botão de Filtros */}
                <div className="secao-busca-eventos">
                    <SearchBar
                        placeholder="Pesquisar eventos, artistas, locais..."
                        aoBuscar={lidarBusca}
                        mostrarBotaoFiltro={true}
                        valorInicial={buscaLocal}
                    />
                </div>

                {/* Indicadores de filtros ativos */}
                {temFiltrosAtivos && (
                    <div className="pills-filtros-ativos">
                        <div className="cabecalho-filtros-ativos">
                            <span className="rotulo-filtros-ativos">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"
                                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3 6H21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Filtros Ativos
                            </span>
                            <button
                                onClick={() => atualizarFiltros({
                                    provincia: '',
                                    categoria: '',
                                    data: '',
                                    preco: ''
                                })}
                                className="btn-limpar-filtros"
                            >
                                Limpar tudo
                            </button>
                        </div>

                        <div className="lista-pills-filtros">
                            {filtros.provincia && (
                                <span className="pill-filtro">
                                    Província: {provincias.find(p => p.value === filtros.provincia)?.label}
                                    <button onClick={() => atualizarFiltros({ provincia: '' })}>
                                        ×
                                    </button>
                                </span>
                            )}
                            {filtros.categoria && (
                                <span className="pill-filtro">
                                    Categoria: {categorias.find(c => c.value === filtros.categoria)?.label}
                                    <button onClick={() => atualizarFiltros({ categoria: '' })}>
                                        ×
                                    </button>
                                </span>
                            )}
                            {filtros.data && (
                                <span className="pill-filtro">
                                    Data: {new Date(filtros.data).toLocaleDateString('pt-MZ', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                    <button onClick={() => atualizarFiltros({ data: '' })}>
                                        ×
                                    </button>
                                </span>
                            )}
                            {filtros.preco && (
                                <span className="pill-filtro">
                                    Preço: {tiposPreco.find(p => p.value === filtros.preco)?.label}
                                    <button onClick={() => atualizarFiltros({ preco: '' })}>
                                        ×
                                    </button>
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Grid de Eventos */}
                <main className="conteudo-principal-eventos">
                    <div className="cabecalho-eventos">
                        <h2 className="contador-eventos">
                            {eventos.length} evento{eventos.length !== 1 ? 's' : ''} encontrado{eventos.length !== 1 ? 's' : ''}
                        </h2>
                    </div>

                    <EventsGrid eventos={eventos} />
                </main>
            </div>
        </div>
    )
}

export default Events