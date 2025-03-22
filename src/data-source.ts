import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Property } from './entities/property.entity';
import { Image } from './entities/image.entity';
import { Offer } from './entities/offer.entity';
import { PropertyTransaction } from './entities/transaction.entity';
import { AdminActivityLog } from './entities/admin-activity-log.entity';
import { Review } from './entities/review.entity';
import { Viewing } from './entities/viewing.entity';
import { Favorite } from './entities/favorite.entity';
import { Notification } from './entities/notification.entity';
import { Message } from './entities/message.entity';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost', // use localhost for development
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'real_estate',
  synchronize: false,
  logging: false,
  entities: isProduction
    ? ['dist/entities/*.js']
    : [
        User,
        Review,
        Image,
        Offer,
        Viewing,
        Property,
        PropertyTransaction,
        AdminActivityLog,
        Favorite,
        Notification,
        Message,
      ],
  // migrations: ['src/migration/**/*.ts'],
  // migrations: [__dirname + '/../dist/migration/*.js'],
  migrations: isProduction ? ['dist/migration/*.js'] : ['src/migration/*.ts'],
  subscribers: [],
});
