import { AppDataSource } from '../data-source';
import { Repository } from 'typeorm';
import { ServiceResponse } from '../types/property.types';

import { User } from '../entities/user.entity';
import ApiError from '../utils/ApiError';

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}
export class UserService {
  private userRepo: Repository<User>;

  constructor() {
    this.userRepo = AppDataSource.getRepository(User);
  }

  async createUser(registerDTO: CreateUserDTO): Promise<User> {
    const { name, email, password } = registerDTO;

    if (!name || !email || !password)
      throw new ApiError(
        'Missing required fields: name, email or password.',
        400
      );

    const newUser = new User(name, email, password);

    return await this.userRepo.save(newUser);
  }

  async findAll(): Promise<ServiceResponse<User[]>> {
    const users = await this.userRepo.find();

    return {
      success: true,
      data: users,
    };
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) throw new ApiError(`User with id ${id} not found.`, 404);

    return user;
  }

  async removeUser(userId: number): Promise<void> {}
}
