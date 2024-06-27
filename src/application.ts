import express from 'express';
import * as http from 'http';
import "reflect-metadata";
import bodyParser from 'body-parser';
import knex from './database-config/db-config';
import UserRoutes from './router/user';
import AccountRoutes from './router/account';
import TransactionRoutes from './router/transaction';
import setupSwagger from './swagger-config';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.PORT || 4040;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/api/v1', UserRoutes);
app.use('/api/v1', AccountRoutes);
app.use('/api/v1', TransactionRoutes);

setupSwagger(app as unknown as any);
// Health check route
const runningMessage = `Server running on port ${port}`;
app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send({
        'health-check': 'OK',
        message: runningMessage
    });
});


// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    const status = err.status || 500;
    const message = err.message || 'An unexpected error occurred.';
    res.status(status).json({
        error: {
            code: err.code || 'UNEXPECTED_ERROR',
            message: message
        }
    });
});



// Initialize database connection
knex.queryBuilder();

export default server;
