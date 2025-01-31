import { Router } from 'express';
import {
  getProperties,
  createProperty,
  deleteProperty,
  updateProperty,
  getProperty,
} from '../controllers/propertyController';

const router = Router();

router.route('/').get(getProperties).post(createProperty);

router
  .route('/:id')
  .get(getProperty)
  .put(updateProperty)
  .delete(deleteProperty);

export default router;
