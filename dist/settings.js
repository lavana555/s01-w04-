"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADMIN_AUTH = exports.SETTINGS = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.SETTINGS = {
    PORT: process.env.PORT || 5002,
    PATH: {
        TESTING: '/testing/all-data',
        BLOGS: '/blogs',
        POSTS: '/posts',
    },
    BLOG_COLLECTION_NAME: 'Blogs',
    POST_COLLECTION_NAME: 'Posts'
};
exports.ADMIN_AUTH = 'admin:qwerty';
