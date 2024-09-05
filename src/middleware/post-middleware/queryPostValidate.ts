import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const queryPostValidate = (schema: Joi.ObjectSchema, source: 'body' | 'params' | 'query' = 'body') => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req[source], { abortEarly: false });

        if (error) {
            return res.status(400).json({
                errorsMessages: error.details.map(err => ({
                    message: err.message || null,
                    field: err.path.join('.') || null
                }))
            });
        } else {
            req[source] = value;
            return next();
        }
    };
};
