import dotenv from "dotenv";
dotenv.config();

export const AMQP_URL = "amqp://guest:guest@52.14.72.207:8050";
export const JWT_SECRET = process.env.JWT_SECRET || "hellothere";
export const AUTHENTICATION_ERROR_MESSAGE = "Wrong Credentials";
