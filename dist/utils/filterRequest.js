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
exports.filterRequest = void 0;
const helper_1 = require("./helper");
const filterRequest = (params, repo) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchNameTerm, sortBy, sortDirection, pageNumber, pageSize, field, isFindPostsByBlog } = params;
    try {
        let filter = {};
        if (isFindPostsByBlog && field) {
            filter[field] = searchNameTerm;
        }
        else {
            filter = searchNameTerm && field ? { [field]: { $regex: searchNameTerm, $options: 'i' } } : {};
        }
        const sortCriteria = [[sortBy, sortDirection]];
        const skip = (pageNumber - 1) * pageSize;
        const limit = pageSize;
        const totalCount = yield repo.countDocuments(filter);
        const elements = yield repo
            .find(filter)
            .sort(sortCriteria)
            .skip(skip)
            .limit(limit)
            .toArray();
        const pagesCount = Math.ceil(totalCount / pageSize);
        const mapElements = elements.map(helper_1.transformPostId);
        return {
            pagesCount,
            page: pageNumber,
            pageSize,
            totalCount,
            items: mapElements,
        };
    }
    catch (e) {
        console.error('Error fetching elements:', e);
        return {
            pagesCount: 0,
            page: pageNumber,
            pageSize,
            totalCount: 0,
            items: [],
        };
    }
});
exports.filterRequest = filterRequest;
