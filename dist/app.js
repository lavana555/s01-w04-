"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const settings_1 = require("./settings");
const blogs_1 = require("./blogs");
const reset_1 = require("./reset");
const resetController_1 = require("./reset/resetController");
const posts_1 = require("./posts");
exports.app = (0, express_1.default)(); // создать приложение
exports.app.use(express_1.default.json()); // создание свойств-объектов body и query во всех реквестах
exports.app.use((0, cors_1.default)()); // разрешить любым фронтам делать запросы на наш бэк
exports.app.get('/', (req, res) => {
    res.status(200).json({ version: '1.0.4' });
});
exports.app.use(settings_1.SETTINGS.PATH.TESTING, reset_1.resetRouter);
exports.app.delete(settings_1.SETTINGS.PATH.TESTING, resetController_1.resetController);
exports.app.use(settings_1.SETTINGS.PATH.BLOGS, blogs_1.blogsRouter);
exports.app.use(settings_1.SETTINGS.PATH.POSTS, posts_1.postsRouter);
