import { AppDataSource } from '../data-source';
import { Repository } from 'typeorm';
import { ServiceResponse } from '../enums/property.types';

import { User, UserRole } from '../entities/user.entity';
import ApiError from '../utils/ApiError';

export interface UserDTO {
  name: string;
  email: string;
  password: string;
  address?: string;
  phoneNumber?: string;
  role?: UserRole;
}
export class UserService {
  private userRepo: Repository<User>;

  constructor() {
    this.userRepo = AppDataSource.getRepository(User);
  }

  async createUser(userData: UserDTO): Promise<User> {
    const { name, email, password } = userData;

    if (!name || !email || !password)
      throw new ApiError(
        'Missing required fields: name, email or password.',
        400
      );

    const newUser = this.userRepo.create({
      ...userData,
    });

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

  async removeUser(userId: number) {
    const user = await this.userRepo.findOneBy({ id: userId });

    if (!user) throw new ApiError(`User with id ${userId} not found.`, 404);

    return await this.userRepo.remove(user);
  }
}
