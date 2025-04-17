import { Request, Response } from 'express';
import asyncHandler from '../middlewares/asyncHandler';
import { AuthService } from '../services/auth.service';
import { AuthRequest } from '../auth-request';
// import { AuthRequest } from '../auth-request';

const authService = new AuthService();

export const register = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.registerUser(req.body);

  res.status(201).json({ success: true, user });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { success, accessToken, refreshToken } = await authService.login(
    req.body
  );

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.status(200).json({ success, accessToken, refreshToken });
});

export const logout = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = Number(req.user?.id);

  await authService.logout(userId);
  res.clearCookie('refreshToken');

  res.status(200).json({ success: true, message: 'Logged out successfully' });
});

export const refresh = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      res.status(403).json({ message: 'Refresh token not provided.' });
      return;
    }

    const newAccessToken = await authService.refreshToken(refreshToken);

    res.json({ success: true, accessToken: newAccessToken });
  }
);

export const updatePassword = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await authService.updatePassword();

    res.status(200).json({ success: true, result });
  }
);

// export const uploadProfilePicture = [
//   asyncHandler(async (req: Request, res: Response) => {}),
// ];
