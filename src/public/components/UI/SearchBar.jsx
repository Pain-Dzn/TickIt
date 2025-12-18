import React, { useState } from 'react'
import FilterModal from './FilterModal'

const SearchBar = ({
    placeholder = "Pesquisar eventos...",
    aoBuscar,
    mostrarBotaoFiltro = true,
    valorInicial = ""
}) => {
    const [termoBusca, setTermoBusca] = useState(valorInicial)
    const [modalFiltroAberto, setModalFiltroAberto] = useState(false)

    const lidarEnvio = (e) => {
        e.preventDefault()
        const termoLimpo = termoBusca.trim()
        if (termoLimpo) {
            aoBuscar(termoLimpo)
        }
    }

    const lidarMudancaInput = (e) => {
        const valor = e.target.value
        setTermoBusca(valor)
    }

    const lidarTeclaPressionada = (e) => {
        if (e.key === 'Enter') {
            lidarEnvio(e)
        }
    }

    const abrirFiltros = () => {
        setModalFiltroAberto(true)
    }

    const fecharFiltros = () => {
        setModalFiltroAberto(false)
    }

    return (
        <>
            <div className="barra-busca">
                <form onSubmit={lidarEnvio} className="formulario-busca">
                    <div className="container-input-busca">
                        <input
                            type="text"
                            placeholder={placeholder}
                            value={termoBusca}
                            onChange={lidarMudancaInput}
                            onKeyDown={lidarTeclaPressionada}
                            className="input-busca"
                            aria-label="Pesquisar eventos"
                        />
                        <button type="submit" className="botao-busca" aria-label="Buscar">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {mostrarBotaoFiltro && (
                            <div className="divisor-busca"></div>
                        )}

                        {mostrarBotaoFiltro && (
                            <button
                                type="button"
                                onClick={abrirFiltros}
                                className="botao-filtro-interno"
                                aria-label="Abrir filtros"
                                title="Abrir filtros"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z"
                                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="texto-botao-filtro">Filtrar</span>
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <FilterModal
                aberto={modalFiltroAberto}
                aoFechar={fecharFiltros}
            />
        </>
    )
}

export default SearchBar