"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryPostValidate = void 0;
const queryPostValidate = (schema, source = 'body') => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[source], { abortEarly: false });
        if (error) {
            return res.status(400).json({
                errorsMessages: error.details.map(err => ({
                    message: err.message || null,
                    field: err.path.join('.') || null
                }))
            });
        }
        else {
            req[source] = value;
            return next();
        }
    };
};
exports.queryPostValidate = queryPostValidate;
