import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Property } from './property.entity';
import { USER_ROLE } from '../enums/user_types.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text')
  name!: string;

  @Column({ unique: true, length: 150 })
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
  @OneToMany(() => Property, (property) => property.agent)
  properties!: Property[];
}
