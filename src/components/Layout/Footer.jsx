import React from 'react'
import { Link } from 'react-router-dom'
import {
    Tent,
    Facebook,
    Instagram,
    Twitter,
    MessageCircle,
    Phone,
    Mail,
    MapPin,
    Heart
} from 'lucide-react'
import './Footer.css'
const Footer = ({ language = 'pt' }) => {
    const currentYear = new Date().getFullYear()

    const translations = {
        pt: {
            description: 'O seu parceiro de confiança para bilhetes e sistema cashless em eventos por todo Moçambique.',
            quickLinks: 'Links Rápidos',
            contacts: 'Contactos',
            support: 'Suporte',
            help: 'Ajuda & FAQ',
            terms: 'Termos de Serviço',
            privacy: 'Política de Privacidade',
            rights: 'Todos os direitos reservados.',
            proudly: 'Orgulhosamente Moçambicano'
        },
        en: {
            description: 'Your trusted partner for tickets and cashless system for events across Mozambique.',
            quickLinks: 'Quick Links',
            contacts: 'Contacts',
            support: 'Support',
            help: 'Help & FAQ',
            terms: 'Terms of Service',
            privacy: 'Privacy Policy',
            rights: 'All rights reserved.',
            proudly: 'Proudly Mozambican'
        }
    }

    const t = translations[language] || translations.pt

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Informação da Empresa */}
                    <div className="footer-section">
                        <div className="logo">
                            <div className="logo-icon">
                                <Tent size={24} />
                            </div>
                            <span className="logo-text">TABATER</span>
                        </div>
                        <p className="footer-description">
                            {t.description}
                        </p>
                        <div className="social-links">
                            <a href="#" aria-label="Facebook">
                                <Facebook size={20} />
                            </a>
                            <a href="#" aria-label="Instagram">
                                <Instagram size={20} />
                            </a>
                            <a href="#" aria-label="Twitter">
                                <Twitter size={20} />
                            </a>
                            <a href="#" aria-label="WhatsApp">
                                <MessageCircle size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Links Rápidos */}
                    <div className="footer-section">
                        <h3>{t.quickLinks}</h3>
                        <ul className="footer-links">
                            <li><Link to="/eventos">Eventos</Link></li>
                            <li><Link to="/cashless">Sistema Cashless</Link></li>
                            <li><Link to="/galeria">Galeria</Link></li>
                            <li><Link to="/contactos">Contactos</Link></li>
                        </ul>
                    </div>

                    {/* Contactos */}
                    <div className="footer-section">
                        <h3>{t.contacts}</h3>
                        <ul className="footer-contact">
                            <li>
                                <Phone size={16} />
                                +258 85 635 0220
                            </li>
                            <li>
                                <Mail size={16} />
                                info@tabater.co.mz
                            </li>
                            <li>
                                <MapPin size={16} />
                                Av. 25 de Setembro, Maputo
                            </li>
                        </ul>
                    </div>

                    {/* Suporte */}
                    <div className="footer-section">
                        <h3>{t.support}</h3>
                        <ul className="footer-links">
                            <li><a href="#">{t.help}</a></li>
                            <li><a href="#">{t.terms}</a></li>
                            <li><a href="#">{t.privacy}</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} Tabater. {t.rights}</p>
                    <p className="proudly-text">
                        <Heart size={16} />
                        {t.proudly}
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer