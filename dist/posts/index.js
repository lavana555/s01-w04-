"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const authMidleware_1 = require("../middleware/authMidleware");
const getPostsController_1 = require("./getPostsController");
const createPostController_1 = require("./createPostController");
const findPostController_1 = require("./findPostController");
const updatePostController_1 = require("./updatePostController");
const deletePostController_1 = require("./deletePostController");
const post_1 = require("../schema/post");
const queryValidateMiddleware_1 = require("../middleware/blogs-middleware/queryValidateMiddleware");
const putPostMiddleware_1 = require("../middleware/post-middleware/putPostMiddleware");
const queryPostValidate_1 = require("../middleware/post-middleware/queryPostValidate");
const inputPostMiddleware_1 = require("../middleware/post-middleware/inputPostMiddleware"); // Assuming similar to blogs middleware
exports.postsRouter = (0, express_1.Router)();
exports.postsRouter.get('/', getPostsController_1.getPostsController);
exports.postsRouter.post('/', authMidleware_1.authMiddleware, (0, inputPostMiddleware_1.inputPostMiddleware)(post_1.postScheme, 'body', true), // Validate request body
(0, createPostController_1.createPostController)(false));
exports.postsRouter.get('/:id', (0, queryValidateMiddleware_1.queryValidateMiddleware)(post_1.postIdSchema), // Validate params
findPostController_1.findPostController);
exports.postsRouter.put('/:id', authMidleware_1.authMiddleware, (0, putPostMiddleware_1.putPostMiddleware)(post_1.postIdSchema, 'params'), // Validate params
(0, putPostMiddleware_1.putPostMiddleware)(post_1.postScheme, 'body'), // Validate request body
updatePostController_1.updatePostController);
exports.postsRouter.delete('/:id', authMidleware_1.authMiddleware, (0, queryPostValidate_1.queryPostValidate)(post_1.postIdSchema, 'params'), // Validate params
deletePostController_1.deletePostController);
