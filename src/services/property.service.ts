import { AppDataSource } from '../data-source';
import { Between, Repository } from 'typeorm';
import { Property } from '../entities/property.entity';
import { PropertyStatus } from '../enums/property.types';
import { User } from '../entities/user.entity';
import { Image } from '../entities/image.entity';
import { UserService } from './user.service';
import path from 'path';
import fs from 'fs';

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
  private userService: UserService;

  constructor() {
    this.propertyRepo = AppDataSource.getRepository(Property);
    this.imageRepo = AppDataSource.getRepository(Image);
    this.userService = new UserService();
  }

  async findAll(): Promise<ServiceResponse<Property[]>> {
    const properties = await this.propertyRepo.find();

    return {
      success: true,
      data: properties,
    };
  }

  async findNearByProperties(
    userId: number,
    radius: number
  ): Promise<Property[]> {
    const user = await this.userService.findOneById(userId);

    if (!user.coordinates) {
      throw new Error('User location not set.');
    }

    const properties = await this.propertyRepo.find();
    // {
    //   where: {
    //     latitude: Between(user.latitude - radius, user.latitude + radius),
    //     longitude: Between(user.longitude - radius, user.longitude + radius),
    //   },
    // }

    const { lat, lng } = user.coordinates;

    return properties.filter((property) => {
      const distance = this.calulateDistance(
        lat,
        lng,
        property.coordinates?.lat as number,
        property.coordinates?.lng as number
      );

      return distance <= radius;
    });
  }

  private calulateDistance(
    lat1: number,
    long1: number,
    lat2: number,
    long2: number
  ): number {
    const R = 6371; // Radius of the earth in km
    const deltaLat = this.degreeToRadian(lat2 - lat1);
    const deltaLong = this.degreeToRadian(long2 - long1);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(this.degreeToRadian(lat1)) *
        Math.cos(this.degreeToRadian(lat2)) *
        Math.sin(deltaLong / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  private degreeToRadian(deg: number): number {
    return deg * (Math.PI / 180);
  }

  async findById(id: number): Promise<ServiceResponse<Property>> {
    const property = await this.propertyRepo.findOneBy({ id });

    if (!property) throw new Error(`Property ${id} not found.`);

    return { success: true, data: property };
  }

  async create(
    newPropertDTO: CreatePropertyDTO,
    agent?: User,
    files?: Express.Multer.File[]
  ): Promise<ServiceResponse<Property>> {
    return await AppDataSource.transaction(async (transactionManager) => {
      //   data.agent = agent;
      // Perform validations
      if (
        !newPropertDTO.name ||
        !newPropertDTO.description ||
        !newPropertDTO.price ||
        !newPropertDTO.location
      ) {
        throw new Error('Missing required property fields.');
      }

      let newProperty = transactionManager.create(Property, {
        ...newPropertDTO,
        availabilityStatus: PropertyStatus.NOT_AVAILABLE,
      });

      newProperty = await transactionManager.save(newProperty);

      if (files && files.length > 0) {
        console.log('Uploading images...');
        console.log(files);

        const images = files.map((file) => {
          const filename = `${Date.now()}-${file.filename}`;
          // const filePath = path.join(
          //   __dirname,
          //   '../public/uploads/images',
          //   filename
          // );
          // fs.writeFileSync(filePath, file.buffer);

          return this.imageRepo.create({
            url: `/uploads/images/${filename}`,
            filename,
            size: file.size,
            property: newProperty,
          });
        });

        await transactionManager.save(images);
      }

      return { success: true, data: newProperty };
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
