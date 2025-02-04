import express, { Request, Response } from 'express';
import { logger } from './middlewares/logger';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import 'colors';
import 'reflect-metadata';

// route imports
import propertyRoutes from './routes/property_routes';

const app = express();

// MIDDLEWARE CONFIGURATION
app.use(cors());
// Body parser
app.use(express.json());
// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger);

// API ROUTES
app.use('/api/v1/properties', propertyRoutes);

// ERROR HANDLER

export default app;
