import React, { useContext } from "react";
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
            
            <div className="d-flex justify-content-between border flex-wrap fw-bold">
                <div className="col-6 p-2 border">Nome</div>
                <div className="col-6 p-2 border">Stato</div>
            </div>
            {searchTask ? (
                <div className="d-flex justify-content-between border flex-wrap" >
                    <div className="col-6 p-2 border">{searchTask.title}</div>
                    <div className={`col-6 p-2 border ${searchTask.status === "To do" ? "bg-danger" : searchTask.status === "Doing" ? "bg-warning" : searchTask.status === "Done" ? "bg-success" : ""}`}>{searchTask.status}</div>
                </div>
            ) : (
                <p>Task not found</p>
            )}

            <div className="d-flex justify-content-between border flex-wrap fw-bold mt-4">
                <div className="col-6 p-2 border">Data di Creazione</div>
                <div className="col-6 p-2 border">Descrizione</div>
            </div>
            {searchTask ? (
                <div className="d-flex justify-content-between border flex-wrap" >
                    <div className="col-6 p-2 border">{new Date(searchTask.createdAt).toLocaleDateString()}</div>
                    <div className="col-6 p-2 border">{searchTask.description}</div>
                </div>
            ) : (
                <p>Task not found</p>
            )}

            <div className="text-center">
                <button className="btn btn-danger mt-4">Elimina Task</button>
            </div>


        </div>
    </>
}

export default React.memo(TaskRow);