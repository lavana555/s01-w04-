import { Request, Response } from 'express';
import { postsRepository } from "../db/post-db-repository";
import {ObjectId} from "mongodb";

export const findPostsByBlogController = async (req: Request, res: Response) => {
    const {
        sortBy = 'createdAt',
        sortDirection = 'asc',
        pageNumber = '1',
        pageSize = '10',
        field = 'blogId'
    } = req.query;

    const { id } = req.params;

    // Convert pageNumber and pageSize to numbers
    const page = parseInt(pageNumber as string, 10) || 1;
    const size = parseInt(pageSize as string, 10) || 10;

    // If field is undefined, default to 'blogId'
    const sortField = field ? (field as string) : 'blogId';


    try {
        const blogId = new ObjectId(id); // Convert `id` to ObjectId
        const isFindPostsByBlog =true;

        const blogs = await postsRepository.getAllPosts(
            sortBy as string,
            sortDirection as string,
            page,
            size,
            sortField,
            blogId.toString(),
            isFindPostsByBlog,
        );

        res.status(200).json(blogs); // Return the posts as response
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
