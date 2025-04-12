import * as dotenv from "dotenv"

dotenv.config();

export const env_config = {
    nodeEnv : process.env.NODE_ENV,
    mongoUrl :  process.env.MONGO_URI!,
    port : process.env.PORT!,
    jwtSecret : process.env.JWT_SECRET!,
    dbName : process.env.DB_NAME,
    jwtExpiry : process.env.JWT_EXPIRY!,
    corsAccessUrl : process.env.CORS_ACCESS_URL!
}