import { Router } from "express";
import { getBlogsController } from "./getBlogsController";
import { postBlogsController } from "./postBlogsController";
import { authMiddleware } from "../middleware/authMidleware";
import { findBlogController } from "./findBlogController";
import { updateBlogController } from "./updateBlogController";
import { deleteBlogController } from "./deleteBlogController";
import {blogIdSchema, bodyBlogSchema} from "../schema/blogs";
import {inputMiddleware} from "../middleware/blogs-middleware/inputMiddleware";
import {queryValidateMiddleware} from "../middleware/blogs-middleware/queryValidateMiddleware";
import {inputPostMiddleware} from "../middleware/post-middleware/inputPostMiddleware";
import {postScheme, postSchemeBybBlog} from "../schema/post";
import {createPostController} from "../posts/createPostController";
import {findPostsByBlogController} from "./findPostsByBlogController";

export const blogsRouter = Router();

blogsRouter.get('/', getBlogsController);

blogsRouter.post('/',
    authMiddleware,
    inputMiddleware(bodyBlogSchema, 'body'),
    postBlogsController,
);

blogsRouter.post('/:id/posts',
    authMiddleware,
    inputMiddleware(blogIdSchema, 'params'),
    inputPostMiddleware(postSchemeBybBlog, 'body', false), // Validate request body
    createPostController(true),
);

blogsRouter.get('/:id',
    queryValidateMiddleware(blogIdSchema),
    findBlogController,
);
blogsRouter.get('/:id/posts',
    inputMiddleware(blogIdSchema, 'params'),
    findPostsByBlogController,
);

blogsRouter.put('/:id',
    authMiddleware,
    inputMiddleware(blogIdSchema, 'params'),
    inputMiddleware(bodyBlogSchema, 'body'),
    updateBlogController
);

blogsRouter.delete('/:id',
    authMiddleware,
    queryValidateMiddleware(blogIdSchema),
    deleteBlogController
);
