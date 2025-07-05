
import { useEffect, useState } from 'react';

function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getTasks = async () => {
        setLoading(true);
        try {
            const response = await fetch(import.meta.env.VITE_API_URL_TASK);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            setError(true);
            console.error('Error fetching tasks:', error);
        }finally {
            setLoading(false);
        }

    }

    const addTask = () => {

    };

    const removeTask = () => {

    };

    const updateTask = () => {

    };

    useEffect(() => {
        getTasks();
    }, []);

    return {
        tasks,
        loading,
        error,
        getTasks,
        addTask,
        removeTask,
        updateTask
    };
}


export default useTasks;