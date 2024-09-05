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
exports.inputPostMiddleware = void 0;
const blog_db_repository_1 = require("../../db/blog-db-repository");
const inputPostMiddleware = (schema, source = 'body', checkBlogExistence = true // Add a flag for controlling blog existence check
) => {
    const resStatus = source === 'params' ? 404 : 400;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { title, shortDescription, content, blogId } = req.body;
        const validateParams = source === 'body'
            ? Object.assign({ title,
                shortDescription,
                content }, (checkBlogExistence && blogId ? { blogId } : {})) : req[source];
        const { error } = schema.validate(validateParams, { abortEarly: false });
        if (error) {
            const validationErrors = error.details.map(err => ({
                message: err.message || null,
                field: err.path[0] || null,
            }));
            if (checkBlogExistence && blogId) {
                const findBlog = yield blog_db_repository_1.blogsRepository.find(blogId);
                if (!findBlog) {
                    validationErrors.push({
                        message: 'Blog not found',
                        field: 'blogId',
                    });
                }
            }
            return res.status(400).json({
                errorsMessages: validationErrors,
            });
        }
        return next();
    });
};
exports.inputPostMiddleware = inputPostMiddleware;
