import { Request, Response } from 'express';
import { User } from '../entities/user.entity';
import jwt from 'jsonwebtoken';
import asyncHandler from '../middlewares/asyncHandler';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export const register = asyncHandler(async (req: Request, res: Response) => {
  const user = authService.registerUser(req.body);

  res.status(201).json({ succes: true, user });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);

  //   const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
  // expiresIn: '1h',
  //   });
  //
  res.status(200).json({ success: true });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.logout();

  res.status(200).json({ success: true });
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.resfreshToken();

  res.status(200).json({ success: true });
});

export const updatePassword = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await authService.updatePassword();

    res.status(200).json({ success: true });
  }
);
