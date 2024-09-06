import {NextFunction, Request, Response} from "express";
import {blogsRepository} from "../../db/blog-db-repository";


export const blogExistsMiddleware = async (req: Request, res: Response, next:NextFunction) => {
    const blogId = req.params.id;

    try {
        const findBlog = await blogsRepository.find(blogId);
        if(!findBlog) {
            return res.status(404).json({
                errorsMessage: [{
                    message: 'specificied blog is not exists',
                    filed: 'id'
                }]
            })
        }
        return next();
    } catch (error) {
        res.status(500).json({
            errorsMessage: [{
                message: 'Internal server error'
            }]
        })
    }
}
