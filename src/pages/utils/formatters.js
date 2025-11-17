export const formatCurrency = (amount, currency = 'MZN') => {
    return new Intl.NumberFormat('pt-MZ', {
        style: 'currency',
        currency: currency
    }).format(amount)
}

export const formatDate = (dateString, options = {}) => {
    const defaultOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    const date = new Date(dateString)
    return date.toLocaleDateString('pt-MZ', { ...defaultOptions, ...options })
}

export const formatTime = (timeString) => {
    return timeString
}

export const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
}