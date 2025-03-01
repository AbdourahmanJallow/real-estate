import { Router } from 'express';
import {
  getProperties,
  createProperty,
  deleteProperty,
  updateProperty,
  getProperty,
} from '../controllers/property.controller';
import { authenticateJWT } from '../middlewares/authMiddleware';
/**
 * TODO: allow only authenticated users to create, update, and delete properties
 */

const router = Router();

router.route('/').get(getProperties).post(createProperty);

router
  .route('/:id')
  .get(getProperty)
  .put(updateProperty)
  .delete(deleteProperty);

export default router;
