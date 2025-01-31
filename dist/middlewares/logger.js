"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logger = (req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.protocol} ${req.originalUrl}`.cyan.bold);
    next();
};
exports.logger = logger;
