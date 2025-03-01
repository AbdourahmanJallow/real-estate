import { AppDataSource } from '../data-source';
import { Repository } from 'typeorm';
import { ServiceResponse } from '../types/property.types';

import { User } from '../entities/user.entity';

export class AuthService {
  private userRepo: Repository<User>;

  constructor() {
    this.userRepo = AppDataSource.getRepository(User);
  }

  async findAll(): Promise<ServiceResponse<User[]>> {
    const users = await this.userRepo.find();

    return {
      success: true,
      data: users,
    };
  }

  async findById(id: number): Promise<ServiceResponse<User>> {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) throw new Error(`user ${id} not found.`);

    return { success: true, data: user };
  }

  async registerUser(registerDTO: {
    name: string;
    email: string;
    password: string;
  }): Promise<void> {}

  async login(loginDTO: { email: string; password: string }): Promise<void> {}

  async logout(): Promise<void> {}

  async resfreshToken(): Promise<void> {}

  async updatePassword(): Promise<void> {}
}
