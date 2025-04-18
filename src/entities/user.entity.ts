import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToOne,
  JoinColumn,
  BeforeUpdate,
} from 'typeorm';
import bcrypt from 'bcryptjs';
import { Property } from './property.entity';
import { Review } from './review.entity';
import { Offer } from './offer.entity';
import { PropertyTransaction } from './transaction.entity';
import { Viewing } from './viewing.entity';
import { AdminActivityLog } from './admin-activity-log.entity';
import { Image } from './image.entity';
import { geocodeAddress } from '../utils/geocode';
import { Favorite } from './favorite.entity';
import { Message } from './message.entity';
import { Notification } from './notification.entity';
import { Exclude } from 'class-transformer';

export enum UserRole {
  ADMIN = 'admin',
  AGENT = 'agent',
  TENANT = 'tenant',
}

/**
 * User: Entity for user attributes and properties
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Exclude()
  @Column()
  password!: string;

  @Column({ nullable: true })
  address!: string;

  @Column({ nullable: true })
  phoneNumber!: string;

  @Column({ type: 'text', nullable: true })
  refreshToken?: string | null;

  @Column({ type: 'json', nullable: true })
  coordinates?: { lat: number; lng: number };

  @OneToOne(() => Image, (image) => image.user, { nullable: true })
  @JoinColumn()
  profilePicture?: Image;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setGeolocation() {
    if (this.address) {
      const { latitude, longitude } = await geocodeAddress(this.address);
      this.coordinates = { lat: latitude, lng: longitude };
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.TENANT,
  })
  role!: UserRole;

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites?: Favorite[];

  /**
   * A User can send and receive messages
   */
  @OneToMany(() => Message, (message) => message.sender, {
    cascade: true,
  })
  sentMessages?: Message[];

  @OneToMany(() => Message, (message) => message.receiver, {
    cascade: true,
  })
  receivedMessages?: Message[];

  /**
   * A User can have many notifications
   */
  @OneToMany(() => Notification, (notification) => notification.user, {
    cascade: true,
  })
  notifications?: Notification[];

  /**
   * A User(agent) can have many properties.
   */
  @OneToMany(() => Property, (property) => property.agent, {
    cascade: true,
  })
  properties?: Property[];

  /**
   * A User(tenant) can make reviews on a property
   */
  @OneToMany(() => Review, (review) => review.user, {
    cascade: true,
  })
  reviews?: Review[];

  /**
   * A User can make many offers on different properties
   */
  @OneToMany(() => Offer, (offer) => offer.user, {
    cascade: true,
  })
  offers?: Offer[];

  /**
   * A User can have multiple transactions
   * A User makes many transactions,
   */
  @OneToMany(
    () => PropertyTransaction,
    (transaction) => transaction.createdBy,
    {
      cascade: true,
    }
  )
  transactions?: PropertyTransaction[];

  /**
   * A User can view multiple properties
   */
  @OneToMany(() => Viewing, (viewing) => viewing.user, {
    cascade: true,
  })
  viewings?: Viewing[];

  /**
   * An admin can have many activty logs
   */
  @OneToMany(() => AdminActivityLog, (log) => log.admin, {
    cascade: false,
  })
  adminLogs?: AdminActivityLog[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
