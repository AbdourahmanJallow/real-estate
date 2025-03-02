import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Property } from './property.entity';

/**
 * Favorite entity for bookmarking properties
 */
@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.favorites, {
    onDelete: 'CASCADE',
  })
  user!: User;

  @ManyToOne(() => Property, (property) => property.id, {
    onDelete: 'CASCADE',
  })
  property!: Property;

  @CreateDateColumn()
  createdAt!: Date;
}
