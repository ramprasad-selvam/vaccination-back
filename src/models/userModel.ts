import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/interface";


const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['provider', 'patient',],
    default: 'patient',
    required: true,
  },


});

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);