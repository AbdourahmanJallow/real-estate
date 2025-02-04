import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Property } from './property.entity';

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
  property!: Property;
}
