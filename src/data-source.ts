import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/user.entity';
import { Property } from './entity/property.entity';
import { Image } from './entity/image.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'real_estate_db',
  synchronize: true,
  logging: false,
  entities: [User, Property, Image],
  migrations: [],
  subscribers: [],
});
