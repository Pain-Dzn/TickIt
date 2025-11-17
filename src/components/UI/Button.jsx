import React from 'react'

const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    onClick,
    type = 'button',
    className = '',
    ...props
}) => {
    const baseClasses = 'btn'
    const variantClasses = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        outline: 'btn-outline',
        ghost: 'btn-ghost',
        danger: 'btn-danger'
    }
    const sizeClasses = {
        small: 'btn-sm',
        medium: '',
        large: 'btn-lg',
        xlarge: 'btn-xl'
    }

    const classes = [
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        loading ? 'btn-loading' : '',
        className
    ].filter(Boolean).join(' ')

    return (
        <button
            type={type}
            className={classes}
            disabled={disabled || loading}
            onClick={onClick}
            {...props}
        >
            {loading ? 'A processar...' : children}
        </button>
    )
}

export default Button