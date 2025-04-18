import { Request, Response } from 'express';
import asyncHandler from '../middlewares/asyncHandler';
import { AuthService } from '../services/auth.service';
import { AuthRequest } from '../auth-request';
import redisClient from '../utils/redisClient';
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
  console.log('logout ', req.user);
  const userId = Number(req.user?.id);
  const token = req.headers.authorization?.split(' ')[1];
  console.log('token -w--w---w-w------', token);

  await authService.logout(token!, userId);
  res.clearCookie('refreshToken');

  res.status(200).json({ success: true, message: 'Logged out successfully' });
});

export const refresh = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const token = req.cookies.refreshToken;
    console.log('Cookies ', req.cookies);
    if (!token) {
      res.status(403).json({ message: 'Refresh token not provided.' });
      return;
    }

    // Is token blacklisted?
    if (await redisClient.get(token)) {
      console.log('refresh token is already blacklisted...');
      res
        .status(403)
        .json({ message: 'UnAuthorized: refresh token is blacklisted!' });
      return;
    }

    const { accessToken, refreshToken } = await authService.refreshToken(token);

    res.cookie('refreshToken', refreshToken, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      httpOnly: true,
    });

    res.json({ success: true, accessToken, refreshToken });
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
