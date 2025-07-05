import React,{ useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";


const TaskRow = () => {
    const { id } = useParams();
    const { tasks } = useContext(GlobalContext);
    const searchTask = tasks.find(task => task.id === parseInt(id))
    console.log(searchTask);
    const navigate = useNavigate();

    return <>
    <div className="d-flex justify-content-between m-4"> 
        <h1>task {id}</h1>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>Back to Tasks List</button>
    </div>
        

        <div className="m-4">
            <div className="d-flex justify-content-between border">
                <div className="col-4 p-2 border">Nome</div>
                <div className="col-4 p-2 border">Stato</div>
                <div className="col-4 p-2 border">Data di Creazione</div>
            </div>
            {searchTask ? (
                <div className="d-flex justify-content-between border " >
                    <div className="col-4 p-2 border">{searchTask.title}</div>
                    <div className={`col-4 p-2 border ${searchTask.status === "To do" ? "bg-danger" : searchTask.status === "Doing" ? "bg-warning" : searchTask.status === "Done" ? "bg-success" : ""}`}>{searchTask.status}</div>
                    <div className="col-4 p-2 border">{new Date(searchTask.createdAt).toLocaleDateString()}</div>
                </div>
            ) : (
                <p>Task not found</p>
            )}
        </div>
    </>
}

export default React.memo(TaskRow);