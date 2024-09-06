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
exports.resetController = void 0;
const blog_db_repository_1 = require("../db/blog-db-repository");
const post_db_repository_1 = require("../db/post-db-repository");
const resetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield blog_db_repository_1.blogsRepository.resetBlogs();
    yield post_db_repository_1.postsRepository.resetPosts();
    // db.blogs = []; // Очищаем массив видео
    // db.posts = []; // Очищаем массив видео
    res.status(204).send(); // Отправляем статус 204 без тела ответа
});
exports.resetController = resetController;
