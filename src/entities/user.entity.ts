import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Property } from './property.entity';
import { UserRole } from '../types/user.types';
import { Review } from './review.entity';
import { Offer } from './offer.entity';
import { PropertyTransaction } from './transaction.entity';
import { Viewing } from './viewing.entity';
import { AdminActivityLog } from './admin-activity-log.entity';

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

  @Column()
  password!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.TENANT,
  })
  role!: UserRole;

  /**
   * A User(agent) can have many properties.
   */
  @OneToMany(() => Property, (property) => property.agent, {
    // eager: true,
    cascade: true,
  })
  properties?: Property[];

  /**
   * A User(tenant) can make reviews on a property
   */
  @OneToMany(() => Review, (review) => review.user, {
    // eager: true,
    cascade: true,
  })
  reviews?: Review[];

  /**
   * A User can make many offers on different properties
   */
  @OneToMany(() => Offer, (offer) => offer.user, {
    // eager: true,
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
      // eager: true,
      cascade: true,
    }
  )
  transactions?: PropertyTransaction[];

  /**
   * A User can view multiple properties
   */
  @OneToMany(() => Viewing, (viewing) => viewing.user, {
    // eager: true,
    cascade: true,
  })
  viewings?: Viewing[];

  /**
   * An admin can have many activty logs
   */
  @OneToMany(() => AdminActivityLog, (log) => log.admin, {
    // eager: true,
    cascade: false,
  })
  adminLogs?: AdminActivityLog[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
