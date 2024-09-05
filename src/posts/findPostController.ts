import { Request, Response } from 'express';
import {postsRepository} from "../db/post-db-repository";

export const findPostController = async (req: Request, res: Response) => {

    const findPost = await postsRepository.find(req.params.id);
    if (findPost) {
        return res.status(200).json(findPost);
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
