import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import {blogsRepository} from "../../db/blog-db-repository";

export const putPostMiddleware = (schema: Joi.ObjectSchema, source: 'body' | 'params' | 'query' = 'body') => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { title, shortDescription, content, blogId } = req.body;
        const validateParams = source === 'body' ? { title, shortDescription, content, blogId } : req[source];
        const { error, value } = schema.validate(validateParams, { abortEarly: false });

        let errorsMessages:any = [];

        if (error) {
            errorsMessages = error.details.map(err => ({
                message: err.message || null,
                field: err.context?.key || null
            }));
        }

        if (value.blogId) {
            const findBlog = await blogsRepository.find(value.blogId);
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
    };
};
