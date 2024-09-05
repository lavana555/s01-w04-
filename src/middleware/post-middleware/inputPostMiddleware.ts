import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import { blogsRepository } from "../../db/blog-db-repository";

export const inputPostMiddleware = (
    schema: Joi.ObjectSchema,
    source: 'body' | 'params' | 'query' = 'body',
    checkBlogExistence = true  // Add a flag for controlling blog existence check
) => {
    const resStatus = source === 'params' ? 404 : 400;

    return async (req: Request, res: Response, next: NextFunction) => {
        const { title, shortDescription, content, blogId } = req.body;

        const validateParams = source === 'body'
            ? {
                title,
                shortDescription,
                content,
                ...(checkBlogExistence && blogId ? { blogId } : {})
            }
            : req[source];

        const { error } = schema.validate(validateParams, { abortEarly: false });

        if (error) {
            const validationErrors = error.details.map(err => ({
                message: err.message || null,
                field: err.path[0] || null,
            }));

            if (checkBlogExistence && blogId) {
                const findBlog = await blogsRepository.find(blogId);
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
    };
};
