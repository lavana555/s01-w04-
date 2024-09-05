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
exports.findPostController = void 0;
const post_db_repository_1 = require("../db/post-db-repository");
const findPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const findPost = yield post_db_repository_1.postsRepository.find(req.params.id);
    if (findPost) {
        return res.status(200).json(findPost);
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
exports.findPostController = findPostController;
