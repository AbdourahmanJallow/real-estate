import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Property } from './property.entity';
import { USER_ROLE } from '../enums/user_types.enum';
import { Review } from './review.entity';
import { Offer } from './offer.entity';
import { Transaction_ } from './transaction.entity';
import { Viewing } from './viewing.entity';
import { AdminActivityLog } from './admin-activity-log.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text')
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: number;

  @Column({
    type: 'enum',
    enum: USER_ROLE,
    default: USER_ROLE.TENANT,
  })
  role!: USER_ROLE;

  /**
   * A User(agent) can have many properties.
   */
  @OneToMany(() => Property, (property) => property.agent, { nullable: true })
  properties?: Property[];

  /**
   * A User(tenant) can make reviews on a property
   */
  @OneToMany(() => Review, (review) => review.user, { nullable: true })
  reviews?: Review[];

  /**
   * A User can make many offers on different properties
   */
  @OneToMany(() => Offer, (offer) => offer.user, { nullable: true })
  offers?: Offer[];

  /**
   * A User can have multiple transactions
   * A User makes many transactions,
   */
  @OneToMany(() => Transaction_, (transaction) => transaction.user, {
    nullable: true,
  })
  transactions?: Transaction_[];

  /**
   * A User can view multiple properties
   */
  @OneToMany(() => Viewing, (viewing) => viewing.user, { nullable: true })
  viewings?: Viewing[];

  /**
   * An admin can have many activty logs
   */
  @OneToMany(() => AdminActivityLog, (log) => log.admin, { nullable: true })
  adminLogs?: AdminActivityLog[];
}
