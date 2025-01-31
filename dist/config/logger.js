"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.protocol} ${req.url}`.cyan.bold);
    next();
};
exports.logger = logger;
