/**
 * Defines types associated to properties
 */

import { Image } from '../entities/image.entity';
import { User } from '../entities/user.entity';

export enum PropertyStatus {
  AVAILABLE = 'available',
  RENTED = 'rented',
}

export class CreatePropertyDTO {
  name!: string;
  description!: string;
  price!: number;
  location!: string;
  status!: PropertyStatus;
  agent?: User;
  images?: Image[];
}

export class UpdatePropertyDTO {
  name?: string;
  description?: string;
  price?: number;
  location?: string;
  status?: PropertyStatus;
  images?: Image[];
}

export interface ServiceResponse<T> {
  success?: boolean;
  message?: string;
  data: T;
}
