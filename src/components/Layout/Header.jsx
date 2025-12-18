import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../pages/context/ThemeContext'
import { Menu, X, Moon, Sun } from 'lucide-react'
import logo from './Tickit.png';

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
                        <span className="logo-text"><img id='logo-image' src={logo} alt="" /></span>
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
                        {/* Theme Toggle - Apenas Desktop */}
                        <button
                            onClick={toggleTheme}
                            className="theme-toggle-btn desktop-only"
                            aria-label={`Mudar para tema ${isDark ? 'claro' : 'escuro'}`}
                            title={`Tema ${isDark ? 'escuro' : 'claro'} - Clique para mudar`}
                        >
                            <div className={`theme-toggle-track ${isDark ? 'dark' : ''}`}>
                                <div className="theme-toggle-knob">
                                    {isDark ? (
                                        <Moon size={16} className="theme-icon" />
                                    ) : (
                                        <Sun size={16} className="theme-icon" />
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
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Menu Mobile */}
                <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                    <nav className="nav-mobile">
                        {/* Links de Navegação - O toggle do tema NÃO está aqui */}
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

                        {/* Separador */}
                        <div className="mobile-divider"></div>

                        {/* Toggle do tema no mobile - Apenas texto simples */}
                        <button
                            onClick={() => {
                                toggleTheme()
                                setIsMenuOpen(false)
                            }}
                            className="theme-toggle-mobile-text"
                        >
                            <span className="theme-toggle-label">
                                {isDark ? (
                                    <>
                                        <Sun size={16} />
                                        <span>Tema Claro</span>
                                    </>
                                ) : (
                                    <>
                                        <Moon size={16} />
                                        <span>Tema Escuro</span>
                                    </>
                                )}
                            </span>
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header