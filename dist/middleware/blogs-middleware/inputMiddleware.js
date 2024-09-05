"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputMiddleware = void 0;
const inputMiddleware = (schema, source = 'body') => {
    const resStatus = source === 'params' ? 404 : 400;
    return (req, res, next) => {
        const { name, description, websiteUrl } = req.body;
        const validateParams = source === 'body' ? { name, description, websiteUrl } : req[source];
        const { error } = schema.validate(validateParams, { abortEarly: false });
        if (error) {
            return res.status(resStatus).json({
                errorsMessages: error.details.map(err => ({
                    message: err.message || null,
                    field: err.path[0] || null
                }))
            });
        }
        return next(); // Ensure next() is called if there are no errors
    };
};
exports.inputMiddleware = inputMiddleware;
