import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import axios from "axios";

const AddTask = () => {

    const { addTask, getTasks, tasks } = useContext(GlobalContext);

    // console.log(addTask);
    // console.log(tasks);

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const description = useRef();
    const status = useRef();


    const symbols = ("!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~\"").split('');
    const space = " ";
    
    const titleIsValid = useMemo(()=> {
        const notASymbols = title.split('').some(char => symbols.includes(char));
        const notASpace = title.split('').some(char => space.includes(char));
        if(!notASymbols && !notASpace && title.length > 3){
            return true
        };
        return false;
    }, [title])
    


    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = {
            title,
            description: description.current.value,
            status: status.current.value,
        };
    
        console.log(`
            title: ${title},
            description: ${description.current.value},
            status: ${status.current.value}    
        `)

        addTask(formData);
        description.current.value = '';
        status.current.value = 'To do';
        setTitle('');
        
    }

    
    useEffect(()=> {
        getTasks();
    }, [tasks])

    return <>
        <h1 className="mb-5">Aggiungi task</h1>

        <form className="mb-5 d-flex flex-wrap gap-3 justify-content-center" onSubmit={handleSubmit}>
            <div className="col-12">
                <label htmlFor="title" className="visually-hidden">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-control"
                    placeholder="Enter task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required 
                />
                {title.length === 0 ? <p></p> : titleIsValid ? <p className="text-success">title is valid</p> : <p className="text-danger">title is not valid</p>}
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
                    ref={description}
                    required
                >
                </textarea>
            </div>
            <div className="col-12">
                <label htmlFor="status" className="visually-hidden">Status:</label>
                <select id="status" name="status" className="form-control" ref={status}>
                    <option value="To do">To do</option>
                    <option value="Done">Done</option>
                    <option value="Doing">Doing</option>
                </select>
            </div>
            <button type="submit" className="rounded" disabled={!titleIsValid}>Add Task</button>
        </form>

        <button onClick={() => navigate('/')}>Lista tasks</button>
    </>
}

export default AddTask;