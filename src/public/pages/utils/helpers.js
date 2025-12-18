export const generateId = () => {
    return Math.random().toString(36).substr(2, 9)
}

export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
}

export const validatePhone = (phone) => {
    const re = /^\+258\s?[84|85|86|87]\s?\d{3}\s?\d{3}$/
    return re.test(phone.replace(/\s/g, ''))
}

export const debounce = (func, wait) => {
    let timeout
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}