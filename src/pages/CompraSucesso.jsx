import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from './context/CartContext'
import {
    CheckCircle, FileText, Calendar, User, Mail,
    Phone, CreditCard, Printer, Ticket, Download,
    Shield, Zap, Home
} from 'lucide-react'
import './CompraSucesso.css'

const CompraSucesso = () => {
    const { id } = useParams()
    const { getCompraPorId } = useCart()
    const [compra, setCompra] = useState(null)

    useEffect(() => {
        const compraEncontrada = getCompraPorId(id)
        if (compraEncontrada) {
            setCompra(compraEncontrada)
        } else {
            // Tentar buscar do sessionStorage como fallback
            const savedCompra = sessionStorage.getItem(`compra_${id}`)
            if (savedCompra) {
                setCompra(JSON.parse(savedCompra))
            }
        }
    }, [id, getCompraPorId])

    const imprimirBilhetes = () => {
        window.print()
    }

    const reenviarEmail = () => {
        alert(`📧 Email com os bilhetes reenviado para ${compra?.cliente.email}`)
    }

    if (!compra) {
        return (
            <div className="compra-sucesso">
                <div className="container">
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Carregando detalhes da compra...</p>
                    </div>
                </div>
            </div>
        )
    }

    const totalBilhetes = compra.items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPago = compra.total

    return (
        <div className="compra-sucesso">
            <div className="container">
                <div className="success-header">
                    <div className="success-icon">
                        <CheckCircle size={64} />
                    </div>
                    <h1>Compra Realizada com Sucesso!</h1>
                    <p className="success-subtitle">
                        Seus bilhetes já foram enviados para seu email e baixados automaticamente.
                    </p>
                </div>

                <div className="success-content">
                    <div className="order-details">
                        <div className="detail-card">
                            <h3>
                                <FileText size={20} />
                                Detalhes da Compra
                            </h3>
                            <div className="detail-grid">
                                <div className="detail-item">
                                    <span className="detail-label">Número da Compra:</span>
                                    <span className="detail-value">{compra.id}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">
                                        <Calendar size={16} />
                                        Data:
                                    </span>
                                    <span className="detail-value">
                                        {new Date(compra.data).toLocaleDateString('pt-MZ', {
                                            day: '2-digit',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">
                                        <User size={16} />
                                        Cliente:
                                    </span>
                                    <span className="detail-value">{compra.cliente.fullName}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">
                                        <Mail size={16} />
                                        Email:
                                    </span>
                                    <span className="detail-value">{compra.cliente.email}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">
                                        <Phone size={16} />
                                        WhatsApp:
                                    </span>
                                    <span className="detail-value">{compra.cliente.phone}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">
                                        <CreditCard size={16} />
                                        Método:
                                    </span>
                                    <span className="detail-value">{compra.metodoPagamento}</span>
                                </div>
                                <div className="detail-item total-item">
                                    <span className="detail-label">Total Pago:</span>
                                    <span className="detail-value total-price">
                                        {totalPago.toLocaleString('pt-MZ')} MT
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bilhetes-summary">
                            <h3>
                                <Ticket size={20} />
                                Seus Bilhetes
                            </h3>
                            <div className="bilhetes-count">
                                <span className="count-number">{totalBilhetes}</span>
                                <span className="count-label">bilhetes adquiridos</span>
                            </div>

                            <div className="bilhetes-list">
                                {compra.items.map((item, index) => (
                                    <div key={index} className="bilhete-item">
                                        <div className="bilhete-header">
                                            <span className="bilhete-type">{item.type.toUpperCase()}</span>
                                            <span className="bilhete-quantity">{item.quantity}x</span>
                                        </div>
                                        <div className="bilhete-info">
                                            <strong>{item.eventName}</strong>
                                            <small>{item.phase} • {item.price.toLocaleString('pt-MZ')} MT cada</small>
                                            <small>Subtotal: {(item.price * item.quantity).toLocaleString('pt-MZ')} MT</small>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="next-steps">
                        <h3>Próximos Passos</h3>
                        <div className="steps-grid">
                            <div className="step">
                                <div className="step-icon">
                                    <Mail size={24} />
                                </div>
                                <h4>Verifique seu Email</h4>
                                <p>Os bilhetes em PDF foram enviados para {compra.cliente.email}</p>
                            </div>
                            <div className="step">
                                <div className="step-icon">
                                    <Download size={24} />
                                </div>
                                <h4>Salve os Bilhetes</h4>
                                <p>Guarde o PDF no seu telemóvel ou imprima</p>
                            </div>
                            <div className="step">
                                <div className="step-icon">
                                    <Ticket size={24} />
                                </div>
                                <h4>Apresente na Entrada</h4>
                                <p>Mostre o QR Code no dia do evento</p>
                            </div>
                            <div className="step">
                                <div className="step-icon">
                                    <Shield size={24} />
                                </div>
                                <h4>Segurança</h4>
                                <p>Cada QR Code é único e pessoal</p>
                            </div>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button
                            onClick={reenviarEmail}
                            className="btn btn-secondary"
                        >
                            <Mail size={16} /> Reenviar Email
                        </button>
                        <button
                            onClick={imprimirBilhetes}
                            className="btn btn-primary"
                        >
                            <Printer size={16} /> Imprimir Bilhetes
                        </button>
                        <Link to="/eventos" className="btn btn-outline">
                            <Home size={16} /> Ver Mais Eventos
                        </Link>
                    </div>

                    <div className="security-note">
                        <Shield size={20} />
                        <p>
                            <strong>Importante:</strong> Cada QR Code gerado é único e corresponde a um bilhete específico.
                            Na entrada do evento, apresente o QR Code para ser escaneado. Não compartilhe os códigos.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompraSucesso