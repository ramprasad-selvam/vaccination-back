import mongoose, { Schema } from "mongoose";


const PatientSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dob: { type: Date },
  gender: { type: String },
  address: { type: String },
  contact: { type: String },
  vaccineRecords: [{
    vaccineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vaccine' },
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' },
    doseNumber: { type: Number },
    dateAdministered: { type: Date },
    notes: { type: String },
    status: { type: String, enum: ['scheduled', 'completed'], required: true }
  }]
});


export const Patient = mongoose.models.Patient || mongoose.model("Patient", PatientSchema);
