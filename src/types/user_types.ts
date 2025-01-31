import { Document } from 'mongoose';

// export enum UserRole {
//     TENANT: "tenant",
// }
export interface IUSER extends Document {
  name: string;
  email: string;
  password: string;
  role: 'Tenant' | 'Agent' | 'Admin';
}
