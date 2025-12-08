import jsPDF from 'jspdf'
import QRCode from 'qrcode'

// Gerar código único para bilhete
const generateTicketCode = (eventId, ticketType, index) => {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 8).toUpperCase()
    return `${eventId}-${ticketType.substring(0, 3).toUpperCase()}-${timestamp}-${random}-${index}`
}

// Gerar QR Code como imagem
const generateQRCode = async (data) => {
    try {
        return await QRCode.toDataURL(data, {
            width: 200,
            margin: 1,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        })
    } catch (err) {
        console.error('Erro ao gerar QR Code:', err)
        return null
    }
}

// Gerar PDF com bilhetes
export const generateTicketPDF = async (purchaseData) => {
    const { customerInfo, cart, total, paymentMethod } = purchaseData

    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    })

    // Cores
    const primaryColor = [59, 130, 246]
    const darkColor = [17, 24, 39]
    const grayColor = [107, 114, 128]

    let ticketIndex = 0

    for (const cartItem of cart) {
        const { eventName, eventDate, eventLocation, eventTime, type, phase, price, quantity } = cartItem

        // Gerar múltiplos bilhetes baseado na quantidade
        for (let i = 0; i < quantity; i++) {
            if (ticketIndex > 0) {
                pdf.addPage()
            }

            // Gerar código único e QR code
            const ticketCode = generateTicketCode(cartItem.eventId, type, ticketIndex + 1)
            const qrCodeData = await generateQRCode(ticketCode)

            // Cabeçalho com cor primária
            pdf.setFillColor(...primaryColor)
            pdf.rect(0, 0, 210, 40, 'F')

            // Título
            pdf.setTextColor(255, 255, 255)
            pdf.setFontSize(24)
            pdf.setFont('helvetica', 'bold')
            pdf.text('BILHETE DE EVENTO', 105, 20, { align: 'center' })

            pdf.setFontSize(10)
            pdf.setFont('helvetica', 'normal')
            pdf.text(`Código: ${ticketCode.substring(0, 25)}...`, 105, 28, { align: 'center' })

            // Informações do Cliente
            let yPos = 50

            pdf.setTextColor(...darkColor)
            pdf.setFontSize(14)
            pdf.setFont('helvetica', 'bold')
            pdf.text('CLIENTE', 20, yPos)

            pdf.setFontSize(10)
            pdf.setFont('helvetica', 'normal')
            pdf.setTextColor(...grayColor)

            yPos += 8
            pdf.text(`${customerInfo.fullName}`, 20, yPos)
            yPos += 6
            pdf.text(`Email: ${customerInfo.email}`, 20, yPos)
            yPos += 6
            pdf.text(`Telefone: ${customerInfo.phone}`, 20, yPos)

            // Linha divisória
            yPos += 10
            pdf.setDrawColor(...grayColor)
            pdf.setLineWidth(0.5)
            pdf.line(20, yPos, 190, yPos)

            // Informações do Evento
            yPos += 10
            pdf.setTextColor(...darkColor)
            pdf.setFontSize(14)
            pdf.setFont('helvetica', 'bold')
            pdf.text('INFORMAÇÕES DO EVENTO', 20, yPos)

            yPos += 10
            pdf.setFontSize(11)
            pdf.setFont('helvetica', 'bold')
            pdf.text(eventName, 20, yPos)

            yPos += 8
            pdf.setFontSize(10)
            pdf.setFont('helvetica', 'normal')
            pdf.setTextColor(...grayColor)
            pdf.text(`Data: ${new Date(eventDate).toLocaleDateString('pt-MZ')} às ${eventTime}`, 20, yPos)

            yPos += 6
            pdf.text(`Local: ${eventLocation}`, 20, yPos)

            yPos += 6
            pdf.setTextColor(...primaryColor)
            pdf.setFont('helvetica', 'bold')
            pdf.text(`Tipo: ${type.toUpperCase()} - ${phase}`, 20, yPos)

            yPos += 6
            pdf.text(`Preço: ${price} MT`, 20, yPos)

            // QR Code
            if (qrCodeData) {
                const qrSize = 60
                const qrX = 140
                const qrY = yPos - 35

                // Fundo branco para QR code
                pdf.setFillColor(255, 255, 255)
                pdf.rect(qrX - 5, qrY - 5, qrSize + 10, qrSize + 10, 'F')

                // Borda
                pdf.setDrawColor(...primaryColor)
                pdf.setLineWidth(1)
                pdf.rect(qrX - 5, qrY - 5, qrSize + 10, qrSize + 10, 'S')

                pdf.addImage(qrCodeData, 'PNG', qrX, qrY, qrSize, qrSize)

                // Label do QR Code
                pdf.setFontSize(8)
                pdf.setTextColor(...grayColor)
                pdf.setFont('helvetica', 'normal')
                pdf.text('Escanear na Entrada', qrX + qrSize / 2, qrY + qrSize + 8, { align: 'center' })
            }

            // Código do Bilhete
            yPos += 20
            pdf.setFillColor(249, 250, 251)
            pdf.rect(20, yPos, 110, 25, 'F')

            pdf.setDrawColor(...grayColor)
            pdf.setLineWidth(0.5)
            pdf.rect(20, yPos, 110, 25, 'S')

            pdf.setTextColor(...darkColor)
            pdf.setFontSize(9)
            pdf.setFont('helvetica', 'bold')
            pdf.text('CÓDIGO DO BILHETE', 25, yPos + 6)

            pdf.setFontSize(7)
            pdf.setFont('helvetica', 'normal')
            pdf.setTextColor(...primaryColor)
            pdf.text(ticketCode, 25, yPos + 13)
            pdf.text('(Use este código se não conseguir escanear o QR)', 25, yPos + 19)

            // Instruções
            yPos += 35
            pdf.setTextColor(...darkColor)
            pdf.setFontSize(12)
            pdf.setFont('helvetica', 'bold')
            pdf.text('INSTRUÇÕES', 20, yPos)

            yPos += 8
            pdf.setFontSize(9)
            pdf.setFont('helvetica', 'normal')
            pdf.setTextColor(...grayColor)

            pdf.text('• Apresente este bilhete (digital ou impresso) na entrada do evento', 20, yPos)
            yPos += 6
            pdf.text('• Cada código QR é único e válido para uma única entrada', 20, yPos)
            yPos += 6
            pdf.text('• Guarde este documento até ao fim do evento', 20, yPos)
            yPos += 6
            pdf.text('• Em caso de dúvidas, contacte o organizador', 20, yPos)

            // Linha decorativa inferior
            yPos += 15
            pdf.setDrawColor(...primaryColor)
            pdf.setLineWidth(2)
            pdf.line(20, yPos, 190, yPos)

            // Rodapé
            pdf.setFontSize(8)
            pdf.setTextColor(...grayColor)
            pdf.setFont('helvetica', 'italic')
            pdf.text('Bilhete gerado automaticamente - Verifique o código QR na entrada', 105, 285, { align: 'center' })

            // Info de compra
            pdf.setFont('helvetica', 'normal')
            pdf.text(`Data de Compra: ${new Date().toLocaleString('pt-MZ')}`, 20, 290)
            pdf.text(`Método de Pagamento: ${paymentMethod} | Total: ${total} MT`, 20, 295)

            ticketIndex++
        }
    }

    // Salvar PDF
    const fileName = `bilhetes_${Date.now()}.pdf`
    pdf.save(fileName)
}