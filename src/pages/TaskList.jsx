import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
const TaskList = () => {

    const { tasks, loading, error } = useContext(GlobalContext);
    const navigate = useNavigate();

    // useEffect(() => getTasks, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
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