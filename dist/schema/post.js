"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postIdSchema = exports.postSchemeBybBlog = exports.postScheme = void 0;
const joi_1 = __importDefault(require("joi"));
exports.postScheme = joi_1.default.object({
    title: joi_1.default.string().max(30).trim().required(),
    shortDescription: joi_1.default.string().trim().max(100).required(),
    content: joi_1.default.string().trim().max(1000).required(),
    blogId: joi_1.default.string().trim().required(),
});
exports.postSchemeBybBlog = joi_1.default.object({
    title: joi_1.default.string().max(30).trim().required(),
    shortDescription: joi_1.default.string().trim().max(100).required(),
    content: joi_1.default.string().trim().max(1000).required(),
});
exports.postIdSchema = joi_1.default.object({
    id: joi_1.default.string().required()
});
