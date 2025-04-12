import mongoose, { Schema } from "mongoose";

const ProviderSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    organization: { type: String },
    contact: { type: String },
    address: { type: String },
    patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }]
});

export const Provider = mongoose.models.Provider || mongoose.model('Provider', ProviderSchema )