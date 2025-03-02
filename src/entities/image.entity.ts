import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Property } from './property.entity';
import { User } from './user.entity';

/**
 * Images uploaded by a User(agent) belongs to a property.
 */
@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  url!: string;

  @Column()
  filename?: string;

  @Column()
  size!: number;

  /**
   * A property has many images, an image belongs to a property(id)
   */
  @ManyToOne(() => Property, (property) => property.images, {
    onDelete: 'CASCADE',
  })
  property?: Property;

  /**
   * A user has one profile picture.
   */
  @OneToOne(() => User, (user) => user.profilePicture)
  user?: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
