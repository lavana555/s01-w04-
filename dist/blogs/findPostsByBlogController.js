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
exports.findPostsByBlogController = void 0;
const post_db_repository_1 = require("../db/post-db-repository");
const mongodb_1 = require("mongodb");
const findPostsByBlogController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sortBy = 'createdAt', sortDirection = 'desc', pageNumber = '1', pageSize = '10', field = 'blogId' } = req.query;
    const { id } = req.params;
    // Convert pageNumber and pageSize to numbers
    const page = parseInt(pageNumber, 10) || 1;
    const size = parseInt(pageSize, 10) || 10;
    // If field is undefined, default to 'blogId'
    const sortField = field ? field : 'blogId';
    try {
        const blogId = new mongodb_1.ObjectId(id); // Convert `id` to ObjectId
        const isFindPostsByBlog = true;
        const blogs = yield post_db_repository_1.postsRepository.getAllPosts(sortBy, sortDirection, page, size, sortField, blogId.toString(), isFindPostsByBlog);
        res.status(200).json(blogs); // Return the posts as response
    }
    catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.findPostsByBlogController = findPostsByBlogController;
