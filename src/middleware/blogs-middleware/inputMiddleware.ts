import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const inputMiddleware = (schema: Joi.ObjectSchema, source: 'body' | 'params' | 'query' = 'body') => {
    const resStatus = source === 'params' ? 404 : 400;
    return (req: Request, res: Response, next: NextFunction) => {
        const { name, description, websiteUrl } = req.body;
        const validateParams = source === 'body' ? {name, description, websiteUrl} : req[source];

        const { error } = schema.validate(validateParams, { abortEarly: false });

        if (error) {
            return res.status(resStatus).json({
                errorsMessages: error.details.map(err => ({
                    message: err.message || null,
                    field: err.path[0] || null
                }))
            });
        }
       return next();  // Ensure next() is called if there are no errors
    };
};
