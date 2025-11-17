import React, { useState } from 'react'
import { useEvents } from '../../pages/context/EventsContext'
import { provinces, categories } from '../../pages/data/provincesData'


const SearchWithFilters = ({ language = 'pt', onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [showFilters, setShowFilters] = useState(false)
    const { filters, updateFilters, clearFilters } = useEvents()

    const translations = {
        pt: {
            searchPlaceholder: 'Pesquisar eventos, artistas...',
            filters: 'Filtros',
            applyFilters: 'Aplicar Filtros',
            clearFilters: 'Limpar Filtros',
            province: 'Província',
            allProvinces: 'Todas as províncias',
            category: 'Categoria',
            allCategories: 'Todas as categorias',
            date: 'Data',
            close: 'Fechar'
        },
        en: {
            searchPlaceholder: 'Search events, artists...',
            filters: 'Filters',
            applyFilters: 'Apply Filters',
            clearFilters: 'Clear Filters',
            province: 'Province',
            allProvinces: 'All provinces',
            category: 'Category',
            allCategories: 'All categories',
            date: 'Date',
            close: 'Close'
        }
    }

    const t = translations[language] || translations.pt

    const handleSearch = () => {
        onSearch?.(searchTerm)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    const handleFilterChange = (filterType, value) => {
        updateFilters({ [filterType]: value })
    }

    const applyFilters = () => {
        setShowFilters(false)
        handleSearch()
    }

    return (
        <div className="search-with-filters">
            {/* Barra de Pesquisa */}
            <div className="search-bar">
                <div className="search-input-container">
                    <input
                        type="text"
                        placeholder={t.searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="search-input"
                    />
                    <button onClick={handleSearch} className="search-btn">
                        🔍
                    </button>
                </div>

                <button
                    onClick={() => setShowFilters(true)}
                    className="filters-btn"
                >
                    ⚙️
                </button>
            </div>

            {/* Popup de Filtros */}
            {showFilters && (
                <>
                    <div className="filters-overlay" onClick={() => setShowFilters(false)} />
                    <div className="filters-popup">
                        <div className="filters-header">
                            <h3>⚙️ {t.filters}</h3>
                            <button
                                onClick={() => setShowFilters(false)}
                                className="close-btn"
                            >
                                ×
                            </button>
                        </div>

                        <div className="filters-content">
                            <div className="filter-group">
                                <label>{t.province}</label>
                                <select
                                    value={filters.province}
                                    onChange={(e) => handleFilterChange('province', e.target.value)}
                                >
                                    <option value="">{t.allProvinces}</option>
                                    {provinces.map(province => (
                                        <option key={province.value} value={province.value}>
                                            {province.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="filter-group">
                                <label>{t.category}</label>
                                <select
                                    value={filters.category}
                                    onChange={(e) => handleFilterChange('category', e.target.value)}
                                >
                                    <option value="">{t.allCategories}</option>
                                    {categories.map(category => (
                                        <option key={category.value} value={category.value}>
                                            {category.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="filter-group">
                                <label>{t.date}</label>
                                <input
                                    type="date"
                                    value={filters.date}
                                    onChange={(e) => handleFilterChange('date', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="filters-actions">
                            <button onClick={clearFilters} className="btn btn-outline">
                                {t.clearFilters}
                            </button>
                            <button onClick={applyFilters} className="btn btn-primary">
                                {t.applyFilters}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default SearchWithFilters