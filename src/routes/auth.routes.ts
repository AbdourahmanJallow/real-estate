import { Router } from 'express';
import {
  login,
  logout,
  refresh,
  register,
} from '../controllers/auth.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token', refresh);

export default router;
