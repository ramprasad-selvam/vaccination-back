import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/interface";
import { timeStamp } from "console";


// const patientDetails = {
//   vaccinations : [],
//   allergies : [],
//   pastVaccinations : 
// }

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user",'provider', 'patient',],
    default: 'user',
    required: true,
  },


});

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);