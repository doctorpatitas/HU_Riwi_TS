import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Gestión de Riwi',
            version: '1.0.0',
            description: 'API REST para gestionar TLs, Rutas, Clanes y Coders',
        },
        servers: [
            { url: 'http://localhost:3000' }
        ],
        components: {
            schemas: {
                TL: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', example: '64a1b2c3d4e5f6a7b8c9d0e1' },
                        tl_name: { type: 'string', example: 'Juan Pérez' },
                        age: { type: 'number', example: 30 },
                        identification_number: { type: 'number', example: 123456789 },
                        route: { type: 'string', enum: ['AI', 'data science', 'Node with Nest.js', 'Angular'] },
                    }
                },
                Track: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', example: '64a1b2c5d4e5f6a7b8c9d0e1' },
                        track_name: { type: 'string', example: 'Node with Nest.js' },
                        tl: { type: 'string', example: '64a1b2c3d4e5f6a7b8c9d0e1' }
                    }
                },
                Clan: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', example: '64a1b2c6d4e5f6a7b8c9d0e1' },
                        clan_name: { type: 'string', example: 'Golden gate' },
                        track: { type: 'string', example: '64a1b2c5d4e5f6a7b8c9d0e1' }
                    }
                },
                Coder: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', example: '67a1b2c3d4e5f6a7b8c9d0e1' },
                        coder_name: { type: 'string', example: 'Milton Ortega' },
                        age: { type: 'number', example: 18 },
                        clan: { type: 'string', example: '64a1b2c6d4e5f6a7b8c9d0e1' }
                    }
                }
            }
        }
    },
    apis: ['./src/routes/*.routes.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);