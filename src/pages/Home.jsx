import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEvents } from './context/EventsContext'
import EventsGrid from '../components/Events/EventsGrid'
import EventFilters from '../components/Events/EventFilters'
import SearchWithFilters from '../components/Events/SearchWithFilters'


const Home = ({ language = 'pt' }) => {
    const { events } = useEvents()
    const [searchTerm, setSearchTerm] = useState('')

    const featuredEvents = events.slice(0, 6)

    const translations = {
        pt: {
            title: 'Os Melhores Eventos em',
            subtitle: 'Descubra, compre bilhetes e viva experiências inesquecíveis com o sistema mais rápido e seguro do país.',
            searchPlaceholder: 'Pesquisar eventos, artistas, locais...',
            search: 'Buscar',
            featured: 'Eventos em Destaque',
            viewAll: 'Ver Todos os Eventos',
            cashlessDesc: 'Pagamentos rápidos e seguros sem dinheiro físico. Use pulseiras eletrónicas para comprar comida, bebidas e muito mais.',
            knowMore: 'Saber Mais',
            stats: {
                events: 'Eventos',
                provinces: 'Províncias',
                satisfaction: 'Satisfação'
            }
        },
        en: {
            title: 'The Best Events in',
            subtitle: 'Discover, buy tickets and live unforgettable experiences with the fastest and safest system in the country.',
            searchPlaceholder: 'Search events, artists, locations...',
            search: 'Search',
            featured: 'Featured Events',
            viewAll: 'View All Events',
            cashlessDesc: 'Fast and secure payments without physical money. Use electronic bracelets to buy food, drinks and much more.',
            knowMore: 'Know More',
            stats: {
                events: 'Events',
                provinces: 'Provinces',
                satisfaction: 'Satisfaction'
            }
        }
    }

    const t = translations[language] || translations.pt

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            {t.title}
                            <span className="highlight"> Moçambique</span>
                        </h1>
                        <p className="hero-subtitle">
                            {t.subtitle}
                        </p>

                        <SearchWithFilters
                            language={language}
                            onSearch={(term) => {
                                //lógica de pesquisa
                                console.log('Search term:', term)
                            }}
                        />

                        <div className="hero-stats">
                            <div className="stat">
                                <span className="stat-number">{events.length}+</span>
                                <span className="stat-label">{t.stats.events}</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">10+</span>
                                <span className="stat-label">{t.stats.provinces}</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">98%</span>
                                <span className="stat-label">{t.stats.satisfaction}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filtros Rápidos */}
            <div className="container">
                <EventsGrid events={featuredEvents} language={language} columnsMobile={2} />
            </div>

            {/* Eventos em Destaque */}
            <section className="featured-section">
                <div className="container">
                    <div className="section-header">
                        <h2>{t.featured}</h2>
                        <Link to="/eventos" className="btn btn-outline">
                            {t.viewAll} →
                        </Link>
                    </div>

                    <EventsGrid events={featuredEvents} language={language} />

                    {/* Sistema Cashless Preview */}

                </div>
            </section>
        </div>
    )
}

export default Home