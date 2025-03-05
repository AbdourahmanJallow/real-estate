import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { User } from './user.entity';
import { Image } from './image.entity';
import { Review } from './review.entity';
import { Offer } from './offer.entity';
import { PropertyTransaction } from './transaction.entity';
import { Viewing } from './viewing.entity';
import { geocodeAddress } from '../utils/geocode';

export enum PropertyStatus {
  NOT_AVAILABLE = 'not_available',
  AVAILABLE = 'available',
  RENTED = 'rented',
}

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

  @Column({ type: 'json', nullable: true })
  coordinates?: { lat: number; lng: number };

  @OneToMany(() => Image, (image) => image.property, {
    cascade: true,
    eager: true,
  })
  images!: Image[];

  @Column({ type: 'enum', enum: PropertyStatus })
  availabilityStatus!: PropertyStatus;

  @Column('simple-array')
  amenities!: string[];

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

  @BeforeInsert()
  @BeforeUpdate()
  async setGeolocation() {
    if (this.location) {
      const { latitude, longitude } = await geocodeAddress(this.location);

      this.coordinates = { lat: latitude, lng: longitude };
    }
  }

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
