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
exports.getBlogsController = void 0;
const blog_db_repository_1 = require("../db/blog-db-repository");
const getBlogsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchNameTerm = null, sortBy = 'createdAt', sortDirection = 'asc', pageNumber = '1', pageSize = '10', field = 'name' } = req.query;
    // Convert pageNumber and pageSize to numbers
    const page = parseInt(pageNumber, 10) || 1;
    const size = parseInt(pageSize, 10) || 10;
    const blogs = yield blog_db_repository_1.blogsRepository.getAllBlogs(searchNameTerm, sortBy, sortDirection, field, page, size);
    res
        .status(200)
        .json(blogs); // отдаём видео в качестве ответа
});
exports.getBlogsController = getBlogsController;
