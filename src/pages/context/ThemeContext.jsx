import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider')
    }
    return context
}

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light')

    // Carregar tema do localStorage ou preferência do sistema
    useEffect(() => {
        const savedTheme = localStorage.getItem('tabater-theme')
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

        if (savedTheme) {
            setTheme(savedTheme)
        } else if (systemPrefersDark) {
            setTheme('dark')
        }
    }, [])

    // Aplicar tema ao documento
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('tabater-theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light')
    }

    const setLightTheme = () => {
        setTheme('light')
    }

    const setDarkTheme = () => {
        setTheme('dark')
    }

    const value = {
        theme,
        toggleTheme,
        setLightTheme,
        setDarkTheme,
        isDark: theme === 'dark',
        isLight: theme === 'light'
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}
export default ThemeContext