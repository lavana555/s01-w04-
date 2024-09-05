import Joi from "joi";

export const bodyBlogSchema = Joi.object({
    name: Joi.string().max(15).trim().required(),
    description: Joi.string().max(500).trim().required(),
    websiteUrl: Joi.string()
        .max(100)
        .trim()
        .pattern(new RegExp('^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$'))
        .required()
});

export const blogIdSchema = Joi.object({
    id: Joi.string().required()
});
