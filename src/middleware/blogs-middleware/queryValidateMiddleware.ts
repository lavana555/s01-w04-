import Joi from "joi";
import {NextFunction, Request, Response} from "express";

export const queryValidateMiddleware = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next:NextFunction) => {
        const {error} = schema.validate(req.params);
        if(error) {
            return res.status(404).json({
                errorMessage: error.details.map(err=>({
                    message: err.message,
                    field: err.context?.key
                }))
            })
        }
       return next ();
    }
}
