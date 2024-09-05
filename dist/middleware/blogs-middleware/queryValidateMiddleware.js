"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryValidateMiddleware = void 0;
const queryValidateMiddleware = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.params);
        if (error) {
            return res.status(404).json({
                errorMessage: error.details.map(err => {
                    var _a;
                    return ({
                        message: err.message,
                        field: (_a = err.context) === null || _a === void 0 ? void 0 : _a.key
                    });
                })
            });
        }
        return next();
    };
};
exports.queryValidateMiddleware = queryValidateMiddleware;
