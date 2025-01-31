"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = require("./config/db");
const port = process.env.PORT || 8800;
(0, db_1.connectDB)();
mongoose_1.default.connection.on('error', (error) => {
    console.log(`1. 🔥 Common Error caused issue → : check your config.env file first and add your mongodb url`);
    console.error(`2. 🚫 Error → : ${error.message}`);
});
const app_1 = __importDefault(require("./app"));
app_1.default.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
