import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Property } from './property.entity';
import { TransactionType } from '../types/transaction.types';

@Entity()
export class PropertyTransaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  amount!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date!: Date;

  @Column({ type: 'enum', enum: TransactionType })
  type!: TransactionType;

  /**
   * A transaction belongs to a user
   */
  @ManyToOne(() => User, (user) => user.transactions, { onDelete: 'CASCADE' })
  user!: User;

  /**
   * A Transaction belongs to a Property
   */
  @ManyToOne(() => Property, (property) => property.transactions, {
    onDelete: 'CASCADE',
  })
  property!: Property;
}
