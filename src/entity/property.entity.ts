import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  price!: number;

  @Column()
  location!: string;

  @Column('text', { array: true })
  images!: string[];

  @Column()
  status!: 'Available' | 'Rented';

  /**
   * Each Property is linked to exactly one User(agent) entity.
   */
  @ManyToOne(() => User, (user) => user, { eager: true })
  agent!: User;
}
