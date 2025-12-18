import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme deve ser usado dentro de ThemeProvider')
    }
    return context
}

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light')
    const [isInitialized, setIsInitialized] = useState(false)

    // Carregar tema do localStorage ou preferência do sistema
    useEffect(() => {
        try {
            const savedTheme = localStorage.getItem('tickit-theme')
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

            console.log('🔍 Iniciando carregamento do tema...')
            console.log('📦 Tema salvo:', savedTheme)
            console.log('🌙 Sistema prefere escuro:', systemPrefersDark)

            if (savedTheme) {
                setTheme(savedTheme)
                console.log('✅ Tema carregado do localStorage:', savedTheme)
            } else if (systemPrefersDark) {
                setTheme('dark')
                console.log('✅ Tema definido pelo sistema: dark')
            } else {
                console.log('✅ Tema padrão: light')
            }
        } catch (error) {
            console.error('❌ Erro ao carregar tema:', error)
            setTheme('light')
        } finally {
            setIsInitialized(true)
        }
    }, [])

    // Aplicar tema ao documento
    useEffect(() => {
        if (!isInitialized) return

        console.log('🎨 Aplicando tema:', theme)

        // Aplicar ao documento HTML
        document.documentElement.setAttribute('data-theme', theme)
        document.documentElement.classList.remove('light', 'dark')
        document.documentElement.classList.add(theme)

        // Salvar no localStorage
        try {
            localStorage.setItem('tickit-theme', theme)
            console.log('💾 Tema salvo no localStorage:', theme)
        } catch (error) {
            console.error('❌ Erro ao salvar tema:', error)
        }
    }, [theme, isInitialized])

    const toggleTheme = () => {
        setTheme(prev => {
            const newTheme = prev === 'light' ? 'dark' : 'light'
            console.log('🔄 Alternando tema:', prev, '→', newTheme)
            return newTheme
        })
    }

    const setLightTheme = () => {
        console.log('☀️ Definindo tema claro')
        setTheme('light')
    }

    const setDarkTheme = () => {
        console.log('🌙 Definindo tema escuro')
        setTheme('dark')
    }

    const value = {
        theme,
        toggleTheme,
        setLightTheme,
        setDarkTheme,
        isDark: theme === 'dark',
        isLight: theme === 'light',
        isInitialized
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext