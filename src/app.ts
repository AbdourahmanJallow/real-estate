import express from 'express';
import { logger } from './middlewares/logger';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import 'colors';
import 'reflect-metadata';

// route imports
import propertyRoutes from './routes/property.routes';
import authRoutes from './routes/auth.routes';

import errorHandler from './middlewares/errorHandler';

const app = express();

// MIDDLEWARE CONFIGURATION
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// API ROUTES
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/properties', propertyRoutes);

// function listRoutes(app: express.Application) {
//   app._router.stack.forEach((middleware: any) => {
//     if (middleware.route) {
//       // Routes registered directly on the app
//       console.log(
//         `${Object.keys(middleware.route.methods).join(', ').toUpperCase()} ${
//           middleware.route.path
//         }`
//       );
//     } else if (middleware.name === 'router') {
//       // Routes added as router middleware
//       middleware.handle.stack.forEach((handler: any) => {
//         const route = handler.route;
//         if (route) {
//           console.log(
//             `${Object.keys(route.methods).join(', ').toUpperCase()} ${
//               route.path
//             }`
//           );
//         }
//       });
//     }
//   });
// }

// listRoutes(app);

// ERROR HANDLER
app.use(errorHandler);

export default app;
