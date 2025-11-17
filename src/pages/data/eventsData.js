export const eventsData = [
    {
        id: 1,
        name: {
            pt: 'Festival Marrabenta 2024',
            en: 'Marrabenta Festival 2024'
        },
        date: '2024-12-15',
        time: '18:00',
        location: {
            city: 'Maputo',
            province: 'maputo',
            venue: 'Estádio da Machava'
        },
        category: 'music',
        artist: 'Various Artists',
        image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600',
        startingPrice: 500,
        promoter: 'Promoções Moçambique',
        description: {
            pt: 'O maior festival de música tradicional moçambicana, celebrando a cultura Marrabenta com os melhores artistas do país. Uma noite inesquecível de música, dança e cultura moçambicana.',
            en: 'The biggest traditional Mozambican music festival, celebrating Marrabenta culture with the best artists in the country. An unforgettable night of music, dance and Mozambican culture.'
        },
        tickets: [
            {
                id: 'normal-1',
                type: 'normal',
                phase: 'Fase 1',
                price: 500,
                available: 1000,
                startDate: '2024-01-01',
                endDate: '2024-06-30'
            },
            {
                id: 'vip-1',
                type: 'vip',
                phase: 'Fase 1',
                price: 1200,
                available: 200,
                startDate: '2024-01-01',
                endDate: '2024-06-30'
            },
            {
                id: 'vip-2',
                type: 'vip',
                phase: 'Fase 2',
                price: 1500,
                available: 100,
                startDate: '2024-07-01',
                endDate: '2024-12-14'
            }
        ]
    },
    {
        id: 2,
        name: {
            pt: 'Noite de Jazz & Blues',
            en: 'Jazz & Blues Night'
        },
        date: '2024-11-20',
        time: '20:00',
        location: {
            city: 'Beira',
            province: 'sofala',
            venue: 'Clube Náutico da Beira'
        },
        category: 'music',
        artist: 'Jazz Masters MZ',
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600',
        startingPrice: 300,
        promoter: 'Arte & Cultura Sofala',
        description: {
            pt: 'Uma noite inesquecível com os melhores músicos de jazz e blues de Moçambique. Ambiente intimista e sofisticado com cocktails especiais.',
            en: 'An unforgettable night with the best jazz and blues musicians from Mozambique. Intimate and sophisticated atmosphere with special cocktails.'
        },
        tickets: [
            {
                id: 'normal-2',
                type: 'normal',
                phase: 'Fase 1',
                price: 300,
                available: 500,
                startDate: '2024-01-01',
                endDate: '2024-11-15'
            },
            {
                id: 'vip-2',
                type: 'vip',
                phase: 'Fase 1',
                price: 800,
                available: 50,
                startDate: '2024-01-01',
                endDate: '2024-11-15'
            }
        ]
    },
    {
        id: 3,
        name: {
            pt: 'Reveillon na Praia 2024',
            en: 'New Year Beach Party 2024'
        },
        date: '2024-12-31',
        time: '22:00',
        location: {
            city: 'Pemba',
            province: 'cabodelgado',
            venue: 'Praia do Wimbe'
        },
        category: 'festival',
        artist: 'DJ Klement & Convidados',
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600',
        startingPrice: 800,
        promoter: 'Pemba Entertainment',
        description: {
            pt: 'Celebre a passagem de ano na mais bela praia de Pemba com música eletrónica e tradicional. Fogos de artifício, open bar e muita animação até o amanhecer.',
            en: 'Celebrate New Year on the most beautiful beach in Pemba with electronic and traditional music. Fireworks, open bar and lots of entertainment until dawn.'
        },
        tickets: [
            {
                id: 'normal-3',
                type: 'normal',
                phase: 'Fase 1',
                price: 800,
                available: 1500,
                startDate: '2024-01-01',
                endDate: '2024-12-20'
            },
            {
                id: 'vip-3',
                type: 'vip',
                phase: 'Fase 1',
                price: 2000,
                available: 100,
                startDate: '2024-01-01',
                endDate: '2024-12-20'
            }
        ]
    },
    {
        id: 4,
        name: {
            pt: 'Feira de Artesanato de Nampula',
            en: 'Nampula Crafts Fair'
        },
        date: '2024-08-10',
        time: '09:00',
        location: {
            city: 'Nampula',
            province: 'nampula',
            venue: 'Feira Internacional de Nampula'
        },
        category: 'culture',
        artist: 'Artesãos Locais',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600',
        startingPrice: 100,
        promoter: 'Associação de Artesãos',
        description: {
            pt: 'Exposição e venda dos melhores trabalhos de artesanato tradicional da região norte. Música ao vivo, comida tradicional e workshops de artesanato.',
            en: 'Exhibition and sale of the best traditional crafts from the northern region. Live music, traditional food and craft workshops.'
        },
        tickets: [
            {
                id: 'normal-4',
                type: 'normal',
                phase: 'Entrada Geral',
                price: 100,
                available: 5000,
                startDate: '2024-01-01',
                endDate: '2024-08-09'
            }
        ]
    },
    {
        id: 5,
        name: {
            pt: 'Campeonato de Futebol da Cidade',
            en: 'City Football Championship'
        },
        date: '2024-09-15',
        time: '15:00',
        location: {
            city: 'Matola',
            province: 'maputo',
            venue: 'Estádio da Matola'
        },
        category: 'sports',
        artist: 'Equipas Locais',
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600',
        startingPrice: 200,
        promoter: 'Federação Moçambicana de Futebol',
        description: {
            pt: 'Final do campeonato municipal de futebol com as melhores equipas da região. Grande atmosfera desportiva e entretenimento familiar.',
            en: 'Municipal football championship final with the best teams in the region. Great sports atmosphere and family entertainment.'
        },
        tickets: [
            {
                id: 'normal-5',
                type: 'normal',
                phase: 'Fase 1',
                price: 200,
                available: 8000,
                startDate: '2024-01-01',
                endDate: '2024-09-10'
            },
            {
                id: 'vip-5',
                type: 'vip',
                phase: 'Fase 1',
                price: 500,
                available: 200,
                startDate: '2024-01-01',
                endDate: '2024-09-10'
            }
        ]
    },
    {
        id: 6,
        name: {
            pt: 'Conferência de Tecnologia TIC-MZ',
            en: 'TIC-MZ Technology Conference'
        },
        date: '2024-10-05',
        time: '08:00',
        location: {
            city: 'Maputo',
            province: 'maputo',
            venue: 'Centro de Conferências Joaquim Chissano'
        },
        category: 'conference',
        artist: 'Especialistas em TI',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600',
        startingPrice: 1500,
        promoter: 'Associação TIC Moçambique',
        description: {
            pt: 'A maior conferência de tecnologia da informação em Moçambique. Palestras, workshops e networking com os principais especialistas do sector.',
            en: 'The biggest information technology conference in Mozambique. Talks, workshops and networking with top industry experts.'
        },
        tickets: [
            {
                id: 'normal-6',
                type: 'normal',
                phase: 'Early Bird',
                price: 1500,
                available: 300,
                startDate: '2024-01-01',
                endDate: '2024-06-30'
            },
            {
                id: 'normal-6b',
                type: 'normal',
                phase: 'Fase Regular',
                price: 2000,
                available: 500,
                startDate: '2024-07-01',
                endDate: '2024-10-04'
            }
        ]
    }
]