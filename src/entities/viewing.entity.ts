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

/**
 * Viewings:
 */
@Entity()
export class Viewing {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'timestamp' })
  scheduledDate!: Date;

  @Column({
    type: 'enum',
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
  })
  status!: 'pending' | 'completed' | 'cancelled';

  @ManyToOne(() => User, (user) => user.viewings, { onDelete: 'CASCADE' })
  user!: User;

  @ManyToOne(() => Property, (property) => property.viewings, {
    onDelete: 'CASCADE',
  })
  property!: Property;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
