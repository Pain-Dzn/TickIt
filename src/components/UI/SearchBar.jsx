import React, { useState } from 'react'

const SearchBar = ({
    placeholder = "Pesquisar...",
    onSearch,
    className = ''
}) => {
    const [query, setQuery] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onSearch?.(query)
    }

    const handleChange = (e) => {
        setQuery(e.target.value)
        // Poderia adicionar debounce aqui para search em tempo real
    }

    return (
        <form onSubmit={handleSubmit} className={`search-bar ${className}`}>
            <div className="search-input-wrapper">
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="search-input"
                />
                <button type="submit" className="search-button">
                    🔍
                </button>
            </div>
        </form>
    )
}

export default SearchBar