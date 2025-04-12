import mongoose from "mongoose"
import { env_config } from '../config/environment'
import '../models/userModel'
 
const connectDB = async (retries = 5, delay = 5000) => {
    while (retries) {
        try {
            const conn = await mongoose.connect(env_config.mongoUrl, { dbName: env_config.dbName });
            console.log(`MongoDB connected: ${conn.connection.host}`);
            return;
        } catch (error) {
            console.error("Error connecting database", error);
            retries -= 1;
            console.log(`Retries left: ${retries}`);
            await new Promise(res => setTimeout(res, delay));
        }
    }
    throw new Error("Failed to connect to the database after multiple attempts");
};
 
export default connectDB;