"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetController = void 0;
const db_1 = require("../db/db");
const resetController = (req, res) => {
    db_1.db.blogs = []; // Очищаем массив видео
    db_1.db.posts = []; // Очищаем массив видео
    res.status(204).send(); // Отправляем статус 204 без тела ответа
};
exports.resetController = resetController;
