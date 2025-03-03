import { AppDataSource } from '../data-source';
import { Repository } from 'typeorm';
import { Property } from '../entities/property.entity';
import { PropertyStatus } from '../enums/property.types';

import { User } from '../entities/user.entity';
import { Image } from '../entities/image.entity';

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

export class PropertyService {
  private propertyRepo: Repository<Property>;
  private imageRepo: Repository<Image>;

  constructor() {
    this.propertyRepo = AppDataSource.getRepository(Property);
    this.imageRepo = AppDataSource.getRepository(Image);
  }

  async findAll(): Promise<ServiceResponse<Property[]>> {
    const properties = await this.propertyRepo.find();

    return {
      success: true,
      data: properties,
    };
  }

  async findById(id: number): Promise<ServiceResponse<Property>> {
    const property = await this.propertyRepo.findOneBy({ id });

    if (!property) throw new Error(`Property ${id} not found.`);

    return { success: true, data: property };
  }

  async create(
    data: CreatePropertyDTO,
    agent?: User,
    files?: Express.Multer.File[]
  ): Promise<ServiceResponse<Property>> {
    return await AppDataSource.transaction(async (transactionManager) => {
      //   data.agent = agent;
      // Perform validations
      if (!data.name || !data.description || !data.price || !data.location) {
        throw new Error('Missing required property fields.');
      }

      const property = transactionManager.create(Property, {
        ...data,
        status: PropertyStatus.AVAILABLE,
      });

      const result = await transactionManager.save(property);

      if (files && files.length > 0) {
        const images = files.map((file) => {
          const filename = `${Date.now()}-${file.filename}`;

          return this.imageRepo.create({
            url: `/uploads/images/${filename}`,
            filename,
            size: file.size,
            property: property,
          });
        });

        await transactionManager.save(images);
      }

      return { success: true, data: result };
    });
  }

  async update(
    id: number,
    data: UpdatePropertyDTO
  ): Promise<ServiceResponse<Property>> {
    const property = await this.propertyRepo.findOneBy({ id: id });

    if (!property) throw new Error(`Property ${id} not found`);

    Object.assign(property, data);

    const updated = await this.propertyRepo.save(property);

    return { success: true, data: updated };
  }

  async delete(id: number): Promise<ServiceResponse<Property>> {
    const property = await this.propertyRepo.findOneBy({ id: id });

    if (!property) throw new Error(`Property ${id} not found.`);

    const result = await this.propertyRepo.remove(property);

    return { success: true, data: result };
  }
}
