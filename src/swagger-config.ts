import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import path from 'path';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'CREDIT-WALLET-SERVICE',
            description: 'credit wallet service server',
            version: '1.0.0',
        },
    },
    apis: [path.join(__dirname, './router/*.ts')]
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app: Express) => {
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));
};

export default setupSwagger;
