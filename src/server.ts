/**
 * @author Abdourahman Jallow
 * @description Real Estate API
 */

import dotenv from 'dotenv';
dotenv.config();
import 'colors';
import { AppDataSource } from './data-source';

const PORT = process.env.PORT || 8800;

import app from './app';

AppDataSource.initialize()
  .then(async () => {
    const server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`.bgCyan.bold);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err: Error) => {
      console.log(`Error: ${err.message}`);

      // close server and exit
      server.close(() => process.exit(1));
    });
  })
  .catch((error) => console.log(error));
