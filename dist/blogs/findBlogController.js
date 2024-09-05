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
exports.findBlogController = void 0;
const blog_db_repository_1 = require("../db/blog-db-repository");
const findBlogController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const findValue = yield blog_db_repository_1.blogsRepository.find(req.params.id);
    if (findValue) {
        return res.status(200).json(findValue);
    }
    else {
        return res.status(404).json({
            errorMessage: [
                {
                    message: 'Blog not found',
                    field: "id"
                }
            ]
        });
    }
});
exports.findBlogController = findBlogController;
