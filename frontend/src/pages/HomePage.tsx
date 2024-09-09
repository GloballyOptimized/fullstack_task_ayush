import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from '../components/TaskList';
import TaskInput from '../components/TaskInput';

const HomePage: React.FC = () => {
    const [tasks, setTasks] = useState<string[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await axios.get('http://localhost:3000/fetchAllTasks');
            setTasks(response.data);
        };

        fetchTasks();
    }, []);

    return (
        <div>
            <TaskInput />
            <TaskList tasks={tasks} />
        </div>
    );
};

export default HomePage;
