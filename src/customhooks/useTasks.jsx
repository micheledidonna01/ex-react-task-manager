
import axios from 'axios';
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

    const removeTask = (id) => {
        axios.delete(`${import.meta.env.VITE_API_URL_TASK}/${id}`)
            .then(res => {
                setTasks((prev) => prev.filter(task => task.id !== parseInt(id)))
                console.log(res.status);
                alert('Task Eliminato con successo!')
            })
            .catch(err => {
                alert('Problemi con l\'eliminazione del task');
                console.error(err);
            })
    };

    const updateTask = (id, updateForm) => {
        axios.put(`${import.meta.env.VITE_API_URL_TASK}/${id}`, updateForm)
            .then(res => {
                setTasks(tasks.map(t => {
                    if (t.id === parseInt(id)) {
                        return {
                            ...t,
                            ...updateForm
                        }
                    }
                    return t;
                }))
                console.log(res.data);

            })
            .catch(err => console.error(err))
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