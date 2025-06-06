import { Request, Response } from 'express';
import asyncHandler from '../middlewares/asyncHandler';
import { PropertyService } from '../services/property.service';
import { AuthRequest } from '../auth-request';
import { User } from '../entities/user.entity';

const propertyService = new PropertyService();

/**
 * @description       Get all properties
 * @routes            GET /api/v1/properties
 * @access            Public
 * @return            list of properties
 */
export const getProperties = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const result = await propertyService.getAllProperties();

    res.status(200).json(result);
  }
);

/**
 *  @description        Get property by id
 *  @routes             GET /api/v1/properties/:id
 *  @access             Public
 */
export const getProperty = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const result = await propertyService.findById(parseInt(req.params.id));

    res.status(200).json(result);
  }
);

/**
 * @description         Create a property
 * @routes              POST /api/v1/properties
 * @access              Private
 */
export const createProperty = asyncHandler(
  async (req: AuthRequest, res: Response): Promise<void> => {
    const user = req.user as User;
    console.log('--------user------', user);
    const newProperty = await propertyService.create(
      req.body,
      user,
      req.files as Express.Multer.File[]
    );

    res.status(200).json(newProperty);
  }
);

/**
 *  @description       Update a property
 *  @routes            PUT /api/v1/properties/:id
 *  @access            Private
 */
export const updateProperty = asyncHandler(
  async (req: AuthRequest, res: Response): Promise<void> => {
    const response = await propertyService.update(
      parseInt(req.params.id),
      req.body
    );

    res.status(200).json(response);
  }
);

/**
 * @@description        Delete a property
 * @routes              DELETE /api/v1/properties/:id
 * @access              Private
 */
export const deleteProperty = asyncHandler(
  async (req: AuthRequest, res: Response): Promise<void> => {
    const response = await propertyService.delete(parseInt(req.params.id));

    res.status(200).json(response);
  }
);

/**
 * @@description        Search properties by location, price range, and property type
 * @routes              GET /api/v1/properties/search
 * @access              Public
 */
export const searchProperties = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.send('Search properties not implemented');
  }
);
