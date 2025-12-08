import React, { useState } from 'react'
import {
    Search,
    Grid3X3,
    List,
    Images,
    Calendar,
    MapPin,
    User,
    Eye,
    X,
    ArrowLeft,
    Camera
} from 'lucide-react'

const Gallery = ({ language = 'pt' }) => {
    const [selectedEvent, setSelectedEvent] = useState('all')
    const [selectedImage, setSelectedImage] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

    const translations = {
        pt: {
            title: 'Galeria de Eventos',
            subtitle: 'Momentos memoráveis dos nossos eventos',
            allEvents: 'Todos os Eventos',
            searchPlaceholder: 'Pesquisar eventos...',
            viewAllPhotos: 'Ver Todas as Fotos',
            photos: 'fotos',
            eventsHeld: 'Eventos Realizados',
            photosInGallery: 'Fotos na Galeria',
            cities: 'Cidades',
            gridView: 'Vista em Grid',
            listView: 'Vista em Lista',
            noEventsFound: 'Nenhum evento encontrado',
            eventDetails: 'Detalhes do Evento',
            date: 'Data',
            location: 'Local',
            artist: 'Artista',
            viewPhotos: 'Ver Fotos',
            backToList: 'Voltar à lista',
            adjustSearch: 'Tente ajustar a sua pesquisa ou filtros'
        },
        en: {
            title: 'Events Gallery',
            subtitle: 'Memorable moments from our events',
            allEvents: 'All Events',
            searchPlaceholder: 'Search events...',
            viewAllPhotos: 'View All Photos',
            photos: 'photos',
            eventsHeld: 'Events Held',
            photosInGallery: 'Photos in Gallery',
            cities: 'Cities',
            gridView: 'Grid View',
            listView: 'List View',
            noEventsFound: 'No events found',
            eventDetails: 'Event Details',
            date: 'Date',
            location: 'Location',
            artist: 'Artist',
            viewPhotos: 'View Photos',
            backToList: 'Back to list',
            adjustSearch: 'Try adjusting your search or filters'
        }
    }

    const t = translations[language] || translations.pt

    // Dados mock melhorados da galeria com 8 fotos por evento
    const events = [
        {
            id: 'marrabenta-2023',
            name: {
                pt: 'Festival Marrabenta 2023',
                en: 'Marrabenta Festival 2023'
            },
            date: '2023-12-15',
            location: {
                city: 'Maputo',
                venue: 'Estádio da Machava'
            },
            artist: 'Various Artists',
            photos: 45,
            images: [
                { id: 1, url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600', alt: 'Festival Marrabenta - Palco principal' },
                { id: 2, url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600', alt: 'Público animado no festival' },
                { id: 3, url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600', alt: 'Artistas no palco principal' },
                { id: 4, url: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=600', alt: 'Dança tradicional moçambicana' },
                { id: 5, url: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600', alt: 'Comida tradicional no evento' },
                { id: 6, url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600', alt: 'Performance musical' },
                { id: 7, url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600', alt: 'Decoração do evento' },
                { id: 8, url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600', alt: 'Fogos de artifício final' }
            ]
        },
        {
            id: 'jazz-beira-2023',
            name: {
                pt: 'Noite de Jazz na Beira',
                en: 'Jazz Night in Beira'
            },
            date: '2023-11-20',
            location: {
                city: 'Beira',
                venue: 'Clube Náutico da Beira'
            },
            artist: 'Jazz Masters MZ',
            photos: 32,
            images: [
                { id: 9, url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600', alt: 'Show de jazz íntimo' },
                { id: 10, url: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600', alt: 'Músicos em ação' },
                { id: 11, url: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600', alt: 'Saxofonista solo' },
                { id: 12, url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600', alt: 'Público apreciando a música' },
                { id: 13, url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600', alt: 'Ambiente do clube náutico' },
                { id: 14, url: 'https://images.unsplash.com/photo-1571974599782-87624638275f?w=600', alt: 'Baterista em performance' },
                { id: 15, url: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=600', alt: 'Vista do palco' },
                { id: 16, url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600', alt: 'Encerramento do evento' }
            ]
        },
        {
            id: 'reveillon-pemba-2023',
            name: {
                pt: 'Reveillon Pemba 2023',
                en: 'Pemba New Year 2023'
            },
            date: '2023-12-31',
            location: {
                city: 'Pemba',
                venue: 'Praia do Wimbe'
            },
            artist: 'DJ Klement & Convidados',
            photos: 68,
            images: [
                { id: 17, url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600', alt: 'Praia do Wimbe ao pôr do sol' },
                { id: 18, url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600', alt: 'Fogos de artifício de ano novo' },
                { id: 19, url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600', alt: 'DJ no comando' },
                { id: 20, url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600', alt: 'Multidão celebrando' },
                { id: 21, url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600', alt: 'Baracas de comida' },
                { id: 22, url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600', alt: 'Performance especial' },
                { id: 23, url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600', alt: 'Decoração natalícia' },
                { id: 24, url: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=600', alt: 'Primeiro amanhecer de 2024' }
            ]
        }
    ]

    const allImages = events.flatMap(event =>
        event.images.map(img => ({ ...img, event: event.id }))
    )

    const filteredEvents = events.filter(event => {
        const matchesSearch = !searchTerm ||
            event.name[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.artist.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesEvent = selectedEvent === 'all' || event.id === selectedEvent

        return matchesSearch && matchesEvent
    })

    const openLightbox = (image) => {
        setSelectedImage(image)
    }

    const closeLightbox = () => {
        setSelectedImage(null)
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString(language, {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    return (
        <div className="gallery-page">
            <div className="container">
                <div className="page-header">
                    <h1>{t.title}</h1>
                    <p>{t.subtitle}</p>
                </div>

                {/* Barra de Ferramentas */}
                <div className="gallery-toolbar">
                    <div className="search-section">
                        <div className="search-input-wrapper">
                            <input
                                type="text"
                                placeholder={t.searchPlaceholder}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                    </div>

                    <div className="view-controls">
                        <button
                            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                        >
                            <Grid3X3 size={16} />
                            {t.gridView}
                        </button>
                        <button
                            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                        >
                            <List size={16} />
                            {t.listView}
                        </button>
                    </div>
                </div>

                {/* Filtros de Eventos */}
                <div className="gallery-filters">
                    <button
                        className={`filter-btn ${selectedEvent === 'all' ? 'active' : ''}`}
                        onClick={() => setSelectedEvent('all')}
                    >
                        {t.allEvents}
                    </button>
                    {events.map(event => (
                        <button
                            key={event.id}
                            className={`filter-btn ${selectedEvent === event.id ? 'active' : ''}`}
                            onClick={() => setSelectedEvent(event.id)}
                        >
                            {event.name[language]}
                        </button>
                    ))}
                </div>

                {/* Conteúdo da Galeria */}
                {filteredEvents.length === 0 ? (
                    <div className="gallery-empty">
                        <div className="empty-state">
                            <div className="empty-icon">
                                <Search size={48} />
                            </div>
                            <h3>{t.noEventsFound}</h3>
                            <p>{t.adjustSearch}</p>
                        </div>
                    </div>
                ) : viewMode === 'grid' ? (
                    /* Vista em Grid */
                    <div className="gallery-grid">
                        {filteredEvents.map(event => (
                            <div key={event.id} className="event-card">
                                <div className="event-card-image">
                                    <img src={event.images[0]?.url} alt={event.name[language]} />
                                    <div className="photo-count">
                                        <Camera size={16} />
                                        {event.photos} {t.photos}
                                    </div>
                                </div>

                                <div className="event-card-content">
                                    <h3 className="event-title">{event.name[language]}</h3>

                                    <div className="event-meta">
                                        <div className="meta-item">
                                            <span className="meta-label">
                                                <Calendar size={16} />
                                                {t.date}:
                                            </span>
                                            <span>{formatDate(event.date)}</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">
                                                <MapPin size={16} />
                                                {t.location}:
                                            </span>
                                            <span>{event.location.venue}, {event.location.city}</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">
                                                <User size={16} />
                                                {t.artist}:
                                            </span>
                                            <span>{event.artist}</span>
                                        </div>
                                    </div>

                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => {
                                            setSelectedEvent(event.id)
                                            setViewMode('list')
                                        }}
                                    >
                                        <Images size={16} />
                                        {t.viewPhotos}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Vista em Lista (Fotos do evento selecionado) */
                    <div className="gallery-photos">
                        <div className="photos-header">
                            <h2>
                                {selectedEvent === 'all'
                                    ? t.allEvents
                                    : events.find(e => e.id === selectedEvent)?.name[language]
                                }
                            </h2>
                            <button
                                className="btn btn-outline btn-sm"
                                onClick={() => setViewMode('grid')}
                            >
                                <ArrowLeft size={16} />
                                {t.backToList}
                            </button>
                        </div>

                        <div className="photos-grid">
                            {allImages
                                .filter(img => selectedEvent === 'all' || img.event === selectedEvent)
                                .map(image => (
                                    <div
                                        key={image.id}
                                        className="gallery-item"
                                        onClick={() => openLightbox(image)}
                                    >
                                        <img
                                            src={image.url}
                                            alt={image.alt}
                                            loading="lazy"
                                        />
                                        <div className="image-overlay">
                                            <div className="view-icon">
                                                <Eye size={20} />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )}

                {/* Lightbox */}
                {selectedImage && (
                    <div className="lightbox" onClick={closeLightbox}>
                        <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                            <button className="lightbox-close" onClick={closeLightbox}>
                                <X size={24} />
                            </button>
                            <img
                                src={selectedImage.url}
                                alt={selectedImage.alt}
                                className="lightbox-image"
                            />
                            <div className="lightbox-caption">
                                <p>{selectedImage.alt}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Estatísticas */}
                <div className="gallery-stats">
                    <div className="stat-card">
                        <span className="stat-number">{events.length}</span>
                        <span className="stat-label">{t.eventsHeld}</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-number">{allImages.length}+</span>
                        <span className="stat-label">{t.photosInGallery}</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-number">
                            {[...new Set(events.map(event => event.location.city))].length}+
                        </span>
                        <span className="stat-label">{t.cities}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Gallery