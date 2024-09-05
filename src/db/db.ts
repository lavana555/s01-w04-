import { Collection, MongoClient } from "mongodb";
import { SETTINGS } from "../settings";
import { BlogTypes } from "./blog-types";
import { PostTypes } from "./post-types";

export type DBType = {
    videos: any[]; // Consider using VideoDBType[] if you have it defined
    blogs: BlogTypes[];
    posts: PostTypes[];
};

export const db: DBType = {
    videos: [],
    blogs: [],
    posts: [],
};

// Function to quickly reset or populate the database for tests
export const setDB = (dataset?: Partial<DBType>) => {
    db.videos = dataset?.videos || [];
    db.blogs = dataset?.blogs || [];
    db.posts = dataset?.posts || [];
};

// const mongoUri = process.env.MONGO_PATH || "mongodb://localhost:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.0";
const mongoUri = 'mongodb+srv://Cluster54168:eW1RZXBtSlda@cluster54168.nm88g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster54168'
export const client = new MongoClient(mongoUri);

export const blogCollection: Collection<BlogTypes> = client.db('03-db').collection<BlogTypes>(SETTINGS.BLOG_COLLECTION_NAME);
export const postCollection: Collection<PostTypes> = client.db('03-db').collection<PostTypes>(SETTINGS.POST_COLLECTION_NAME);

// Function to check connection to the database and drop collections
export const connectToDB = async (): Promise<boolean> => {
    try {
        await client.connect();
        console.log('Connected to the database');

        // Drop the collections before proceeding
        await blogCollection.drop();
        await postCollection.drop();

        console.log('Dropped blogCollection and postCollection');
        return true;
    } catch (e) {
        console.error('Error connecting to or setting up the database', e);
        await client.close();
        return false;
    }
};

// Function to run the database connection, drop collections, and ping the server
export const runDb = async () => {
    try {
        await client.connect();

        // Drop the collections before proceeding
        await blogCollection.drop();
        await postCollection.drop();

        console.log('Dropped blogCollection and postCollection');
        await client.db("blogs-pagination").command({ ping: 1 });
        console.log("Connected successfully to MongoDB server");
    } catch (e) {
        console.error('Error running database', e);
        await client.close();
    }
};
