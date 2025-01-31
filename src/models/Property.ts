// import mongoose, { Schema } from 'mongoose';
// import { IProperty } from '../types/propertyTypes';

// const propertySchema = new Schema<IProperty>(
//   {
//     name: {
//       type: String,
//       required: [true, 'Please add a property name.'],
//     },
//     description: {
//       type: String,
//       required: [true, 'Please add a property description.'],
//     },
//     price: {
//       type: Number,
//       required: [true, 'Please add a price for the property.'],
//     },
//     location: {
//       type: String,
//       required: [true, 'Please add a location for the property.'],
//     },
//     images: {
//       type: [String],
//       default: [],
//     },
//     status: {
//       type: String,
//       enum: ['Available', 'Rented'],
//     },
//     //   agent: {
//     //     type: Schema.Types.ObjectId,
//     //     ref: 'User',
//     //     required: [true, 'Please add an agent for the property.'],
//     //   },
//   },
//   { timestamps: true }
// );

// export default mongoose.model<IProperty>('Property', propertySchema);
