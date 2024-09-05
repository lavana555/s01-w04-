"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostController = void 0;
const blog_db_repository_1 = require("../db/blog-db-repository");
const post_db_repository_1 = require("../db/post-db-repository");
const updatePostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, shortDescription, content, blogId } = req.body;
    if (blogId) {
        const findBlog = yield blog_db_repository_1.blogsRepository.find(blogId);
        if (!findBlog) {
            return res.status(400).json({
                errorsMessages: [
                    {
                        message: 'Blog not found',
                        field: "blogId"
                    }
                ]
            });
        }
    }
    const updatedPostData = {
        title,
        shortDescription,
        content,
        blogId,
    };
    const updateResult = yield post_db_repository_1.postsRepository.update(id, updatedPostData);
    if (updateResult.success) {
        return res.status(204).send();
    }
    return res.status(404).json({
        errorsMessages: [
            {
                message: 'Post not found',
                field: "id"
            }
        ]
    });
});
exports.updatePostController = updatePostController;
