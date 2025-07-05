import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const TaskList = () => {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getTasks = async() =>{
        setLoading(true);
        try{
            const response = await fetch('http://localhost:3001/tasks');
            const data = await response.json();
            setTasks(data);
            

        }catch(error) {
            setError(true);
            console.error('Error fetching tasks:', error);
        }finally {
            setLoading(false);
        }

    }
    const navigate = useNavigate();

    useEffect(() => getTasks, []);

    if(loading) {
        return <p>Loading...</p>;
    }

    if(error) {
        return <p>Error loading tasks.</p>;
    }

    return <>
    <h1>Lista task</h1>
    <ul>
        {tasks.length <= 0 ? <p>No tasks available</p> : tasks.map(task => (
            <li key={task.id}>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
                <p>Status: {task.status}</p>
            </li>
        ))}
    
    </ul>
    <button onClick={() => navigate('/add-task')}>Add Tasks</button>
    </>
}

export default TaskList;