"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const mongoURI = process.env.DATABASE;
        if (!mongoURI)
            throw new Error('Missing required database url');
        const conn = await mongoose_1.default.connect(mongoURI);
        console.log(`MongoDB connected successfully: ${conn.connection.host}`);
    }
    catch (error) {
        console.log(`Connection error: ${error.message}`);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
