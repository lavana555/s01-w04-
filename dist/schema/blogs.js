"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogIdSchema = exports.bodyBlogSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.bodyBlogSchema = joi_1.default.object({
    name: joi_1.default.string().max(15).trim().required(),
    description: joi_1.default.string().max(500).trim().required(),
    websiteUrl: joi_1.default.string()
        .max(100)
        .trim()
        .pattern(new RegExp('^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$'))
        .required()
});
exports.blogIdSchema = joi_1.default.object({
    id: joi_1.default.string().required()
});
