import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import TaskRow from "./TaskRow";
import { Link } from "react-router-dom";

const TaskList = () => {

    const { loading, error, getTasks, tasks } = useContext(GlobalContext);
    const navigate = useNavigate();

    // tasks.map((task => {
    //     // Convert createdAt to a more readable format
    //     task.createdAt = new Date(task.createdAt).toLocaleDateString();
    // }));
    // useEffect(() => {
    //     getTasks()
    // }, [tasks])

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading tasks.</p>;
    }

    return <>
        <h1 className="m-4">Lista task</h1>
        <div className="m-4">
            <div className="d-flex justify-content-between border">
                <div className="col-4 p-2 border">Nome</div>
                <div className="col-4 p-2 border">Stato</div>
                <div className="col-4 p-2 border">Data di Creazione</div>
            </div>
            {tasks.map(task => (
                    <div className="d-flex justify-content-between border text-dark" key={task.id} >
                    <Link to={`/${task.id}`} className="text-decoration-none col-4 p-2 border">
                        <div>{task.title}</div>
                    </Link>
                        <div className={`col-4 p-2 border ${task.status === "To do" ? "bg-danger" : task.status === "Doing" ? "bg-warning" : task.status === "Done" ? "bg-success" : ""}`}>{task.status}</div>
                    <div className="col-4 p-2 border">{new Date(task.createdAt).toLocaleDateString()}</div>
                </div>
                
            ))}
        </div>
        {/* <ul>
            {tasks.length <= 0 ? <p>No tasks available</p> : tasks.map(task => (
                <li key={task.id}>
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                    <p>Status: {task.status}</p>
                    <p>Creation: {task.createdAt}</p>
                </li>
            ))}

        </ul> */}
        <button onClick={() => navigate('/add-task')} className="m-4 btn btn-secondary">Add Tasks</button>
    </>
}

export default TaskList;