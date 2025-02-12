import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Image } from './image.entity';
import { Review } from './review.entity';
import { Offer } from './offer.entity';
import { PropertyTransaction } from './transaction.entity';
import { Viewing } from './viewing.entity';
import { PropertyStatus } from '../types/property_types';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column({ type: 'float' })
  price!: number;

  @Column()
  location!: string;

  @OneToMany(() => Image, (image) => image.property, {
    cascade: true,
    eager: true,
  })
  images!: Image[];

  @Column({ type: 'enum', enum: PropertyStatus })
  status!: PropertyStatus;

  /**
   * Many properties belong to one User(agent) entity.
   */
  @ManyToOne(() => User, (user) => user.properties, {
    eager: true,
    onDelete: 'CASCADE',
  })
  agent!: User;

  /**
   * Each property can have many reviews
   */
  @OneToMany(() => Review, (review) => review.property, {
    eager: true,
    cascade: true,
  })
  reviews!: Review[];

  /**
   * Each property can have many offers
   */
  @OneToMany(() => Offer, (offer) => offer.property, {
    eager: true,
    cascade: true,
  })
  offers!: Offer[];

  /**
   * Each property can have many transactions
   */
  @OneToMany(() => PropertyTransaction, (transaction) => transaction.property, {
    eager: true,
    cascade: true,
  })
  transactions!: PropertyTransaction[];

  /**
   * A property has many viewings
   */
  @OneToMany(() => Viewing, (viewing) => viewing.property, {
    eager: true,
    cascade: true,
  })
  viewings!: Viewing[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
