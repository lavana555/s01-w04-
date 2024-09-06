import { Request, Response } from 'express';
import { db } from '../db/db';
import {blogsRepository} from "../db/blog-db-repository";
import {postsRepository} from "../db/post-db-repository";

export const resetController = async (req: Request, res: Response<any>) => {
    await blogsRepository.resetBlogs();
    await postsRepository.resetPosts();
    // db.blogs = []; // Очищаем массив видео
    // db.posts = []; // Очищаем массив видео
    res.status(204).send(); // Отправляем статус 204 без тела ответа
};
