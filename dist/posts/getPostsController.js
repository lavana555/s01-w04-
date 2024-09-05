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
exports.getPostsController = void 0;
const post_db_repository_1 = require("../db/post-db-repository");
const getPostsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sortBy = 'createdAt', sortDirection = 'asc', pageNumber = '1', pageSize = '10' } = req.query;
    // Convert pageNumber and pageSize to numbers
    const page = parseInt(pageNumber, 10) || 1;
    const size = parseInt(pageSize, 10) || 10;
    try {
        const posts = yield post_db_repository_1.postsRepository.getAllPosts(sortBy, sortDirection, page, size);
        return res.status(200).json(posts);
    }
    catch (error) {
        console.error('Error fetching posts:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getPostsController = getPostsController;
