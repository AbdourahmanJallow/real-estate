import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Property } from './property.entity';

/**
 * Reviews are made by a user for a property
 */
@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content!: string;

  @Column({ type: 'int' })
  rating!: number;

  /**
   * Many reviews belong to a User(tenant)
   */
  @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
  user!: User;

  /**
   * Many reviews belong to a property
   */
  @ManyToOne(() => Property, (property) => property.reviews, {
    onDelete: 'CASCADE',
  })
  property!: Property;
}
