"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putPostMiddleware = void 0;
const blog_db_repository_1 = require("../../db/blog-db-repository");
const putPostMiddleware = (schema, source = 'body') => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { title, shortDescription, content, blogId } = req.body;
        const validateParams = source === 'body' ? { title, shortDescription, content, blogId } : req[source];
        const { error, value } = schema.validate(validateParams, { abortEarly: false });
        let errorsMessages = [];
        if (error) {
            errorsMessages = error.details.map(err => {
                var _a;
                return ({
                    message: err.message || null,
                    field: ((_a = err.context) === null || _a === void 0 ? void 0 : _a.key) || null
                });
            });
        }
        if (value.blogId) {
            const findBlog = yield blog_db_repository_1.blogsRepository.find(value.blogId);
            if (!findBlog) {
                errorsMessages.push({
                    message: 'Blog not found',
                    field: "blogId"
                });
            }
        }
        if (errorsMessages.length > 0) {
            return res.status(400).json({ errorsMessages });
        }
        return next();
    });
};
exports.putPostMiddleware = putPostMiddleware;
