import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../pages/context/ThemeContext'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation()
    const { theme, toggleTheme, isDark } = useTheme()

    const navigation = [
        { path: '/', label: 'Início' },
        { path: '/eventos', label: 'Eventos' },
        { path: '/galeria', label: 'Galeria' },
        { path: '/contactos', label: 'Contactos' }
    ]

    const isActive = (path) => location.pathname === path

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    {/* Logo */}
                    <Link to="/" className="logo">
                        <span className="logo-text">TickIt</span>
                    </Link>

                    {/* Navegação Desktop */}
                    <nav className="nav-desktop">
                        {navigation.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Controlos Desktop */}
                    <div className="header-controls">
                        {/* Theme Toggle - Desktop */}
                        <button
                            onClick={toggleTheme}
                            className="theme-toggle-btn"
                            aria-label={`Mudar para tema ${isDark ? 'claro' : 'escuro'}`}
                            title={`Tema ${isDark ? 'escuro' : 'claro'} - Clique para mudar`}
                        >
                            <div className={`theme-toggle-track ${isDark ? 'dark' : ''}`}>
                                <div className="theme-toggle-knob">
                                    {isDark ? (
                                        <svg className="theme-icon" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                        </svg>
                                    ) : (
                                        <svg className="theme-icon" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        </button>

                        {/* Menu Mobile */}
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Menu"
                        >
                            ☰
                        </button>
                    </div>
                </div>

                {/* Menu Mobile */}
                <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                    <nav className="nav-mobile">
                        {/* Theme Toggle no Mobile */}
                        <div className="mobile-theme-section">
                            <div className="theme-toggle-mobile">
                                <span className="theme-label">Tema:</span>
                                <button
                                    onClick={toggleTheme}
                                    className="theme-toggle-btn"
                                    aria-label={`Mudar para tema ${isDark ? 'claro' : 'escuro'}`}
                                >
                                    <div className={`theme-toggle-track ${isDark ? 'dark' : ''}`}>
                                        <div className="theme-toggle-knob">
                                            {isDark ? (
                                                <svg className="theme-icon" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                                </svg>
                                            ) : (
                                                <svg className="theme-icon" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Links de Navegação */}
                        {navigation.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header