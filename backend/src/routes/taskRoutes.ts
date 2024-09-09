import { Router } from 'express';
import { fetchAllTasks, addTask } from '../controllers/taskController';

const router = Router();

router.get('/fetchAllTasks', fetchAllTasks);
router.post('/addTask', addTask);

export default router;
