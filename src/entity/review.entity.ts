import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Property } from './property.entity';

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
  @ManyToOne(() => User, (user) => user.reviews)
  user!: User;

  /**
   * Many reviews belong to a property
   */
  @ManyToOne(() => Property, (property) => property.reviews)
  property!: Property;
}
