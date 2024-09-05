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
exports.createPostController = void 0;
const post_db_repository_1 = require("../db/post-db-repository");
const createPostController = (isBlogIdFromReqParams = false) => {
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // If the blog ID should be taken from route parameters, do it here
        const blogId = isBlogIdFromReqParams ? req.params.id : req.body.blogId;
        const { title, shortDescription, content } = req.body;
        const post = {
            shortDescription: shortDescription,
            content: content,
            title: title,
            blogId: blogId,
            blogName: "", // Assuming you'll get the blogName from elsewhere
            createdAt: new Date().toISOString(),
        };
        const result = yield post_db_repository_1.postsRepository.create(post);
        if (result.error) {
            if (result.error === 'Blog not found') {
                return res.status(404).json({
                    errorsMessages: [
                        {
                            message: result.error,
                            field: "blogId",
                        }
                    ]
                });
            }
            return res.status(500).json({ error: result.error });
        }
        return res.status(201).json(result.post);
    });
};
exports.createPostController = createPostController;
