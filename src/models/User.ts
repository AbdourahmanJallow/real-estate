// import mongoose, { Schema } from 'mongoose';
// import { IUSER } from '../types/userTypes';

// const userSchema = new Schema<IUSER>(
//   {
//     name: {
//       type: String,
//       required: [true, 'Please add a name.'],
//     },
//     email: {
//       type: String,
//       required: [true, 'Please add an email.'],
//       unique: true,
//       match: [
//         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//         'Please add a valid email address',
//       ],
//     },
//     password: {
//       type: String,
//       required: [true, 'Please add a password.'],
//       minlength: 8,
//       select: false,
//     },
//     role: {
//       type: String,
//       enum: ['Tenant', 'Agent', 'Admin'],
//       default: 'Tenant',
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model<IUSER>('User', userSchema);
