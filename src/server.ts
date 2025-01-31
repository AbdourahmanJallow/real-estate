import dotenv from 'dotenv';
dotenv.config();
import 'colors';

const PORT = process.env.PORT || 8800;

// connectDB();

// mongoose.connection.on('error', (error: Error) => {
//   console.log(
//     `1. 🔥 Common Error caused issue → : check your .env file first and add your mongodb url`
//   );
//   console.error(`2. 🚫 Error → : ${error.message}`);
// });

import app from './app';

import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(async () => {
    const server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err: any, promise: Promise<any>) => {
      console.log(`Error: ${err.message}`);

      // close server and exit
      server.close(() => process.exit(1));
    });
  })
  .catch((error) => console.log(error));
