import React, { useContext, useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import Modal from "../components/modal";
import EditTaskModal from "../components/EditTaskModal";

const TaskRow = () => {
    const { id } = useParams();
    const { tasks, removeTask, getTasks, updateTask } = useContext(GlobalContext);
    const searchTask = tasks.find(task => task.id === parseInt(id)) || null;
    const symbols = ("!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~\"").split('');
    const space = " ";
    console.log(searchTask);
    const navigate = useNavigate();

    const fnRemoveTask = () => {
        removeTask(id);
        navigate('/');
    }

    useEffect(() => {
        getTasks();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        updateTask(id, updateForm);
        setUpdateForm(upForm);
        setModalOpen2(false);
        // navigate(`/`)
    }

    const upFormfn = (e) => {
        console.log(e.target);
        const { name, value } = e.target;
        setUpdateForm((prev) => ({
            ...prev,
            [name]: value
        }))
        console.log(updateForm)
    }

    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
    
    const upForm = {
        title: '',
        description: '',
        status: 'To do'
    }
    const [updateForm, setUpdateForm] = useState(upForm);

    const titleIsValid = useMemo(() => {
        const notASymbols = updateForm.title.split('').some(char => symbols.includes(char));
        const notASpace = updateForm.title.split('').some(char => space.includes(char));
        if (!notASymbols && !notASpace && updateForm.title.length > 3) {
            return true
        };
        return false;
    }, [updateForm.title])

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

            <div className="d-flex justify-content-between">

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

                
                <button className="btn btn-info mt-4" onClick={() => setModalOpen2(true)}>Modifica Task</button>
                <EditTaskModal
                    show= {modalOpen2}
                    onClose={() => setModalOpen2(false)}
                    taskToModify= {updateForm}
                    onSave={handleSubmit}
                    upFormfn={upFormfn}
                    titleIsValid={titleIsValid}
                />
            </div>

        </div>
    </>
}

export default React.memo(TaskRow);