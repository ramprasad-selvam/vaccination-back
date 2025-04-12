import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/interface";

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['male', 'female', 'others'], required: true },
  role: {
    type: String,
    enum: ["user",'doctor', 'patient', 'admin'],
    default: 'user',
    required: true,
  },
});

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);