import mongoose, { Schema } from "mongoose";

const VaccineSchema = new Schema({
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    dosesRequired: { type: Number, required: true },
    ageGroup: { type: String, required: true } // e.g., "0-5", "18+", etc.
  });

const Vaccine = mongoose.models.Vaccine || mongoose.model('Vaccine', VaccineSchema )
  