import 'colors';
import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { logger } from './middlewares/logger';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';

// import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';

// route imports
import propertyRouter from './routes/property.routes';
import authRouter from './routes/auth.routes';

import errorHandler from './middlewares/errorHandler';
import authenticateJWT from './middlewares/authMiddleware';

const app = express();

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many requests, please try again later.',
});

// MIDDLEWARE CONFIGURATION
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// API ROUTES
app.get('/api/v1', authenticateJWT, (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to the Real Estate API',
  });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/properties', authenticateJWT, propertyRouter);

// ERROR HANDLER
app.use(errorHandler);

export default app;
