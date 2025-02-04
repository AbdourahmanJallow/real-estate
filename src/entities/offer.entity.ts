import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Property } from './property.entity';
import { User } from './user.entity';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  amount!: number;

  @Column()
  status!: 'pending' | 'accepted' | 'rejected';

  @ManyToOne(() => Property, (property) => property.offers)
  property!: Property;

  @ManyToOne(() => User, (user) => user.offers)
  user!: User;
}
