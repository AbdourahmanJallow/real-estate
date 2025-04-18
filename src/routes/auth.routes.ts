import { Router } from 'express';
import {
  login,
  logout,
  refresh,
  register,
} from '../controllers/auth.controller';
import authenticateJWT from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refresh);

router.post('/logout', authenticateJWT, logout);
export default router;
