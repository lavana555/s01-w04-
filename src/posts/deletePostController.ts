import { Request, Response } from 'express';
import {postsRepository} from "../db/post-db-repository";

export const deletePostController = async (req: Request, res: Response) => {

    const deleteResult = await postsRepository.delete(req.params.id);

    if (deleteResult.success) {
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
