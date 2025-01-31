import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../middlewares/asyncHandler';

// @desc        Get properties
// @routes      GET /api/v1/properties
// @access      Public
export const getProperties = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.send('Get properties not implemented');
  }
);

// @desc        Get property by id
// @routes      GET /api/v1/properties/:id
// @access      Public
export const getProperty = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.send('Get property not implemented');
  }
);

// @desc        Create a property
// @routes      POST /api/v1/properties
// @access      Private
export const createProperty = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.send('Create Property Function not implemented');
  }
);

// @desc        Update a property
// @routes      PUT /api/v1/properties/:id
// @access      Private
export const updateProperty = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.send('Update Property Function not implemented');
  }
);

// @desc        Delete a property
// @routes      DELETE /api/v1/properties/:id
// @access      Private
export const deleteProperty = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.send('Delete Property Function not implemented');
  }
);
