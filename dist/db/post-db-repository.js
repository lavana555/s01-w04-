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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = void 0;
const db_1 = require("./db");
const blog_db_repository_1 = require("./blog-db-repository");
const mongodb_1 = require("mongodb");
const filterRequest_1 = require("../utils/filterRequest");
const transformPostId = (post) => {
    const { _id } = post, rest = __rest(post, ["_id"]);
    return Object.assign({ id: _id === null || _id === void 0 ? void 0 : _id.toString() }, rest);
};
exports.postsRepository = {
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield blog_db_repository_1.blogsRepository.find(input.blogId.toString());
            if (!blog) {
                return { error: 'Blog not found' };
            }
            const newPost = Object.assign(Object.assign({}, input), { blogName: blog.name, createdAt: new Date().toISOString() });
            try {
                const result = yield db_1.postCollection.insertOne(newPost);
                if (result.insertedId) {
                    const createdPost = yield this.find(result.insertedId.toString());
                    if (createdPost) {
                        return { post: transformPostId(createdPost) };
                    }
                    else {
                        return { error: 'Error retrieving created post' };
                    }
                }
                else {
                    return { error: 'Error creating post' };
                }
            }
            catch (e) {
                console.error('Error creating post:', e);
                return { error: 'Error creating post' };
            }
        });
    },
    find(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield db_1.postCollection.findOne({ _id: new mongodb_1.ObjectId(postId) });
                return post ? transformPostId(post) : null;
            }
            catch (e) {
                console.error('Error finding post:', e);
                return null;
            }
        });
    },
    findIndex(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield this.find(postId);
                if (!post)
                    return -1;
                return 0; // Placeholder for the "index" if needed
            }
            catch (e) {
                console.error('Error finding index of post:', e);
                return -1;
            }
        });
    },
    update(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateResult = yield db_1.postCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: updates });
                if (updateResult.modifiedCount > 0) {
                    return { success: true };
                }
                else {
                    return { success: false, error: "Post not found or no changes made" };
                }
            }
            catch (e) {
                console.error('Error updating post:', e);
                return { success: false, error: 'Error updating post' };
            }
        });
    },
    delete(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteResult = yield db_1.postCollection.deleteOne({ _id: new mongodb_1.ObjectId(postId) });
                if (deleteResult.deletedCount > 0) {
                    return { success: true };
                }
                else {
                    return { success: false, error: "Post not found" };
                }
            }
            catch (e) {
                console.error('Error deleting post:', e);
                return { success: false, error: 'Error deleting post' };
            }
        });
    },
    getAllPosts(sortBy, sortDirection, pageNumber, pageSize, field, searchNameTerm, isFindPostsByBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, filterRequest_1.filterRequest)({ searchNameTerm, sortBy, sortDirection, pageNumber, pageSize, field, isFindPostsByBlog }, db_1.postCollection);
        });
    },
    resetPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // This will delete all documents in the blogCollection
                const deleteResult = yield db_1.postCollection.deleteMany({});
                if (deleteResult.deletedCount > 0) {
                    return { success: true };
                }
                else {
                    return { success: false, error: "No blogs to delete" };
                }
            }
            catch (err) {
                console.error('Error resetting blogs:', err);
                return { success: false, error: 'Error resetting blogs' };
            }
        });
    }
};
