import { Request, Response } from 'express';
import {blogsRepository} from "../db/blog-db-repository";


export const deleteBlogController = async (req: Request, res: Response) => {
            const {id} = req.params;

            const result = await blogsRepository.delete(id);

            if (result.success) {
                return res.status(204).send();
            } else {
                return res.status(404).json({
                    errorsMessages: [
                        {
                            message: 'Blog not found',
                            field: "id"
                        }
                    ]
                });
            }
};
