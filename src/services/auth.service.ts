import { AppDataSource } from '../data-source';
import { Repository } from 'typeorm';
import { ServiceResponse } from '../types/property.types';

import { User } from '../entities/user.entity';
import { CreateUserDTO, UserService } from './user.service';
import ApiError from '../utils/ApiError';
import jwt from 'jsonwebtoken';

export interface LoginResult {
  success: boolean;
  token: string;
}

export class AuthService {
  private userRepo: Repository<User>;
  private userService: UserService;

  constructor() {
    this.userRepo = AppDataSource.getRepository(User);
    this.userService = new UserService();
  }

  async registerUser(registerDTO: CreateUserDTO): Promise<User> {
    const user = await this.userService.createUser(registerDTO);

    return user;
  }

  async login(loginDTO: {
    email: string;
    password: string;
  }): Promise<LoginResult> {
    const user = await this.userRepo.findOneBy({ email: loginDTO.email });

    if (!user || !(await user.validatePassword(user.password))) {
      throw new ApiError('Invalid credentials.', 403);
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    return { success: true, token };
  }

  async logout(): Promise<void> {}

  async resfreshToken(): Promise<void> {}

  async updatePassword(): Promise<void> {}
}
