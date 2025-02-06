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

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'real_estate',
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
  ],
  migrations: ['src/migration/**/*.ts'],
  subscribers: [],
});
