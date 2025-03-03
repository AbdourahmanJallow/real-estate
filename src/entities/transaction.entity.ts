import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Property } from './property.entity';

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum TransactionType {
  PURCHASE = 'purchase',
  RENTAL = 'rental',
  //   CANCELLED = 'cancelled',
}

@Entity()
export class PropertyTransaction {
  @PrimaryGeneratedColumn()
  id!: number;

  // NB: run migrations after type changes
  @Column({ type: 'float' })
  amount!: number;

  @Column({ nullable: true })
  description!: string;

  @Column({ type: 'enum', enum: TransactionType })
  type!: TransactionType;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  status!: PaymentStatus;

  @Column({ nullable: true })
  paymentRefrence?: string;

  @Column({ default: 'GMD' })
  currency!: string;

  /**
   * A Transaction belongs to a Property
   */
  @ManyToOne(() => Property, (property) => property.transactions, {
    onDelete: 'CASCADE',
  })
  property!: Property;

  /**
   * A transaction is created by user
   */
  @ManyToOne(() => User, (user) => user.transactions, { onDelete: 'CASCADE' })
  createdBy!: User;

  /**
   * A transaction is updated by user
   */
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  updatedBy?: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
