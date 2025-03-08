import 'reflect-metadata';
import { DataSource, Not } from 'typeorm';
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

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [
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
  migrations: ['src/migration/**/*.ts'],
  subscribers: [],
});
