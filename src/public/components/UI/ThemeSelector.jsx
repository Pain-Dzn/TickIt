import React, { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'

const ThemeSelector = () => {
    const { theme, setLightTheme, setDarkTheme, isDark } = useTheme()
    const [isOpen, setIsOpen] = useState(false)

    const themes = [
        {
            id: 'light',
            name: 'Tema Claro',
            icon: '',
            description: 'Modo claro padrão',
            action: setLightTheme
        },
        {
            id: 'dark',
            name: 'Tema Escuro',
            icon: '',
            description: 'Modo escuro suave',
            action: setDarkTheme
        },
        {
            id: 'auto',
            name: 'Automático',
            icon: '',
            description: 'Segue o sistema',
            action: () => {
                const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
                systemPrefersDark ? setDarkTheme() : setLightTheme()
            }
        }
    ]

    const currentTheme = themes.find(t => t.id === theme) || themes[0]

    return (
        <div className="theme-selector relative">
            {/* Botão Principal */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 shadow-sm hover:shadow-md"
            >
                <span className="text-lg">{currentTheme.icon}</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {currentTheme.name}
                </span>
                <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                    }`}>
                    ▼
                </span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Menu */}
                    <div className="absolute top-full right-0 mt-2 w-48 z-50 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-scaleIn">
                        <div className="p-2">
                            {themes.map((themeOption) => (
                                <button
                                    key={themeOption.id}
                                    onClick={() => {
                                        themeOption.action()
                                        setIsOpen(false)
                                    }}
                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${theme === themeOption.id
                                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300'
                                        }`}
                                >
                                    <span className="text-lg">{themeOption.icon}</span>
                                    <div className="flex-1 text-left">
                                        <div className="text-sm font-medium">{themeOption.name}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            {themeOption.description}
                                        </div>
                                    </div>
                                    {theme === themeOption.id && (
                                        <span className="text-primary-500">✓</span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Footer com informações */}
                        <div className="border-t border-gray-200 dark:border-gray-700 px-3 py-2">
                            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                Tema atual: {isDark ? 'Escuro' : 'Claro'}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default ThemeSelector