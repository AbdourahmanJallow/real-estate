import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Property } from './property.entity';
import { User } from './user.entity';
import { OfferStatus } from '../types/offer_types';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  amount!: number;

  @Column({ type: 'enum', enum: OfferStatus })
  status!: OfferStatus;

  @ManyToOne(() => Property, (property) => property.offers, {
    onDelete: 'CASCADE',
  })
  property!: Property;

  @ManyToOne(() => User, (user) => user.offers, { onDelete: 'CASCADE' })
  user!: User;
}
