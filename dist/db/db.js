"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runDb = exports.connectToDB = exports.postCollection = exports.blogCollection = exports.client = exports.setDB = exports.db = void 0;
const mongodb_1 = require("mongodb");
const settings_1 = require("../settings");
exports.db = {
    videos: [],
    blogs: [],
    posts: [],
};
// Function to quickly reset or populate the database for tests
const setDB = (dataset) => {
    exports.db.videos = (dataset === null || dataset === void 0 ? void 0 : dataset.videos) || [];
    exports.db.blogs = (dataset === null || dataset === void 0 ? void 0 : dataset.blogs) || [];
    exports.db.posts = (dataset === null || dataset === void 0 ? void 0 : dataset.posts) || [];
};
exports.setDB = setDB;
const mongoUri = process.env.MONGO_PATH || "mongodb://localhost:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.0";
// const mongoUri = 'mongodb+srv://Cluster54168:eW1RZXBtSlda@cluster54168.nm88g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster54168'
exports.client = new mongodb_1.MongoClient(mongoUri);
exports.blogCollection = exports.client.db('03-db').collection(settings_1.SETTINGS.BLOG_COLLECTION_NAME);
exports.postCollection = exports.client.db('03-db').collection(settings_1.SETTINGS.POST_COLLECTION_NAME);
// Function to check connection to the database and drop collections
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.client.connect();
        console.log('Connected to the database');
        // Drop the collections before proceeding
        yield exports.blogCollection.drop();
        yield exports.postCollection.drop();
        console.log('Dropped blogCollection and postCollection');
        return true;
    }
    catch (e) {
        console.error('Error connecting to or setting up the database', e);
        yield exports.client.close();
        return false;
    }
});
exports.connectToDB = connectToDB;
// Function to run the database connection, drop collections, and ping the server
const runDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.client.connect();
        // Drop the collections before proceeding
        yield exports.blogCollection.drop();
        yield exports.postCollection.drop();
        console.log('Dropped blogCollection and postCollection');
        yield exports.client.db("blogs-pagination").command({ ping: 1 });
        console.log("Connected successfully to MongoDB server");
    }
    catch (e) {
        console.error('Error running database', e);
        yield exports.client.close();
    }
});
exports.runDb = runDb;
