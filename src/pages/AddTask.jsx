import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const AddTask = () => {


    const navigate = useNavigate();



    return <>
        <h1 className="mb-5">Aggiungi task</h1>

        <form className="mb-5 d-flex flex-wrap gap-3 justify-content-center">
            <div className="col-12">
                <label htmlFor="title" className="visually-hidden">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-control"
                    placeholder="Enter task title"
                    required />
            </div>
            <div className="col-12">
                <label htmlFor="description" className="visually-hidden">Description:</label>
                <textarea
                    style={{height: 150 + 'px'}}
                    id="description"
                    name="description"
                    className="form-control"
                    placeholder="Enter task description"
                    rows="6"
                    required
                >
                </textarea>
            </div>
            <div className="col-12">
                <label htmlFor="status" className="visually-hidden">Status:</label>
                <select id="status" name="status" className="form-control">
                    <option value="">Choose a status</option>
                    <option value="to-do">To do</option>
                    <option value="doing">Doing</option>
                </select>
            </div>
            <button type="submit" className="rounded">Add Task</button>
        </form>

        <button onClick={() => navigate('/')}>Lista tasks</button>
    </>
}

export default AddTask;