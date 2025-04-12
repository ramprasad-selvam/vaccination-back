import * as dotenv from "dotenv";
import express, { Application } from "express";
import cors from 'cors';
import helmet from "helmet";
import connectDB from "./config/database";
import { env_config } from "./config/environment";
import { errorHandler } from "./middleware/errorHandler";
import winston from "winston";
import router from "./routes";

dotenv.config();

const app: Application = express();

// Logger configuration
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combinedLogs.log' })
  ]
});

// Add console transport for non-production environments
if (env_config.nodeEnv !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

// Connect to the database
connectDB();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: env_config.corsAccessUrl,
  credentials: true
}));

// Body parser middleware with request body size limit
app.use(express.json({ limit: '1mb' }));

// Logging middleware for HTTP requests
app.use((req, res, next) => {
  logger.info(`HTTP ${req.method} ${req.originalUrl}`);
  next();
});

// API routes
app.use('/api', router);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(parseInt(env_config.port), () => {
  console.log("Server running on :", env_config.port);
});