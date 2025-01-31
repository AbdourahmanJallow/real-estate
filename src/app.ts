import express, { Request, Response } from 'express';
import { logger } from './middlewares/logger';
import path from 'path';
import cors from 'cors';
import 'colors';
import 'reflect-metadata';

// route imports
import propertyRoutes from './routes/propertyRoutes';

const app = express();

// Body parser
app.use(express.json());
// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger);
app.use(cors());

// ADD API ROUTES HERE
app.use('/api/v1/properties', propertyRoutes);

// ADD ERROR HANDLER HERE

export default app;
