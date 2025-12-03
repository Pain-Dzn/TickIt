import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../../pages/context/CartContext'
import ThemeToggle from '../UI/ThemeToggle'

const Header = ({ language, setLanguage }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation()
    const { getCartCount } = useCart()

    const navigation = [
        { path: '/', label: { pt: 'Início', en: 'Home' } },
        { path: '/eventos', label: { pt: 'Eventos', en: 'Events' } },
        { path: '/galeria', label: { pt: 'Galeria', en: 'Gallery' } },
        { path: '/contactos', label: { pt: 'Contactos', en: 'Contact' } }
    ]

    const isActive = (path) => location.pathname === path

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    {/* Logo */}
                    <Link to="/" className="logo">
                        <span className="logo-text">TABATER</span>
                    </Link>

                    {/* Navegação Desktop */}
                    <nav className="nav-desktop">
                        {navigation.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                            >
                                {item.label[language]}
                            </Link>
                        ))}
                    </nav>

                    {/* Controlos Desktop */}
                    <div className="header-controls">
                        {/* Theme Toggle - Apenas no desktop */}
                        <div className="desktop-theme">
                            <ThemeToggle size="medium" showLabel={false} />
                        </div>

                        {/* Seletor de Idioma - Apenas no desktop */}
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="language-selector desktop-only"
                        >
                            <option value="pt">PT 🇲🇿</option>
                            <option value="en">EN</option>
                        </select>

                        {/* Carrinho */}
                        <Link to="/checkout" className="cart-icon">
                            <span className="cart-icon-symbol">🛒</span>
                            {getCartCount() > 0 && (
                                <span className="cart-badge">{getCartCount()}</span>
                            )}
                        </Link>

                        {/* Menu Mobile */}
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            ☰
                        </button>
                    </div>
                </div>

                {/* Menu Mobile */}
                <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                    <nav className="nav-mobile">
                        {/* Theme Toggle no Mobile - Única instância */}
                        <div className="mobile-theme-section">
                            <div className="theme-toggle-mobile">
                                <span className="theme-label">
                                    {language === 'pt' ? 'Tema:' : 'Theme:'}
                                </span>
                                <ThemeToggle size="medium" showLabel={false} />
                            </div>

                            {/* Seletor de Idioma no Mobile */}
                            <div className="language-selector-mobile">
                                <span className="language-label">
                                    {language === 'pt' ? 'Idioma:' : 'Language:'}
                                </span>
                                <select
                                    value={language}
                                    onChange={(e) => {
                                        setLanguage(e.target.value)
                                        setIsMenuOpen(false)
                                    }}
                                    className="mobile-language-selector"
                                >
                                    <option value="pt">Português 🇲🇿</option>
                                    <option value="en">English</option>
                                </select>
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
                                {item.label[language]}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header