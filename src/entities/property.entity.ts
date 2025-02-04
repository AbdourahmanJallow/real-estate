import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Image } from './image.entity';
import { Review } from './review.entity';
import { Offer } from './offer.entity';
import { PropertyTransaction } from './transaction.entity';
import { Viewing } from './viewing.entity';

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

  @OneToMany(() => Image, (image) => image)
  images!: Image[];

  @Column()
  status!: 'Available' | 'Rented';

  /**
   * Many properties belong to one User(agent) entity.
   */
  @ManyToOne(() => User, (user) => user, { eager: true })
  agent!: User;

  /**
   * Each property can have many reviews
   */
  @OneToMany(() => Review, (review) => review.property)
  reviews!: Review[];

  /**
   * Each property can have many offers
   */
  @OneToMany(() => Offer, (offer) => offer.property)
  offers!: Offer[];

  /**
   * Each property can have many transactions
   */
  @OneToMany(() => PropertyTransaction, (transaction) => transaction.property)
  transactions!: PropertyTransaction[];

  /**
   * A property has many viewings
   */
  @OneToMany(() => Viewing, (viewing) => viewing.property)
  viewings!: Viewing[];
}
