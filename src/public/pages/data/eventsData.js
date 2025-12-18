export const eventsData = [
    {
        id: 1,
        name: {
            pt: 'Concerto de Jazz & Blues',
            en: 'Jazz & Blues Concert'
        },
        description: {
            pt: 'Uma noite inesquecível com os melhores músicos de jazz e blues de Moçambique. Repertório clássico e contemporâneo.',
            en: 'An unforgettable night with the best jazz and blues musicians from Mozambique. Classic and contemporary repertoire.'
        },
        date: '2025-04-15',
        time: '19:00',
        location: {
            venue: 'Centro Cultural Franco-Moçambicano',
            city: 'Maputo',
            province: 'Maputo'
        },
        category: 'música',
        artist: 'Banda Jazz Mozambique',
        promoter: 'Arte Viva Productions',
        startingPrice: 500,
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800',
        tickets: [
            {
                id: 1,
                type: 'vip',
                phase: 'Early Bird',
                price: 1000,
                available: 50,
                startDate: '2024-12-01',
                endDate: '2025-12-31'
            },
            {
                id: 2,
                type: 'normal',
                phase: 'Early Bird',
                price: 500,
                available: 150,
                startDate: '2024-12-01',
                endDate: '2025-12-31'
            }
        ]
    },
    {
        id: 2,
        name: {
            pt: 'Festival de Dança Tradicional',
            en: 'Traditional Dance Festival'
        },
        description: {
            pt: 'Celebração da cultura moçambicana através da dança. Grupos de todas as províncias apresentam suas tradições.',
            en: 'Celebration of Mozambican culture through dance. Groups from all provinces present their traditions.'
        },
        date: '2025-05-20',
        time: '16:00',
        location: {
            venue: 'Praça da Independência',
            city: 'Maputo',
            province: 'Maputo'
        },
        category: 'dança',
        promoter: 'Ministério da Cultura',
        startingPrice: 200,
        image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800',
        tickets: [
            {
                id: 3,
                type: 'vip',
                phase: 'Fase 1',
                price: 500,
                available: 30,
                startDate: '2024-12-01',
                endDate: '2025-12-31'
            },
            {
                id: 4,
                type: 'normal',
                phase: 'Fase 1',
                price: 200,
                available: 200,
                startDate: '2024-12-01',
                endDate: '2025-12-31'
            }
        ]
    },
    {
        id: 3,
        name: {
            pt: 'Teatro: "O Último Suspiro"',
            en: 'Theater: "The Last Breath"'
        },
        description: {
            pt: 'Peça teatral premiada que aborda questões sociais contemporâneas. Direção de João Matsimbe.',
            en: 'Award-winning play addressing contemporary social issues. Directed by João Matsimbe.'
        },
        date: '2025-03-10',
        time: '20:30',
        location: {
            venue: 'Teatro Avenida',
            city: 'Maputo',
            province: 'Maputo'
        },
        category: 'teatro',
        promoter: 'Companhia de Teatro Mutumbela',
        startingPrice: 300,
        image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800',
        tickets: [
            {
                id: 5,
                type: 'vip',
                phase: 'Pré-venda',
                price: 600,
                available: 20,
                startDate: '2024-12-01',
                endDate: '2025-12-31'
            },
            {
                id: 6,
                type: 'normal',
                phase: 'Pré-venda',
                price: 300,
                available: 100,
                startDate: '2024-12-01',
                endDate: '2025-12-31'
            }
        ]
    },
    {
        id: 4,
        name: {
            pt: 'Exposição de Arte Contemporânea',
            en: 'Contemporary Art Exhibition'
        },
        description: {
            pt: 'Mostra de artistas moçambicanos emergentes. Pintura, escultura e instalações.',
            en: 'Exhibition of emerging Mozambican artists. Painting, sculpture and installations.'
        },
        date: '2025-06-05',
        time: '10:00',
        location: {
            venue: 'Museu de Arte de Maputo',
            city: 'Maputo',
            province: 'Maputo'
        },
        category: 'exposição',
        promoter: 'Associação de Artistas Moçambicanos',
        startingPrice: 100,
        image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=800',
        tickets: [
            {
                id: 7,
                type: 'normal',
                phase: 'Geral',
                price: 100,
                available: 300,
                startDate: '2024-12-01',
                endDate: '2025-12-31'
            }
        ]
    },
    {
        id: 5,
        name: {
            pt: 'Festival de Comida de Rua',
            en: 'Street Food Festival'
        },
        description: {
            pt: 'Sabores de Moçambique em um só lugar. Comida tradicional, workshops e música ao vivo.',
            en: 'Flavors of Mozambique in one place. Traditional food, workshops and live music.'
        },
        date: '2025-04-22',
        time: '12:00',
        location: {
            venue: 'Feira Popular',
            city: 'Maputo',
            province: 'Maputo'
        },
        category: 'culinária',
        promoter: 'Foodies Mozambique',
        startingPrice: 0,
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800',
        tickets: [
            {
                id: 8,
                type: 'entrada',
                phase: 'Gratuita',
                price: 0,
                available: 1000,
                startDate: '2024-12-01',
                endDate: '2025-12-31'
            },
            {
                id: 9,
                type: 'workshop',
                phase: 'VIP',
                price: 500,
                available: 50,
                startDate: '2024-12-01',
                endDate: '2025-12-31'
            }
        ]
    },
    {
        id: 6,
        name: {
            pt: 'Concerto de Marrabenta',
            en: 'Marrabenta Concert'
        },
        description: {
            pt: 'Celebração do ritmo tradicional moçambicano. Com Dilon Djindji e convidados especiais.',
            en: 'Celebration of traditional Mozambican rhythm. With Dilon Djindji and special guests.'
        },
        date: '2025-07-12',
        time: '21:00',
        location: {
            venue: 'Estádio do Maxaquene',
            city: 'Maputo',
            province: 'Maputo'
        },
        category: 'música',
        artist: 'Dilon Djindji',
        promoter: 'Som Mozambique',
        startingPrice: 400,
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800',
        tickets: [
            {
                id: 10,
                type: 'vip',
                phase: 'Fase 1',
                price: 1000,
                available: 100,
                startDate: '2024-12-01',
                endDate: '2025-12-31'
            },
            {
                id: 11,
                type: 'normal',
                phase: 'Fase 1',
                price: 400,
                available: 500,
                startDate: '2024-12-01',
                endDate: '2025-12-31'
            },
            {
                id: 12,
                type: 'camarote',
                phase: 'Premium',
                price: 2000,
                available: 20,
                startDate: '2024-12-01',
                endDate: '2025-12-31'
            }
        ]
    },
    {
        id: 7,
        name: {
            pt: 'Workshop de Fotografia',
            en: 'Photography Workshop'
        },
        description: {
            pt: 'Aprenda técnicas profissionais de fotografia com o premiado fotógrafo moçambicano Mauro Pinto.',
            en: 'Learn professional photography techniques with award-winning Mozambican photographer Mauro Pinto.'
        },
        date: '2025-03-25',
        time: '09:00',
        location: {
            venue: 'Centro de Formação Fotográfica',
            city: 'Maputo',
            province: 'Maputo'
        },
        category: 'workshop',
        promoter: 'Foto Mozambique',
        startingPrice: 800,
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800',
        tickets: [
            {
                id: 13,
                type: 'básico',
                phase: 'Iniciante',
                price: 800,
                available: 30,
                startDate: '2024-12-01',
                endDate: '2025-12-31'
            },
            {
                id: 14,
                type: 'avançado',
                phase: 'Profissional',
                price: 1500,
                available: 15,
                startDate: '2024-12-01',
                endDate: '2025-12-31'
            }
        ]
    },
    {
        id: 8,
        name: {
            pt: 'Festival de Cinema Moçambicano',
            en: 'Mozambican Film Festival'
        },
        description: {
            pt: 'Mostra dos melhores filmes moçambicanos do ano. Sessões especiais com diretores.',
            en: 'Showcase of the best Mozambican films of the year. Special sessions with directors.'
        },
        date: '2025-08-10',
        time: '18:00',
        location: {
            venue: 'Cinema Scala',
            city: 'Beira',
            province: 'Sofala'
        },
        category: 'cinema',
        promoter: 'Instituto Nacional de Cinema',
        startingPrice: 150,
        image: 'https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?auto=format&fit=crop&w=800',
        tickets: [
            {
                id: 15,
                type: 'diário',
                phase: 'Passe 1 Dia',
                price: 150,
                available: 200,
                startDate: '2024-12-01',
                endDate: '2025-12-31'
            },
            {
                id: 16,
                type: 'festival',
                phase: 'Passe Completo',
                price: 500,
                available: 100,
                startDate: '2024-12-01',
                endDate: '2025-12-31'
            }
        ]
    }
]