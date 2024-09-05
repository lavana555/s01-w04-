// import { PostTypes } from "./post-types";
// import { db } from "./db";
// import {blogsRepository} from "./blog-db-repository";
//
// export const postsRepository = {
//     async create(post: PostTypes): Promise<{ error?: string; post?: PostTypes }> {
//         const blog = await blogsRepository.find(post.blogId.toString());
//
//         if (!blog) {
//             return { error: 'Blog not found' };
//         }
//
//         post.blogName = blog.name;
//
//         try {
//             db.posts.push(post);
//             const createdPost = await this.find(post.id);
//             return { post: createdPost! };
//         } catch (e) {
//             return { error: 'Error creating post' };
//         }
//     },
//
//     async find(postId: string): Promise<PostTypes | null> {
//         return db.posts.find(({ id }) => id === postId) || null;
//     },
//
//     async findIndex(postId: string): Promise<number> {
//         return db.posts.findIndex(({ id }) => id === postId);
//     },
//
//     async update(id: string, updates: Partial<PostTypes>): Promise<{ success: boolean; error?: string }> {
//         const index = await this.findIndex(id);
//         if (index !== -1) {
//             db.posts[index] = {
//                 ...db.posts[index],
//                 ...updates,
//             };
//             return { success: true };
//         }
//         return { success: false, error: "Post not found" };
//     },
//
//     async delete(postId: string): Promise<{ success: boolean; error?: string }> {
//         const postIndex = await this.findIndex(postId);
//         if (postIndex !== -1) {
//             db.posts.splice(postIndex, 1);
//             return { success: true };
//         }
//         return { success: false, error: "Post not found" };
//     }
// };
