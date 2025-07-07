import 'bootstrap/dist/css/bootstrap.min.css';
const EditTaskModal = ({ show, onClose, onSave, taskToModify, upFormfn, titleIsValid }) => {

    if(!show){
        return null;
    }

    return <>
        <div className="modal-overlay d-flex justify-content-center align-items-center">
            <div className="modal-content bg-white w-50">
                <div className="modal-header mb-4">
                    <h1 className="modal-title fs-5">Modifica Task</h1>
                    <button type="button" className="btn-close" onClick={onClose}></button>
                </div>
                <div className="modal-body">
                    <form className="mb-5 d-flex flex-wrap gap-3 justify-content-center" >
                        <div className="col-12">
                            <label htmlFor="title" className="visually-hidden">Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="form-control"
                                placeholder="Enter task title"
                                value={taskToModify.title}
                                onChange={upFormfn}
                                required
                            />
                            {taskToModify.title.length === 0 ? <p></p> : titleIsValid ? <p className="text-success">title is valid</p> : <p className="text-danger">title is not valid</p>}
                        </div>
                        <div className="col-12">
                            <label htmlFor="description" className="visually-hidden">Description:</label>
                            <textarea
                                style={{ height: 100 + 'px' }}
                                id="description"
                                name="description"
                                className="form-control"
                                placeholder="Enter task description"
                                rows="6"
                                value={taskToModify.description}
                                onChange={upFormfn}
                                required
                            >
                            </textarea>
                        </div>
                        <div className="col-12">
                            <label htmlFor="status" className="visually-hidden">Status:</label>
                            <select id="status" name="status" className="form-control" value={taskToModify.status} onChange={upFormfn}>
                                <option value="To do">To do</option>
                                <option value="Done">Done</option>
                                <option value="Doing">Doing</option>
                            </select>
                        </div>
                        <button className="btn btn-secondary" onClick={onClose}>Annulla</button>
                        <button className="btn btn-primary" onClick={onSave} disabled={!titleIsValid}>Conferma</button>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default EditTaskModal