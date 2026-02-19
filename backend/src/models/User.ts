/**
 * User Model (Mongoose Schema)
 * TODO: Implement User schema with email, password, firstName, lastName, role
 */

import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '@ligue-sportive/shared';

export interface IUserDocument extends IUser, Document {}

const UserSchema = new Schema<IUserDocument>({
  // TODO: Define schema fields
});

export const User = mongoose.model<IUserDocument>('User', UserSchema);
