import {config} from 'dotenv';
config()


export const SETTINGS = {
        PORT: process.env.PORT || 5002,
        PATH: {
            TESTING:'/testing/all-data',
            BLOGS:'/blogs',
            POSTS:'/posts',

        },
    BLOG_COLLECTION_NAME: 'Blogs',
    POST_COLLECTION_NAME: 'Posts'
}

export const ADMIN_AUTH = 'admin:qwerty'
