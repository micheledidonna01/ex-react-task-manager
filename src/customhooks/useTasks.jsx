

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
        } finally {
            setLoading(false);
        }

    }

    const addTask = async (formData) => {
        const result = await fetch(import.meta.env.VITE_API_URL_TASK, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        })
        const {success, message, task} = await result.json();

        if(!success) throw new Error(message);
        setTasks(prev => [...prev, task]);
    };

    const removeTask = async (id) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL_TASK}/${id}`, {
                method: 'DELETE'
            });
            const {success, message} = await response.json();
            if(!success) throw new Error(message);

            setTasks(prev => prev.filter(t => t.id !== id));
            
    };

    const updateTask = async(id, updateForm) => {
        const result = await fetch(`${import.meta.env.VITE_API_URL_TASK}/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateForm)
        })
        const {success, message, task} = await result.json();
        if(!success) throw new Error(message)
        
        setTasks(prev => prev.map(t => t.id === id ? task : t))
    };


    
    const removeMultipleTasks = async (taskIds) => {
        const deleteRequest = taskIds.map(taskId => 
            fetch(`${import.meta.env.VITE_API_URL_TASK}/${taskId}`, { 
                method: 'DELETE' 
            })
            .then(res => res.json())
        )

        const results = await Promise.allSettled(deleteRequest);
        const fulfilled = [];
        const rejected = [];
        results.forEach((res, index) => {
            const taskId = taskIds[index];
            if (res.status === 'fulfilled' && res.value.success) {
                fulfilled.push(taskId)
            } else {
                rejected.push(taskId)
            }
        })
        
        if (fulfilled.length > 0) {
            setTasks(prev => prev.filter(t => !fulfilled.includes(t.id)))
        }
        
        if (rejected.length > 0) {
            throw new Error('Errore nell\'eleminazione delle task con id:' + rejected.join(", "));
        }
        console.log(results);
    }



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
        removeMultipleTasks,
        setTasks,
    };
}


export default useTasks;