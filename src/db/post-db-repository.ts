import { PostTypes } from "./post-types";
import { postCollection } from "./db";
import { blogsRepository } from "./blog-db-repository";
import {ObjectId, SortDirection} from "mongodb";
import {filterRequest} from "../utils/filterRequest";

const transformPostId = (post: any): PostTypes => {
    const { _id, ...rest } = post;
    return { id: _id?.toString(), ...rest };
};

export const postsRepository = {
    async create(input: Omit<PostTypes, 'id' | 'createdAt' | 'isMembership'>): Promise<{ error?: string; post?: PostTypes }> {
        const blog = await blogsRepository.find(input.blogId.toString());

        if (!blog) {
            return { error: 'Blog not found' };
        }

        const newPost: Omit<PostTypes, 'id'> = {
            ...input,
            blogName: blog.name,
            createdAt: new Date().toISOString(),
        };

        try {
            const result = await postCollection.insertOne(newPost);
            if (result.insertedId) {
                const createdPost = await this.find(result.insertedId.toString());
                if (createdPost) {
                    return { post: transformPostId(createdPost) };
                } else {
                    return { error: 'Error retrieving created post' };
                }
            } else {
                return { error: 'Error creating post' };
            }
        } catch (e) {
            console.error('Error creating post:', e);
            return { error: 'Error creating post' };
        }
    },

    async find(postId: string): Promise<PostTypes | null> {
        try {
            const post = await postCollection.findOne({ _id: new ObjectId(postId) });
            return post ? transformPostId(post) : null;
        } catch (e) {
            console.error('Error finding post:', e);
            return null;
        }
    },

    async findIndex(postId: string): Promise<number> {
        try {
            const post = await this.find(postId);
            if (!post) return -1;
            return 0; // Placeholder for the "index" if needed
        } catch (e) {
            console.error('Error finding index of post:', e);
            return -1;
        }
    },

    async update(id: string, updates: Partial<PostTypes>): Promise<{ success: boolean; error?: string }> {
        try {
            const updateResult = await postCollection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
            if (updateResult.modifiedCount > 0) {
                return { success: true };
            } else {
                return { success: false, error: "Post not found or no changes made" };
            }
        } catch (e) {
            console.error('Error updating post:', e);
            return { success: false, error: 'Error updating post' };
        }
    },

    async delete(postId: string): Promise<{ success: boolean; error?: string }> {
        try {
            const deleteResult = await postCollection.deleteOne({ _id: new ObjectId(postId) });
            if (deleteResult.deletedCount > 0) {
                return { success: true };
            } else {
                return { success: false, error: "Post not found" };
            }
        } catch (e) {
            console.error('Error deleting post:', e);
            return { success: false, error: 'Error deleting post' };
        }
    },

    async getAllPosts(
        sortBy: string,
        sortDirection: string,
        pageNumber: number,
        pageSize: number,
        field?:string | undefined,
        searchNameTerm?:string | undefined,
        isFindPostsByBlog?:boolean | undefined,
    ): Promise<{
        pagesCount: number;
        page: number;
        pageSize: number;
        totalCount: number;
        items: PostTypes[];
    }> {
       return await filterRequest({ searchNameTerm, sortBy, sortDirection, pageNumber, pageSize, field, isFindPostsByBlog}, postCollection)
    },
};
