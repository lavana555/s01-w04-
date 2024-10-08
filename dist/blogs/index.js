"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const getBlogsController_1 = require("./getBlogsController");
const postBlogsController_1 = require("./postBlogsController");
const authMidleware_1 = require("../middleware/authMidleware");
const findBlogController_1 = require("./findBlogController");
const updateBlogController_1 = require("./updateBlogController");
const deleteBlogController_1 = require("./deleteBlogController");
const blogs_1 = require("../schema/blogs");
const inputMiddleware_1 = require("../middleware/blogs-middleware/inputMiddleware");
const queryValidateMiddleware_1 = require("../middleware/blogs-middleware/queryValidateMiddleware");
const inputPostMiddleware_1 = require("../middleware/post-middleware/inputPostMiddleware");
const post_1 = require("../schema/post");
const createPostController_1 = require("../posts/createPostController");
const findPostsByBlogController_1 = require("./findPostsByBlogController");
const blogExistsMiddleware_1 = require("../middleware/blogs-middleware/blogExistsMiddleware");
exports.blogsRouter = (0, express_1.Router)();
exports.blogsRouter.get('/', getBlogsController_1.getBlogsController);
exports.blogsRouter.post('/', authMidleware_1.authMiddleware, (0, inputMiddleware_1.inputMiddleware)(blogs_1.bodyBlogSchema, 'body'), postBlogsController_1.postBlogsController);
exports.blogsRouter.post('/:id/posts', authMidleware_1.authMiddleware, (0, inputMiddleware_1.inputMiddleware)(blogs_1.blogIdSchema, 'params'), (0, inputPostMiddleware_1.inputPostMiddleware)(post_1.postSchemeBybBlog, 'body', false), // Validate request body
(0, createPostController_1.createPostController)(true));
exports.blogsRouter.get('/:id', (0, queryValidateMiddleware_1.queryValidateMiddleware)(blogs_1.blogIdSchema), findBlogController_1.findBlogController);
exports.blogsRouter.get('/:id/posts', blogExistsMiddleware_1.blogExistsMiddleware, (0, queryValidateMiddleware_1.queryValidateMiddleware)(blogs_1.blogIdSchema), findPostsByBlogController_1.findPostsByBlogController);
exports.blogsRouter.put('/:id', authMidleware_1.authMiddleware, (0, inputMiddleware_1.inputMiddleware)(blogs_1.blogIdSchema, 'params'), (0, inputMiddleware_1.inputMiddleware)(blogs_1.bodyBlogSchema, 'body'), updateBlogController_1.updateBlogController);
exports.blogsRouter.delete('/:id', authMidleware_1.authMiddleware, (0, queryValidateMiddleware_1.queryValidateMiddleware)(blogs_1.blogIdSchema), deleteBlogController_1.deleteBlogController);
