import { Request, Response } from 'express';
import { PostTypes } from '../db/post-types';
import {blogsRepository} from "../db/blog-db-repository";
import {postsRepository} from "../db/post-db-repository";

export const updatePostController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, shortDescription, content, blogId } = req.body;

    if (blogId) {
        const findBlog = await blogsRepository.find(blogId);
        if (!findBlog) {
            return res.status(400).json({
                errorsMessages: [
                    {
                        message: 'Blog not found',
                        field: "blogId"
                    }
                ]
            });
        }
    }

    const updatedPostData: Partial<PostTypes> = {
        title,
        shortDescription,
        content,
        blogId,
    };

    const updateResult = await postsRepository.update(id, updatedPostData);

    if (updateResult.success) {
        return res.status(204).send();
    }

    return res.status(404).json({
        errorsMessages: [
            {
                message: 'Post not found',
                field: "id"
            }
        ]
    });
};
