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

    if (!user) {
      throw new ApiError(`Failed to create new user`, 400);
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
      expiresIn: '1hr',
    });
  }
  private generateRefreshToken(user: User): string {
    return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: '1d',
    });
  }

  async logout(userId: number): Promise<void> {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new Error('User not found.');

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

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);
    user.refreshToken = refreshToken;
    await this.userRepo.save(user);

    return { success: true, accessToken, refreshToken };
  }

  async updatePassword(): Promise<void> {}
}
