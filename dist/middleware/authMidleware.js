"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const settings_1 = require("../settings");
const authMiddleware = (req, res, next) => {
    const validAuthString = Buffer.from(settings_1.ADMIN_AUTH).toString('base64');
    const authHeader = req.headers['authorization']; // 'Basic XXX'
    if (!authHeader) {
        return res.status(401).json({ message: 'Anutorizated' });
    }
    if (`Basic ${validAuthString}` !== authHeader) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    return next();
};
exports.authMiddleware = authMiddleware;
