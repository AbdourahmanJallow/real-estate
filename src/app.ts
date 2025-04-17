import express, { Request, Response } from 'express';
import { logger } from './middlewares/logger';
// import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import 'colors';
import 'reflect-metadata';

// route imports
import propertyRouter from './routes/property.routes';
import authRouter from './routes/auth.routes';

import errorHandler from './middlewares/errorHandler';
import authenticateJWT from './middlewares/authMiddleware';

const app = express();

// MIDDLEWARE CONFIGURATION
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// API ROUTES
app.get('/', authenticateJWT, (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to the Real Estate API',
  });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/properties', propertyRouter);

// ERROR HANDLER
app.use(errorHandler);

export default app;
