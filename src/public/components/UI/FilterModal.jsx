import React, { useEffect, useRef } from 'react'
import { useEvents } from '../../pages/context/EventsContext'
import { provincias, categorias, tiposPreco } from '../../pages/data/provincesData'

const FilterModal = ({ aberto, aoFechar }) => {
    const { filtros, atualizarFiltros, limparFiltros } = useEvents()
    const modalRef = useRef(null)

    useEffect(() => {
        const teclaEsc = (e) => {
            if (e.key === 'Escape') aoFechar()
        }

        if (aberto) {
            document.addEventListener('keydown', teclaEsc)
            document.body.style.overflow = 'hidden'
            modalRef.current?.focus()
        }

        return () => {
            document.removeEventListener('keydown', teclaEsc)
            document.body.style.overflow = 'unset'
        }
    }, [aberto, aoFechar])

    const alterarFiltro = (tipo, valor) => {
        atualizarFiltros({ [tipo]: valor })
    }

    const fecharModal = (e) => {
        if (e.target === e.currentTarget || e.key === 'Escape') {
            aoFechar()
        }
    }

    const limparEFechar = () => {
        limparFiltros()
        aoFechar()
    }

    if (!aberto) return null

    return (
        <div
            className="modal-filtro-overlay"
            onClick={fecharModal}
            role="dialog"
            aria-modal="true"
            aria-label="Filtros de eventos"
        >
            <div
                ref={modalRef}
                className="modal-filtro"
                tabIndex="-1"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-filtro-cabecalho">
                    <h3 className="modal-filtro-titulo">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Filtrar Eventos
                    </h3>
                    <button
                        onClick={aoFechar}
                        className="modal-filtro-fechar"
                        aria-label="Fechar filtros"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M18 6L6 18M6 6L18 18"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <div className="modal-filtro-conteudo">
                    <div className="grupo-filtro">
                        <label htmlFor="busca-filtro" className="label-filtro">
                            Buscar
                        </label>
                        <input
                            id="busca-filtro"
                            type="text"
                            placeholder="Evento, artista, local..."
                            value={filtros.busca || ''}
                            onChange={(e) => alterarFiltro('busca', e.target.value)}
                            className="input-filtro"
                            autoComplete="off"
                        />
                    </div>

                    <div className="grupo-filtro">
                        <label htmlFor="provincia-filtro" className="label-filtro">
                            Província
                        </label>
                        <select
                            id="provincia-filtro"
                            value={filtros.provincia || ''}
                            onChange={(e) => alterarFiltro('provincia', e.target.value)}
                            className="select-filtro"
                        >
                            <option value="">Todas as províncias</option>
                            {provincias.map(provincia => (
                                <option key={provincia.value} value={provincia.value}>
                                    {provincia.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grupo-filtro">
                        <label htmlFor="categoria-filtro" className="label-filtro">
                            Categoria
                        </label>
                        <select
                            id="categoria-filtro"
                            value={filtros.categoria || ''}
                            onChange={(e) => alterarFiltro('categoria', e.target.value)}
                            className="select-filtro"
                        >
                            <option value="">Todas as categorias</option>
                            {categorias.map(categoria => (
                                <option key={categoria.value} value={categoria.value}>
                                    {categoria.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grupo-filtro">
                        <label htmlFor="data-filtro" className="label-filtro">
                            Data
                        </label>
                        <input
                            id="data-filtro"
                            type="date"
                            value={filtros.data || ''}
                            onChange={(e) => alterarFiltro('data', e.target.value)}
                            className="input-filtro"
                        />
                    </div>

                    <div className="grupo-filtro">
                        <label htmlFor="preco-filtro" className="label-filtro">
                            Faixa de Preço
                        </label>
                        <select
                            id="preco-filtro"
                            value={filtros.preco || ''}
                            onChange={(e) => alterarFiltro('preco', e.target.value)}
                            className="select-filtro"
                        >
                            <option value="">Qualquer preço</option>
                            {tiposPreco.map(preco => (
                                <option key={preco.value} value={preco.value}>
                                    {preco.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="modal-filtro-rodape">
                    <button
                        onClick={limparEFechar}
                        className="btn btn-outline"
                        type="button"
                    >
                        Limpar Filtros
                    </button>
                    <button
                        onClick={aoFechar}
                        className="btn btn-primary"
                        type="button"
                    >
                        Aplicar Filtros
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FilterModal