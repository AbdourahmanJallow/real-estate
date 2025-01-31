import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Image } from './image.entity';

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

  @OneToMany(() => Image, (image) => image)
  images!: Image[];

  @Column()
  status!: 'Available' | 'Rented';

  /**
   * Each Property is linked to exactly one User(agent) entity.
   */
  @ManyToOne(() => User, (user) => user, { eager: true })
  agent!: User;
}
