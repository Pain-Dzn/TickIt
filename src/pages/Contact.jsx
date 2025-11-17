import React, { useState } from 'react'
import {
    Phone,
    Mail,
    MapPin,
    MessageCircle,
    Send,
    CheckCircle2,
    HelpCircle,
    Building
} from 'lucide-react'

const Contact = ({ language = 'pt' }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simular envio
        setTimeout(() => {
            setIsSubmitting(false)
            setSubmitted(true)
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            })
        }, 2000)
    }

    const translations = {
        pt: {
            title: 'Contacte-nos',
            subtitle: 'Estamos aqui para ajudar. Entre em contacto connosco.',
            contacts: 'Nossos Contactos',
            location: 'Nossa Localização',
            openMaps: 'Abrir no Google Maps',
            sendMessage: 'Envie-nos uma Mensagem',
            name: 'Nome Completo ',
            email: 'Email ',
            phone: 'Telefone',
            subject: 'Assunto',
            message: 'Mensagem',
            send: 'Enviar Mensagem',
            sending: 'Enviando...',
            successTitle: 'Mensagem Enviada com Sucesso!',
            successMessage: 'Obrigado pelo seu contacto. Responderemos em breve.',
            newMessage: 'Enviar Nova Mensagem',
            faq: 'Perguntas Frequentes',
            selectSubject: 'Selecione um assunto',
            support: 'Suporte Técnico',
            sales: 'Informações de Vendas',
            partnership: 'Parcerias',
            other: 'Outro',
            placeholderName: 'Seu nome completo',
            placeholderEmail: 'seu@email.com',
            placeholderPhone: '+258 85 635 0220',
            placeholderMessage: 'Descreva a sua questão ou solicitação...',
            available247: 'Disponível 24/7 para emergências',
            responseTime: 'Respondemos em até 2 horas',
            officeHours: 'Segunda a Sexta, 8h-18h',
            quickSupport: 'Suporte rápido via mensagem'
        },
        en: {
            title: 'Contact Us',
            subtitle: 'We are here to help. Get in touch with us.',
            contacts: 'Our Contacts',
            location: 'Our Location',
            openMaps: 'Open in Google Maps',
            sendMessage: 'Send Us a Message',
            name: 'Full Name *',
            email: 'Email *',
            phone: 'Phone',
            subject: 'Subject *',
            message: 'Message *',
            send: 'Send Message',
            sending: 'Sending...',
            successTitle: 'Message Sent Successfully!',
            successMessage: 'Thank you for your contact. We will respond soon.',
            newMessage: 'Send New Message',
            faq: 'Frequently Asked Questions',
            selectSubject: 'Select a subject',
            support: 'Technical Support',
            sales: 'Sales Information',
            partnership: 'Partnerships',
            other: 'Other',
            placeholderName: 'Your full name',
            placeholderEmail: 'your@email.com',
            placeholderPhone: '+258 84 123 4567',
            placeholderMessage: 'Describe your question or request...',
            available247: 'Available 24/7 for emergencies',
            responseTime: 'We respond within 2 hours',
            officeHours: 'Monday to Friday, 8AM-6PM',
            quickSupport: 'Quick support via message'
        }
    }

    const t = translations[language] || translations.pt

    const contactMethods = [
        {
            icon: Phone,
            title: 'Telefone',
            details: '+258 85 635 0220',
            description: t.available247
        },
        {
            icon: Mail,
            title: 'Email',
            details: 'info@tabater.co.mz',
            description: t.responseTime
        },
        {
            icon: MapPin,
            title: language === 'pt' ? 'Escritório' : 'Office',
            details: 'Av. 25 de Setembro, Maputo',
            description: t.officeHours
        },
        {
            icon: MessageCircle,
            title: 'WhatsApp',
            details: '+258 85 635 0220',
            description: t.quickSupport
        }
    ]

    const faqs = [
        {
            question: language === 'pt' ? 'Como comprar bilhetes?' : 'How to buy tickets?',
            answer: language === 'pt'
                ? 'Basta selecionar o evento, escolher os bilhetes e finalizar o pagamento.'
                : 'Just select the event, choose tickets and complete the payment.'
        },
        {
            question: language === 'pt' ? 'Quais métodos de pagamento aceitam?' : 'What payment methods do you accept?',
            answer: language === 'pt'
                ? 'Aceitamos M-Pesa, cartão de crédito e transferência bancária.'
                : 'We accept M-Pesa, credit card and bank transfer.'
        },
        {
            question: language === 'pt' ? 'Posso cancelar ou transferir meu bilhete?' : 'Can I cancel or transfer my ticket?',
            answer: language === 'pt'
                ? 'O cancelamento depende da política do promotor. Contacte-nos para mais informações.'
                : 'Cancellation depends on the promoter\'s policy. Contact us for more information.'
        }
    ]

    if (submitted) {
        return (
            <div className="contact-page">
                <div className="container">
                    <div className="success-message">
                        <div className="success-icon">
                            <CheckCircle2 size={48} />
                        </div>
                        <h2>{t.successTitle}</h2>
                        <p>{t.successMessage}</p>
                        <button
                            onClick={() => setSubmitted(false)}
                            className="btn btn-primary"
                        >
                            {t.newMessage}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="contact-page">
            <div className="container">
                <div className="page-header">
                    <h1>{t.title}</h1>
                    <p>{t.subtitle}</p>
                </div>

                <div className="contact-layout">
                    {/* Informações de Contacto */}
                    <div className="contact-info">
                        <h2 className="contact-info-title">
                            <Phone size={24} />
                            {t.contacts}
                        </h2>

                        <div className="contact-methods">
                            {contactMethods.map((method, index) => {
                                const IconComponent = method.icon
                                return (
                                    <div key={index} className="contact-method">
                                        <div className="method-icon">
                                            <IconComponent size={24} />
                                        </div>
                                        <div className="method-details">
                                            <h3>{method.title}</h3>
                                            <p className="method-main">{method.details}</p>
                                            <p className="method-desc">{method.description}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Mapa */}
                        <div className="map-section">
                            <h3 className="map-title">
                                <MapPin size={20} />
                                {t.location}
                            </h3>
                            <div className="map-container">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3587.95426425591!2d32.57185921502905!3d-25.968983483548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ee69a7d346d8b13%3A0x2d5a5e5a5e5a5e5!2sAvenida%2025%20de%20Setembro%2C%20Maputo%2C%20Mozambique!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
                                    width="100%"
                                    height="300"
                                    style={{ border: 0, borderRadius: '12px' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Tabater Office Location"
                                ></iframe>
                                <div className="map-info">
                                    <h4 className="map-office">
                                        <Building size={20} />
                                        Tabater Headquarters
                                    </h4>
                                    <p>Av. 25 de Setembro, Maputo</p>
                                    <p>Edifício Jat, 3º Andar</p>
                                    <a
                                        href="https://maps.google.com/?q=-25.968983,32.573048"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-outline btn-sm"
                                    >
                                        {t.openMaps}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Rápido */}
                        <div className="quick-faq">
                            <h3 className="faq-title">
                                <HelpCircle size={20} />
                                {t.faq}
                            </h3>
                            {faqs.map((faq, index) => (
                                <div key={index} className="faq-item">
                                    <h4>{faq.question}</h4>
                                    <p>{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Formulário de Contacto */}
                    <div className="contact-form-section">
                        <form onSubmit={handleSubmit} className="contact-form">
                            <h2 className="form-title">
                                <Send size={20} />
                                {t.sendMessage}
                            </h2>

                            <div className="form-grid">
                                <div className="form-group">
                                    <label htmlFor="name">{t.name}</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder={t.placeholderName}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">{t.email}</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder={t.placeholderEmail}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">{t.phone}</label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder={t.placeholderPhone}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject">{t.subject}</label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">{t.selectSubject}</option>
                                        <option value="suporte">{t.support}</option>
                                        <option value="vendas">{t.sales}</option>
                                        <option value="parceria">{t.partnership}</option>
                                        <option value="outro">{t.other}</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">{t.message}</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="6"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder={t.placeholderMessage}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-lg"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="loading-spinner"></span>
                                        {t.sending}
                                    </>
                                ) : (
                                    <>
                                        <Send size={16} />
                                        {t.send}
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact  