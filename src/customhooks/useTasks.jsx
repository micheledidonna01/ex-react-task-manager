
import axios from 'axios';
import { useEffect, useState } from 'react';
import { data } from 'react-router-dom';

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

    const addTask = (formData) => {
        axios.post(import.meta.env.VITE_API_URL_TASK, formData)
            .then(res => {
                setTasks([...tasks, res.data]);
                alert('Task aggiunta correttamente!');
                console.log('Task aggiunto:', res.data);
                // torna alla lista
            })
            .catch(err => {
                alert('Errore durante la creazione della Task!');
                console.error('Errore durante il POST:', err)
            });
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
        updateTask,
        setTasks
    };
}


export default useTasks;