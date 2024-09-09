import Redis from 'ioredis';
import { MongoClient } from 'mongodb';

const redis = new Redis({
    host: 'redis-12675.c212.ap-south-1-1.ec2.cloud.redislabs.com',
    port: 12675,
    username: 'default',
    password: 'dssYpBnYQrl01GbCGVhVq2e4dYvUrKJB',
});

const mongoUri = 'mongodb+srv://ayush007:HCgEj5zv8Hxwa4xO@test-cluster.6f94f5o.mongodb.net/';
const dbName = 'assignment';
const collectionName = 'assignment_Ayush_Suryawanshi';

let mongoClient: MongoClient;

export const addTaskToCache = async (task: string) => {
    let tasks = await redis.get('FULLSTACK_TASK_<YOUR_FIRST_NAME>');
    tasks = tasks ? JSON.parse(tasks) : [];
    tasks.push(task);

    if (tasks.length > 50) {
        if (!mongoClient) {
            mongoClient = await MongoClient.connect(mongoUri);
        }
        const db = mongoClient.db(dbName);
        const collection = db.collection(collectionName);
        await collection.insertMany(tasks.map((t: string) => ({ task: t })));
        await redis.del('FULLSTACK_TASK_<YOUR_FIRST_NAME>');
    } else {
        await redis.set('FULLSTACK_TASK_<YOUR_FIRST_NAME>', JSON.stringify(tasks));
    }
};

export const getTasksFromCache = async () => {
    let tasks = await redis.get('FULLSTACK_TASK_<YOUR_FIRST_NAME>');
    if (!tasks) {
        if (!mongoClient) {
            mongoClient = await MongoClient.connect(mongoUri);
        }
        const db = mongoClient.db(dbName);
        const collection = db.collection(collectionName);
        tasks = await collection.find().toArray();
        await redis.set('FULLSTACK_TASK_<YOUR_FIRST_NAME>', JSON.stringify(tasks.map((t: any) => t.task)));
    } else {
        tasks = JSON.parse(tasks);
    }
    return tasks;
};
