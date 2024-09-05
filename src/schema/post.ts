import Joi from "joi";

export const postScheme = Joi.object({
    title: Joi.string().max(30).trim().required(),
    shortDescription: Joi.string().trim().max(100).required(),
    content: Joi.string().trim().max(1000).required(),
    blogId: Joi.string().trim().required(),
});

export const postSchemeBybBlog = Joi.object({
    title: Joi.string().max(30).trim().required(),
    shortDescription: Joi.string().trim().max(100).required(),
    content: Joi.string().trim().max(1000).required(),
})

export const postIdSchema = Joi.object({
    id:Joi.string().required()
})
