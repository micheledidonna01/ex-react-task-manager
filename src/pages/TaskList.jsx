import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import TaskRow from "./TaskRow";
import { Link } from "react-router-dom";

const TaskList = () => {

    const { loading, error, getTasks, tasks, setTasks } = useContext(GlobalContext);
    const navigate = useNavigate();

    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] =useState(1); 

    const copyTasks = [...tasks];
    console.log(copyTasks)
    const orderByTitle = [...tasks].sort((a,b) => {
        if (sortOrder === 1) {
            return a.title.localeCompare(b.title)
        } else if (sortOrder === -1) {
            return b.title.localeCompare(a.title)
        }
    });
    console.log(orderByTitle);
    const orderByStatus = [...tasks].sort((a, b) => {
        if (sortOrder === 1) {
            return a.status.localeCompare(b.status)
        } else if (sortOrder === -1) {
            return b.status.localeCompare(a.status)
        }
        
    });
    console.log(orderByStatus)
    const orderByData = [...tasks].sort((a, b) => {
        const dataA = new Date(a.createdAt).getDate();
        const dataB = new Date(b.createdAt).getDate();
        if(sortOrder === 1){
            return dataA - dataB;
        }else if(sortOrder === -1){
            return dataB - dataA
        }
    })
    console.log(orderByData);
    // setTasks(orderByData);

    // const orderFn = (e)=> {
    //     const{value} = e.target;
    //     console.log(value)
    //     setSortBy(value);
    //     console.log(sortBy)
    //     if (sortBy === 'createdAt'){
    //         setTasks(orderByData);
    //     } else if (sortBy === 'title'){
    //         setTasks(orderByTitle)
    //     }else if( sortBy === 'status'){
    //         setTasks(orderByStatus)
    //     }else if( sortBy === ''){
    //         setTasks(copyTasks)
    //     }
    // }


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
            <div>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <option value="">---</option>
                    <option value="createdAt">Ordine data</option>
                    <option value="title">Ordine titolo</option>
                    <option value="status">Ordine stato</option>
                </select>
                <select value={sortOrder} onChange={e => setSortOrder(parseInt(e.target.value))}>
                    <option value="1">Ordine crescente</option>
                    <option value="-1">Ordine decrescente</option>
                </select>
            </div>
            <div className="d-flex justify-content-between border">
                <div className="col-4 p-2 border">Nome</div>
                <div className="col-4 p-2 border">Stato</div>
                <div className="col-4 p-2 border">Data di Creazione</div>
            </div>

            {sortBy === 'createdAt' ? orderByData.map(task => (
                    <div className="d-flex justify-content-between border text-dark" key={task.id} >
                    <Link to={`/${task.id}`} className="text-decoration-none col-4 p-2 border">
                        <div>{task.title}</div>
                    </Link>
                        <div className={`col-4 p-2 border ${task.status === "To do" ? "bg-danger" : task.status === "Doing" ? "bg-warning" : task.status === "Done" ? "bg-success" : ""}`}>{task.status}</div>
                    <div className="col-4 p-2 border">{new Date(task.createdAt).toLocaleDateString()}</div>
                </div>
                
            )) : sortBy === '' ? tasks.map(task => (
                <div className="d-flex justify-content-between border text-dark" key={task.id} >
                    <Link to={`/${task.id}`} className="text-decoration-none col-4 p-2 border">
                        <div>{task.title}</div>
                    </Link>
                    <div className={`col-4 p-2 border ${task.status === "To do" ? "bg-danger" : task.status === "Doing" ? "bg-warning" : task.status === "Done" ? "bg-success" : ""}`}>{task.status}</div>
                    <div className="col-4 p-2 border">{new Date(task.createdAt).toLocaleDateString()}</div>
                </div>

            )) : sortBy === 'title' ? orderByTitle.map(task => (
            <div className="d-flex justify-content-between border text-dark" key={task.id} >
                <Link to={`/${task.id}`} className="text-decoration-none col-4 p-2 border">
                    <div>{task.title}</div>
                </Link>
                <div className={`col-4 p-2 border ${task.status === "To do" ? "bg-danger" : task.status === "Doing" ? "bg-warning" : task.status === "Done" ? "bg-success" : ""}`}>{task.status}</div>
                <div className="col-4 p-2 border">{new Date(task.createdAt).toLocaleDateString()}</div>
            </div>

            )) : sortBy === 'status' && orderByStatus.map(task => (
                <div className="d-flex justify-content-between border text-dark" key={task.id} >
                    <Link to={`/${task.id}`} className="text-decoration-none col-4 p-2 border">
                        <div>{task.title}</div>
                    </Link>
                    <div className={`col-4 p-2 border ${task.status === "To do" ? "bg-danger" : task.status === "Doing" ? "bg-warning" : task.status === "Done" ? "bg-success" : ""}`}>{task.status}</div>
                    <div className="col-4 p-2 border">{new Date(task.createdAt).toLocaleDateString()}</div>
                </div>

            )) }
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