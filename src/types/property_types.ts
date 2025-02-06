import { Document, Schema } from 'mongoose';

export interface IProperty extends Document {
  name: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  status: 'Available' | 'Rented';
  agent: Schema.Types.ObjectId;
}

export enum PropertyStatus {
  Available = 'available',
  Rented = 'rented',
}
