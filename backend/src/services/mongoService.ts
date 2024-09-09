import { MongoClient } from 'mongodb';

const mongoUri = 'mongodb+srv://ayush007:HCgEj5zv8Hxwa4xO@test-cluster.6f94f5o.mongodb.net/';
const dbName = 'assignment';
const collectionName = 'assignment_Ayush_Suryawanshi';

let mongoClient: MongoClient;

export const getTasksFromMongoDB = async () => {
    if (!mongoClient) {
        mongoClient = await MongoClient.connect(mongoUri);
    }
    const db = mongoClient.db(dbName);
    const collection = db.collection(collectionName);
    return await collection.find().toArray();
};
