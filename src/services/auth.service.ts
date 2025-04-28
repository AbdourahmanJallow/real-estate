import { AppDataSource } from '../data-source';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { UserDTO, UserService } from './user.service';
import ApiError from '../utils/ApiError';
import jwt from 'jsonwebtoken';
import redisClient from '../utils/redisClient';

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

  async registerUser(userData: UserDTO): Promise<User> {
    const user = await this.userService.createUser(userData);

    if (!user) {
      throw new Error(`Failed to create new user`);
    }

    return user;
  }

  async login(loginDTO: {
    email: string;
    password: string;
  }): Promise<LoginResult> {
    const user = await this.userRepo.findOneBy({ email: loginDTO.email });

    if (!user || !(await user.validatePassword(loginDTO.password))) {
      throw new ApiError('Invalid credentials.', 403);
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await this.userRepo.save(user);

    return { success: true, accessToken, refreshToken };
  }

  private generateAccessToken(user: User): string {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '2hr',
    });
  }
  private generateRefreshToken(user: User): string {
    return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: '1d',
    });
  }

  async logout(token: string, userId: number): Promise<void> {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new Error('User not found.');

    await this.blacklistToken(token!);

    user.refreshToken = null;
    await this.userRepo.save(user);
  }

  async refreshToken(token: string): Promise<LoginResult> {
    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET!
    ) as unknown;
    const payload = decoded as { id: number };

    if (!payload || !payload.id)
      throw new Error('Invalid token. Failed to refresh token.');

    const user = await this.userRepo.findOneBy({ id: payload.id });

    if (!user || user.refreshToken !== token)
      throw new Error('Invalid token. Failed to refresh token.');

    // add token to blacklist
    await this.blacklistToken(token);

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);
    user.refreshToken = refreshToken;
    await this.userRepo.save(user);

    return { success: true, accessToken, refreshToken };
  }

  async updatePassword(): Promise<void> {}

  private async blacklistToken(token: string) {
    const decoded = jwt.decode(token) as { exp: number };
    if (!decoded || !decoded.exp) throw new Error('Invalid token.');

    const expiresIn = decoded.exp * 1000 - Date.now();
    await redisClient.set(token, 'blacklisted', { PX: expiresIn });
  }
}
