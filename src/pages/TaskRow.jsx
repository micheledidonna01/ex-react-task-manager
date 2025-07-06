import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import Modal from "../components/modal";

const TaskRow = () => {
    const { id } = useParams();
    const { tasks, removeTask, getTasks } = useContext(GlobalContext);
    const searchTask = tasks.find(task => task.id === parseInt(id)) || null;
    console.log(searchTask);
    const navigate = useNavigate();

    const fnRemoveTask = () => {
        removeTask(id);
        navigate('/');
    }

    useEffect(() => {
        getTasks();
    }, [])


    const [modalOpen, setModalOpen] = useState(false);
    

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

                <button className="btn btn-danger mt-4" onClick={() => setModalOpen(true) }>Elimina Task</button>
                {/* <button type="button" className="btn btn-primary" onClick={() => setModalOpen(true)}>
                    Launch demo modal
                </button> */}

                <Modal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onConfirm={fnRemoveTask}
                    content={searchTask}
                />

                
            </div>

            {/* {searchTask ? (

            <div className="modal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"></h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {searchTask.description}
                            <p>Vuoi eliminare definitivamente questa task?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Confirm</button>
                        </div>
                    </div>
                </div>
            </div>

            ): <p>Non ho trovato niente</p>} */}


        </div>
    </>
}

export default React.memo(TaskRow);