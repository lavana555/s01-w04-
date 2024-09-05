import { Request, Response } from 'express';
import { PostTypes } from "../db/post-types";
import { postsRepository } from "../db/post-db-repository";

export const createPostController = (isBlogIdFromReqParams = false) => {
    return async (req: Request, res: Response) => {
        // If the blog ID should be taken from route parameters, do it here
        const blogId = isBlogIdFromReqParams ? req.params.id : req.body.blogId;
        const { title, shortDescription, content } = req.body;

        const post: PostTypes = {
            shortDescription: shortDescription,
            content: content,
            title: title,
            blogId: blogId,
            blogName: "", // Assuming you'll get the blogName from elsewhere
            createdAt: new Date().toISOString(),
        };

        const result = await postsRepository.create(post);

        if (result.error) {
            if (result.error === 'Blog not found') {
                return res.status(404).json({
                    errorsMessages: [
                        {
                            message: result.error,
                            field: "blogId",
                        }
                    ]
                });
            }
            return res.status(500).json({ error: result.error });
        }

        return res.status(201).json(result.post);
    };
};
