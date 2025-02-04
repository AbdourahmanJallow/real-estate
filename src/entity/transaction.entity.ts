import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Property } from './property.entity';

@Entity()
export class Transaction_ {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  amount!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date!: Date;

  @Column({ type: 'enum', enum: ['purchase', 'rent', 'deposit'] })
  type!: 'purchase' | 'rent' | 'deposit';

  /**
   * A transaction belongs to a user
   */
  @ManyToOne(() => User, (user) => user.transactions)
  user!: User;

  /**
   * A Transaction belongs to a Property
   */
  @ManyToOne(() => Property, (property) => property.transactions)
  property!: Property;
}
