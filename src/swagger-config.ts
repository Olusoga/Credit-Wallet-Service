import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'CREDIT-WALLET-SERVICE',
            description: 'credit wallet service server',
            version: '1.0.0',
        },
    },
    apis: ['./src/router/*.ts'], 
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app: Express) => {
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs, {
        customCss: '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
        customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
        customJs: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js'
    }, {
        swaggerOptions: {
            urls: [
                {
                    url: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
                    name: 'Swagger UI Standalone Preset'
                }
            ]
        }
    }));
};

export default setupSwagger;
