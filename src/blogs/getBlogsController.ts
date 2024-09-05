import {db} from "../db/db";
import {Request, Response} from 'express'
import {blogsRepository} from "../db/blog-db-repository";



export const getBlogsController = async (req: Request, res: Response<any>) => {
    const {
        searchNameTerm = null,
        sortBy = 'createdAt',
        sortDirection = 'desc',
        pageNumber = '1',
        pageSize = '10',
        field = 'name'
    } = req.query;

    // Convert pageNumber and pageSize to numbers
    const page = parseInt(pageNumber as string, 10) || 1;
    const size = parseInt(pageSize as string, 10) || 10;
    const blogs = await blogsRepository.getAllBlogs( searchNameTerm as string,
        sortBy as string,
        sortDirection as string,
        field as string,
        page,
        size)

    res
        .status(200)
        .json(blogs) // отдаём видео в качестве ответа

}
