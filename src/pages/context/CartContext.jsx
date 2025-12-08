import React, { createContext, useContext, useState, useEffect } from 'react'
import jsPDF from 'jspdf'
import QRCode from 'qrcode'

const CartContext = createContext()

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart deve ser usado dentro de CartProvider')
    }
    return context
}

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [comprasRealizadas, setComprasRealizadas] = useState([])

    useEffect(() => {
        const savedCart = localStorage.getItem('cart')
        const savedCompras = localStorage.getItem('compras_realizadas')

        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart))
            } catch (error) {
                console.error('Erro ao carregar carrinho:', error)
                localStorage.removeItem('cart')
            }
        }

        if (savedCompras) {
            try {
                setComprasRealizadas(JSON.parse(savedCompras))
            } catch (error) {
                console.error('Erro ao carregar compras:', error)
                localStorage.removeItem('compras_realizadas')
            }
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    useEffect(() => {
        localStorage.setItem('compras_realizadas', JSON.stringify(comprasRealizadas))
    }, [comprasRealizadas])

    // Na função addToCart, substitua por:
    const addToCart = (item) => {
        console.log('Adicionando ao carrinho:', item)

        if (!item || !item.id || !item.price || !item.type) {
            console.error('Item inválido para adicionar ao carrinho:', item)
            return
        }

        setCart(prev => {
            // Verificar se já existe um item com o mesmo ID e tipo no mesmo evento
            const existingItemIndex = prev.findIndex(cartItem =>
                cartItem.id === item.id &&
                cartItem.eventId === item.eventId &&
                cartItem.type === item.type
            )

            if (existingItemIndex !== -1) {
                // Atualizar quantidade do item existente
                const newCart = [...prev]
                const existingItem = newCart[existingItemIndex]
                const newQuantity = existingItem.quantity + (item.quantity || 1)

                newCart[existingItemIndex] = {
                    ...existingItem,
                    quantity: newQuantity,
                    subtotal: (existingItem.price || 0) * newQuantity
                }

                console.log('Item atualizado no carrinho:', newCart[existingItemIndex])
                return newCart
            } else {
                // Adicionar novo item
                const newItem = {
                    ...item,
                    id: item.id,
                    type: item.type,
                    phase: item.phase || 'Geral',
                    price: Number(item.price) || 0,
                    quantity: item.quantity || 1,
                    subtotal: (Number(item.price) || 0) * (item.quantity || 1),
                    eventId: item.eventId,
                    eventName: item.eventName || 'Evento',
                    eventDate: item.eventDate,
                    eventTime: item.eventTime,
                    eventLocation: item.eventLocation,
                    eventImage: item.eventImage
                }

                console.log('Novo item adicionado ao carrinho:', newItem)
                return [...prev, newItem]
            }
        })
    }

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id))
    }

    const updateQuantity = (id, quantity) => {
        setCart(prev =>
            prev.map(item =>
                item.id === id
                    ? {
                        ...item,
                        quantity,
                        subtotal: (item.price || 0) * quantity
                    }
                    : item
            )
        )
    }

    const clearCart = () => {
        setCart([])
    }

    const getCartTotal = () => {
        return cart.reduce((total, item) => {
            const price = Number(item.price) || 0
            const quantity = Number(item.quantity) || 0
            return total + (price * quantity)
        }, 0)
    }

    const getCartCount = () => {
        return cart.reduce((total, item) => total + (item.quantity || 0), 0)
    }

    const getCartSummary = () => {
        const summary = {}

        cart.forEach(item => {
            const type = item.type || 'normal'
            if (!summary[type]) {
                summary[type] = {
                    quantity: 0,
                    total: 0
                }
            }
            summary[type].quantity += item.quantity || 0
            summary[type].total += (item.price || 0) * (item.quantity || 0)
        })

        return summary
    }

    const finalizarCompra = async (clienteInfo, metodoPagamento, bilhetesGerados, compraId) => {
        if (cart.length === 0) {
            throw new Error('Carrinho vazio')
        }

        const total = getCartTotal()

        const compra = {
            id: compraId,
            data: new Date().toISOString(),
            cliente: clienteInfo,
            metodoPagamento,
            items: cart.map(item => ({
                id: item.id,
                type: item.type || 'normal',
                phase: item.phase || 'Geral',
                price: Number(item.price) || 0,
                quantity: Number(item.quantity) || 0,
                subtotal: Number(item.price) * Number(item.quantity) || 0,
                eventId: item.eventId,
                eventName: item.eventName || 'Evento',
                eventDate: item.eventDate,
                eventTime: item.eventTime,
                eventLocation: item.eventLocation,
                eventImage: item.eventImage,
                codes: bilhetesGerados[item.id] || []
            })),
            total: total,
            status: 'concluido'
        }

        // Adicionar à lista de compras
        setComprasRealizadas(prev => [...prev, compra])

        // Gerar PDF
        await gerarPDFBilhetes(compra)

        // Limpar carrinho
        clearCart()

        return compra
    }

    const gerarPDFBilhetes = async (compra) => {
        const doc = new jsPDF()
        let yOffset = 20
        const pageHeight = doc.internal.pageSize.height

        // Título
        doc.setFontSize(20)
        doc.text('🎟️ SEUS BILHETES', 105, yOffset, { align: 'center' })
        yOffset += 15

        doc.setFontSize(12)
        doc.text(`Compra #${compra.id}`, 105, yOffset, { align: 'center' })
        doc.text(`Data: ${new Date(compra.data).toLocaleDateString('pt-MZ')}`, 105, yOffset + 7, { align: 'center' })
        yOffset += 20

        // Para cada item na compra
        for (const item of compra.items) {
            if (yOffset > pageHeight - 50) {
                doc.addPage()
                yOffset = 20
            }

            // Informações do tipo de bilhete
            doc.setFontSize(14)
            doc.text(`${item.type.toUpperCase()} - ${item.phase}`, 20, yOffset)
            doc.setFontSize(10)
            doc.text(`Evento: ${item.eventName}`, 20, yOffset + 8)
            doc.text(`${item.eventDate} • ${item.eventTime}`, 20, yOffset + 16)
            doc.text(item.eventLocation, 20, yOffset + 24)
            doc.text(`${item.quantity} bilhete(s) • ${item.price} MT cada`, 20, yOffset + 32)
            doc.text(`Subtotal: ${item.subtotal} MT`, 20, yOffset + 40)

            yOffset += 50

            // Gerar QR Code para cada bilhete
            for (const [index, code] of item.codes.entries()) {
                if (yOffset > pageHeight - 100) {
                    doc.addPage()
                    yOffset = 20
                }

                try {
                    const qrCodeDataUrl = await QRCode.toDataURL(code, {
                        width: 60,
                        margin: 1
                    })

                    doc.addImage(qrCodeDataUrl, 'PNG', 20, yOffset, 40, 40)
                } catch (err) {
                    console.error('Erro ao gerar QR Code:', err)
                }

                // Informações do bilhete individual
                doc.setFontSize(10)
                doc.text(`Bilhete ${item.type.toUpperCase()} #${index + 1}`, 70, yOffset + 5)
                doc.text(`Código: ${code}`, 70, yOffset + 15)
                doc.text(`Evento: ${item.eventName}`, 70, yOffset + 25)
                doc.text(`Data: ${item.eventDate} ${item.eventTime}`, 70, yOffset + 35)

                yOffset += 60

                // Linha separadora
                if (index < item.codes.length - 1) {
                    doc.setLineWidth(0.5)
                    doc.line(20, yOffset, 190, yOffset)
                    yOffset += 10
                }
            }

            yOffset += 10
        }

        // Resumo da compra
        doc.setFontSize(12)
        doc.text('📋 RESUMO DA COMPRA', 20, pageHeight - 80)
        doc.setFontSize(10)
        doc.text(`Cliente: ${compra.cliente.fullName}`, 20, pageHeight - 70)
        doc.text(`Email: ${compra.cliente.email}`, 20, pageHeight - 65)
        doc.text(`WhatsApp: ${compra.cliente.phone}`, 20, pageHeight - 60)
        doc.text(`Método: ${compra.metodoPagamento}`, 20, pageHeight - 55)
        doc.text(`Total: ${compra.total} MT`, 20, pageHeight - 50)

        // Rodapé
        doc.setFontSize(9)
        doc.text('⚠️ Este bilhete é pessoal e intransferível.', 105, pageHeight - 20, { align: 'center' })
        doc.text('Apresente este código QR na entrada do evento.', 105, pageHeight - 15, { align: 'center' })

        // Baixar PDF
        doc.save(`bilhetes-${compra.id}.pdf`)
    }

    const getCompraPorId = (id) => {
        return comprasRealizadas.find(compra => compra.id === id)
    }

    const valor = {
        cart,
        comprasRealizadas,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        getCartSummary,
        finalizarCompra,
        getCompraPorId
    }

    return (
        <CartContext.Provider value={valor}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext