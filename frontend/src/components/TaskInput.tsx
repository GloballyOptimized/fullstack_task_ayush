import React, { useState } from 'react';
import axios from 'axios';

const TaskInput: React.FC = () => {
    const [task, setTask] = useState('');

    const handleAddTask = async () => {
        if (task.trim()) {
            await axios.post('http://localhost:3000/addTask', { task });
            setTask('');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add a new task"
            />
            <button onClick={handleAddTask}>Add Task</button>
        </div>
    );
};

export default TaskInput;
