import { Request, Response } from 'express';
import { getTasksFromCache, addTaskToCache, moveTasksToMongoDB } from '../services/redisService';
import { getTasksFromMongoDB } from '../services/mongoService';

export const fetchAllTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await getTasksFromCache();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addTask = async (req: Request, res: Response) => {
    try {
        const { task } = req.body;
        await addTaskToCache(task);
        res.status(200).json({ message: 'Task added' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
