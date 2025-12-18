// src/hooks/useTheme.js
import { useTheme } from '../context/ThemeContext'

export const useAppTheme = () => {
    const theme = useTheme()

    const themeClasses = {
        light: 'bg-white text-gray-900',
        dark: 'bg-gray-900 text-white',
        card: {
            light: 'bg-white border-gray-200',
            dark: 'bg-gray-800 border-gray-700'
        },
        button: {
            light: 'bg-blue-500 text-white',
            dark: 'bg-blue-600 text-white'
        }
    }

    return {
        ...theme,
        themeClasses,
        currentThemeClass: themeClasses[theme.theme] || themeClasses.light
    }
}

export default useAppTheme