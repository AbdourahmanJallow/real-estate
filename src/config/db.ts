import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoURI = process.env.DATABASE_URL;

    if (!mongoURI) throw new Error('Missing required database url');

    const conn = await mongoose.connect(mongoURI);

    console.log(`MongoDB connected successfully: ${conn.connection.host}`);
  } catch (error: any) {
    console.log(`Connection error: ${error.message}`);
    process.exit(1);
  }
};

// connectDB();

// mongoose.connection.on('error', (error: Error) => {
//   console.log(
//     `1. 🔥 Common Error caused issue → : check your .env file first and add your mongodb url`
//   );
//   console.error(`2. 🚫 Error → : ${error.message}`);
// });
