import React from 'react'
import { useTheme } from '../../pages/context/ThemeContext'
import './ThemeToggle.css'

const ThemeToggle = ({ size = 'medium', showLabel = false }) => {
    const { theme, toggleTheme, isDark } = useTheme()

    const sizeClasses = {
        small: 'w-12 h-6',
        medium: 'w-14 h-7',
        large: 'w-16 h-8'
    }

    const knobSizes = {
        small: 'w-5 h-5',
        medium: 'w-6 h-6',
        large: 'w-7 h-7'
    }

    const iconSizes = {
        small: 'w-3 h-3',
        medium: 'w-4 h-4',
        large: 'w-4 h-4'
    }

    return (
        <button
            onClick={toggleTheme}
            className={`theme-toggle group relative inline-flex items-center ${sizeClasses[size]
                } rounded-full bg-gray-300 dark:bg-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 hover:scale-105`}
            aria-label={`Mudar para tema ${isDark ? 'claro' : 'escuro'}`}
            title={`Tema ${isDark ? 'escuro' : 'claro'} - Clique para mudar`}
        >
            {/* Track */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 transition-all duration-300" />

            {/* Knob com ícone dentro */}
            <div
                className={`${knobSizes[size]} relative z-10 transform transition-all duration-300 flex items-center justify-center ${isDark
                    ? 'translate-x-7 bg-gray-800'
                    : 'translate-x-0.5 bg-white'
                    } rounded-full shadow-lg border-2 border-white dark:border-gray-700`}
            >
                {isDark ? (
                    // Ícone da Lua
                    <svg
                        className={`${iconSizes[size]} text-yellow-300`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                ) : (
                    // Ícone do Sol
                    <svg
                        className={`${iconSizes[size]} text-yellow-500`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                            clipRule="evenodd"
                        />
                    </svg>
                )}
            </div>

            {/* Ripple Effect */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </div>

            {/* Label */}
            {showLabel && (
                <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[60px] text-left">
                    {isDark ? 'Escuro' : 'Claro'}
                </span>
            )}
        </button>
    )
}

export default ThemeToggle