import React from 'react'
import { useEvents } from '../../pages/context/EventsContext'
import { provinces, categories } from '../../pages/data/provincesData'

const EventFilters = ({ language = 'pt' }) => {
    const { filters, updateFilters, clearFilters } = useEvents()

    const translations = {
        pt: {
            filterEvents: 'Filtrar Eventos',
            clearFilters: 'Limpar Filtros',
            search: 'Pesquisar',
            searchPlaceholder: 'Evento, artista, local...',
            province: 'Província',
            allProvinces: 'Todas as províncias',
            category: 'Categoria',
            allCategories: 'Todas as categorias',
            date: 'Data',
            activeFilters: 'Filtros ativos:',
            searchFor: 'Busca:',
            provinceLabel: 'Província:',
            categoryLabel: 'Categoria:',
            dateLabel: 'Data:'
        },
        en: {
            filterEvents: 'Filter Events',
            clearFilters: 'Clear Filters',
            search: 'Search',
            searchPlaceholder: 'Event, artist, location...',
            province: 'Province',
            allProvinces: 'All provinces',
            category: 'Category',
            allCategories: 'All categories',
            date: 'Date',
            activeFilters: 'Active filters:',
            searchFor: 'Search:',
            provinceLabel: 'Province:',
            categoryLabel: 'Category:',
            dateLabel: 'Date:'
        }
    }

    const t = translations[language] || translations.pt

    const handleFilterChange = (filterType, value) => {
        updateFilters({ [filterType]: value })
    }

    return (
        <div className="event-filters">
            <div className="filters-header">
                <h3>
                    <i className="fas fa-filter"></i>
                    {t.filterEvents}
                </h3>
                <button
                    onClick={clearFilters}
                    className="btn btn-outline btn-sm"
                >
                    <i className="fas fa-times"></i>
                    {t.clearFilters}
                </button>
            </div>

            <div className="filters-grid">
                {/* Busca */}
                <div className="filter-group">
                    <label htmlFor="search">
                        <i className="fas fa-search"></i>
                        {t.search}
                    </label>
                    <input
                        id="search"
                        type="text"
                        placeholder={t.searchPlaceholder}
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                    />
                </div>

                {/* Província */}
                <div className="filter-group">
                    <label htmlFor="province">
                        <i className="fas fa-map-marker-alt"></i>
                        {t.province}
                    </label>
                    <select
                        id="province"
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

                {/* Categoria */}
                <div className="filter-group">
                    <label htmlFor="category">
                        <i className="fas fa-tag"></i>
                        {t.category}
                    </label>
                    <select
                        id="category"
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

                {/* Data */}
                <div className="filter-group">
                    <label htmlFor="date">
                        <i className="fas fa-calendar"></i>
                        {t.date}
                    </label>
                    <input
                        id="date"
                        type="date"
                        value={filters.date}
                        onChange={(e) => handleFilterChange('date', e.target.value)}
                    />
                </div>
            </div>

            {/* Filtros Ativos */}
            {(filters.search || filters.province || filters.category || filters.date) && (
                <div className="active-filters">
                    <span>
                        <i className="fas fa-sliders-h"></i>
                        {t.activeFilters}
                    </span>
                    {filters.search && (
                        <span className="filter-tag">
                            <i className="fas fa-search"></i>
                            {t.searchFor} "{filters.search}"
                            <button onClick={() => handleFilterChange('search', '')}>
                                <i className="fas fa-times"></i>
                            </button>
                        </span>
                    )}
                    {filters.province && (
                        <span className="filter-tag">
                            <i className="fas fa-map-marker-alt"></i>
                            {t.provinceLabel} {provinces.find(p => p.value === filters.province)?.label}
                            <button onClick={() => handleFilterChange('province', '')}>
                                <i className="fas fa-times"></i>
                            </button>
                        </span>
                    )}
                    {filters.category && (
                        <span className="filter-tag">
                            <i className="fas fa-tag"></i>
                            {t.categoryLabel} {categories.find(c => c.value === filters.category)?.label}
                            <button onClick={() => handleFilterChange('category', '')}>
                                <i className="fas fa-times"></i>
                            </button>
                        </span>
                    )}
                    {filters.date && (
                        <span className="filter-tag">
                            <i className="fas fa-calendar"></i>
                            {t.dateLabel} {new Date(filters.date).toLocaleDateString(language)}
                            <button onClick={() => handleFilterChange('date', '')}>
                                <i className="fas fa-times"></i>
                            </button>
                        </span>
                    )}
                </div>
            )}
        </div>
    )
}

export default EventFilters