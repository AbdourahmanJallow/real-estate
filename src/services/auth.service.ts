import { AppDataSource } from '../data-source';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { CreateUserDTO, UserService } from './user.service';
import ApiError from '../utils/ApiError';
import jwt from 'jsonwebtoken';

export interface LoginResult {
  success: boolean;
  accessToken: string;
  refreshToken: string;
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

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return { success: true, accessToken, refreshToken };
  }

  private generateAccessToken(user: User): string {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1hr',
    });
  }
  private generateRefreshToken(user: User): string {
    return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '1d',
    });
  }

  async logout(): Promise<void> {}

  async resfreshToken(token: string): Promise<string> {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET) as {
      id: number;
    };

    if (!payload) throw new Error('Invalid token. Failed to refresh token.');

    const user = await this.userRepo.findOneBy({ id: payload.id });

    if (!user) throw new Error('User not found. Failed to refresh token.');

    return this.generateAccessToken(user);
  }

  async updatePassword(): Promise<void> {}
}
