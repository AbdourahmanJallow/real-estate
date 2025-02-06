import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../middlewares/asyncHandler';
import { AppDataSource } from '../data-source';
import { Property } from '../entities/property.entity';

const propertyRepo = AppDataSource.getRepository(Property);

/**
 * @desc        Get all properties
 * @routes      GET /api/v1/properties
 * @access      Public
 * @return      list of properties
 */
export const getProperties = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const properties = await propertyRepo.find({
      relations: ['reviews', 'transactions', 'offers', 'viewings'],
    });

    res.status(200).json({
      success: true,
      data: properties,
    });
  }
);

/**
 *  @desc       Get property by id
 *  @routes     GET /api/v1/properties/:id
 *  @access     Public
 */
export const getProperty = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const propertyId = parseInt(req.params.id);

    const property = await propertyRepo.findOne({ where: { id: propertyId } });

    res.status(200).json({ success: true, data: property });
  }
);

/**
 * @desc        Create a property
 * @routes      POST /api/v1/properties
 * @access      Private
 */
export const createProperty = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await AppDataSource.transaction(async (transactionEntityManager) => {
      const propertyRepo = transactionEntityManager.getRepository(Property);
      const property = propertyRepo.create(req.body);

      const result = await AppDataSource.getRepository(Property).save(property);

      res.status(200).json({
        success: true,
        message: 'property created successfully.',
        data: result,
      });
    });
  }
);

/**
 *  @desc       Update a property
 *  @routes     PUT /api/v1/properties/:id
 *  @access     Private
 */
export const updateProperty = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.send('Update Property Function not implemented');
  }
);

/**
 * @desc        Delete a property
 * @routes      DELETE /api/v1/properties/:id
 * @access      Private
 */
export const deleteProperty = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.send('Delete Property Function not implemented');
  }
);

/**
 * @desc        Search properties by location, price range, and property type
 * @routes      GET /api/v1/properties/search
 * @access      Public
 */
export const searchProperties = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.send('Search properties not implemented');
  }
);

/**
 * @desc        Get property reviews
 * @routes      GET /api/v1/properties/:id/reviews
 * @access      Public
 *
 */
