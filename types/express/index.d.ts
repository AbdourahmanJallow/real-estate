import { Request } from 'express';
import { User } from '../../src/entities/user.entity';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
