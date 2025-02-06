import express from 'express';
import { logger } from './middlewares/logger';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import 'colors';
import 'reflect-metadata';

// route imports
import propertyRoutes from './routes/propertyRoutes';
import errorHandler from './middlewares/errorHandler';

const app = express();

// MIDDLEWARE CONFIGURATION
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// API ROUTES
app.use('/api/v1/properties', propertyRoutes);

// ERROR HANDLER
app.use(errorHandler);

export default app;
