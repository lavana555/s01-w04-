import { BlogTypes } from "./blog-types";
import {blogCollection, postCollection} from "./db";
import {ObjectId} from "mongodb";
import {PostTypes} from "./post-types";
import {filterRequest} from "../utils/filterRequest";

const transformBlogId = (blog: any): BlogTypes => {
    const { _id, ...rest } = blog;
    return { id: _id?.toString(), ...rest };
};

export const blogsRepository = {
    async create(input: Omit<BlogTypes, 'id' | 'createdAt' | 'isMembership'>): Promise<{ error?: string; blog?: BlogTypes }> {
        const newBlog: Omit<BlogTypes, 'id'> = {
            ...input,
            createdAt: new Date().toISOString(),
            isMembership: false,
        };
        try {
            const result = await blogCollection.insertOne(newBlog);
            console.log("result", result);
            if (result.insertedId) {
                const createdBlog = await this.find(result.insertedId.toString());
                if (createdBlog) {
                    return { blog: transformBlogId(createdBlog) };
                } else {
                    return { error: 'Error retrieving created blog' };
                }
            } else {
                return { error: 'Error creating blog' };
            }
        } catch (e) {
            console.error('Error creating blog:', e);
            return { error: 'Error creating blog' };
        }
    },

    async find(blogId: string): Promise<BlogTypes | null> {
        try {
            const blog = await blogCollection.findOne({ _id: new ObjectId(blogId) });
            return blog ? transformBlogId(blog) : null;
        } catch (e) {
            console.error('Error finding blog:', e);
            return null;
        }
    },

    async findIndex(blogId: string): Promise<number> {
        try {
            const blog = await this.find(blogId);
            if (!blog) return -1;
            return 0; // Placeholder for the "index" if needed
        } catch (e) {
            console.error('Error finding index of blog:', e);
            return -1;
        }
    },

    async update(id: string, updates: Omit<BlogTypes, 'id'>): Promise<{ success: boolean; error?: string }> {
        try {
            const updateResult = await blogCollection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
            if (updateResult.modifiedCount > 0) {
                return { success: true };
            } else {
                return { success: false, error: "Blog not found or no changes made" };
            }
        } catch (e) {
            console.error('Error updating blog:', e);
            return { success: false, error: 'Error updating blog' };
        }
    },

    async delete(blogId: string): Promise<{ success: boolean; error?: string }> {
        try {
            const deleteResult = await blogCollection.deleteOne({ _id: new ObjectId(blogId) });
            if (deleteResult.deletedCount > 0) {
                return { success: true };
            } else {
                return { success: false, error: "Blog not found" };
            }
        } catch (e) {
            console.error('Error deleting blog:', e);
            return { success: false, error: 'Error deleting blog' };
        }
    },

    async getAllBlogs( searchNameTerm: string,
                       sortBy: string,
                       sortDirection: string,
                       field: string,
                       pageNumber: number,
                       pageSize: number): Promise<{ pagesCount: number;
        page: number;
        pageSize: number;
        totalCount: number;
        items: BlogTypes[];}> {
        return await filterRequest({searchNameTerm, sortBy, sortDirection, pageNumber, pageSize, field}, blogCollection)

    },
};
