import React from 'react'

const LoadingSpinner = ({ size = 'medium', color = 'primary' }) => {
    const sizeClasses = {
        small: 'spinner-sm',
        medium: 'spinner-md',
        large: 'spinner-lg'
    }

    const colorClasses = {
        primary: 'spinner-primary',
        white: 'spinner-white',
        gray: 'spinner-gray'
    }

    return (
        <div className={`loading-spinner ${sizeClasses[size]} ${colorClasses[color]}`}>
            <div className="spinner"></div>
        </div>
    )
}

export default LoadingSpinner