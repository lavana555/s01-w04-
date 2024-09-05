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
exports.blogsRepository = void 0;
const db_1 = require("./db");
const mongodb_1 = require("mongodb");
const filterRequest_1 = require("../utils/filterRequest");
const transformBlogId = (blog) => {
    const { _id } = blog, rest = __rest(blog, ["_id"]);
    return Object.assign({ id: _id === null || _id === void 0 ? void 0 : _id.toString() }, rest);
};
exports.blogsRepository = {
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = Object.assign(Object.assign({}, input), { createdAt: new Date().toISOString(), isMembership: false });
            try {
                const result = yield db_1.blogCollection.insertOne(newBlog);
                console.log("result", result);
                if (result.insertedId) {
                    const createdBlog = yield this.find(result.insertedId.toString());
                    if (createdBlog) {
                        return { blog: transformBlogId(createdBlog) };
                    }
                    else {
                        return { error: 'Error retrieving created blog' };
                    }
                }
                else {
                    return { error: 'Error creating blog' };
                }
            }
            catch (e) {
                console.error('Error creating blog:', e);
                return { error: 'Error creating blog' };
            }
        });
    },
    find(blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blog = yield db_1.blogCollection.findOne({ _id: new mongodb_1.ObjectId(blogId) });
                return blog ? transformBlogId(blog) : null;
            }
            catch (e) {
                console.error('Error finding blog:', e);
                return null;
            }
        });
    },
    findIndex(blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blog = yield this.find(blogId);
                if (!blog)
                    return -1;
                return 0; // Placeholder for the "index" if needed
            }
            catch (e) {
                console.error('Error finding index of blog:', e);
                return -1;
            }
        });
    },
    update(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateResult = yield db_1.blogCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: updates });
                if (updateResult.modifiedCount > 0) {
                    return { success: true };
                }
                else {
                    return { success: false, error: "Blog not found or no changes made" };
                }
            }
            catch (e) {
                console.error('Error updating blog:', e);
                return { success: false, error: 'Error updating blog' };
            }
        });
    },
    delete(blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteResult = yield db_1.blogCollection.deleteOne({ _id: new mongodb_1.ObjectId(blogId) });
                if (deleteResult.deletedCount > 0) {
                    return { success: true };
                }
                else {
                    return { success: false, error: "Blog not found" };
                }
            }
            catch (e) {
                console.error('Error deleting blog:', e);
                return { success: false, error: 'Error deleting blog' };
            }
        });
    },
    getAllBlogs(searchNameTerm, sortBy, sortDirection, field, pageNumber, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, filterRequest_1.filterRequest)({ searchNameTerm, sortBy, sortDirection, pageNumber, pageSize, field }, db_1.blogCollection);
        });
    },
};
