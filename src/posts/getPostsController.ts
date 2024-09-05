import { Request, Response } from 'express';
import {postsRepository} from "../db/post-db-repository";

export const getPostsController = async (req: Request, res: Response) => {
    const {
        sortBy = 'createdAt',
        sortDirection = 'asc',
        pageNumber = '1',
        pageSize = '10'
    } = req.query;

    // Convert pageNumber and pageSize to numbers
    const page = parseInt(pageNumber as string, 10) || 1;
    const size = parseInt(pageSize as string, 10) || 10;

    try {
        const posts = await postsRepository.getAllPosts(
            sortBy as string,
            sortDirection as string,
            page,
            size
        );
        return res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
