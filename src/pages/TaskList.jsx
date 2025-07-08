import { useNavigate } from "react-router-dom";
import { useContext, useState, useCallback, useMemo } from "react";
import { GlobalContext } from "../context/GlobalContext";
import TaskDetail from "../components/TaskDetail";


function debounce(callback, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(...args);
        }, delay);
    };
}   


const TaskList = () => {
    const { loading, error, tasks, removeMultipleTasks } = useContext(GlobalContext);
    const navigate = useNavigate();

    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState(1);
    const [search, setSearch] = useState("");

    // 🔁 Filtro con debounce
    const debounceSearch = useCallback(debounce(setSearch, 500),[]);


    // 🔁 ordinamento sicuro (immutabile)
        let sortedTasks = useMemo(() => { 
            return [...tasks]
            .filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
            .sort((a, b) => {
            if (sortBy === "title") {
                return sortOrder * a.title.localeCompare(b.title);
            } else if (sortBy === "status") {
                return sortOrder * a.status.localeCompare(b.status);
            } else if (sortBy === "createdAt") {
                return sortOrder * (new Date(a.createdAt).getDate() - new Date(b.createdAt).getDate());
            }
            return 0;
        })
    },[tasks, sortBy, sortOrder, search]);
    
    const [selectedTaskIds, setSelectedTaskIds] = useState([]);

    const toggleSelection = (taskId) => {
        const isThereTask = selectedTaskIds.find(id => id === taskId);
        if(isThereTask){
            setSelectedTaskIds(selectedTaskIds.filter(id => id !== taskId))
        }else{
            setSelectedTaskIds(prev => [...prev, taskId])
        }
    }

    const handleDelete = async () => {
        try{
            await removeMultipleTasks(selectedTaskIds);
            alert("Task eleminate con successo!")
            setSelectedTaskIds([])
        }catch(error){
            console.error(error);
            alert(error.message);
        }
        
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading tasks.</p>;

    return (
        <>
            <h1 className="m-4">Lista task</h1>

            <p className="m-4">{selectedTaskIds.join(", ")}</p>
            <div className="m-4">
                <div className="d-flex justify-content-between align-items-center mt-5 mb-3">
                    <div className="d-flex">
                        <div className="col-6 me-2">
                            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="form-control">
                                <option value="">---</option>
                                <option value="createdAt">Filtra per data</option>
                                <option value="title">Filtra per titolo</option>
                                <option value="status">Filtra per stato</option>
                            </select>
                        </div>
                        <div className="col-6">
                            <select value={sortOrder} onChange={e => setSortOrder(parseInt(e.target.value))} className="form-control">
                                <option value="1">Ordine crescente</option>
                                <option value="-1">Ordine decrescente</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-4">
                        <input
                            type="text"
                            // value={search}
                            onChange={(e) => debounceSearch(e.target.value)}
                            placeholder="Cerca task..."
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-between border">
                    <div className="col-4 p-2 border">Nome</div>
                    <div className="col-4 p-2 border">Stato</div>
                    <div className="col-4 p-2 border">Data di Creazione</div>
                </div>

                
                {sortedTasks?.map((task) => (
                    <TaskDetail 
                        key={task.id} 
                        task={task} 
                        onToggle={toggleSelection}
                        checked={selectedTaskIds.includes(task.id)}
                        />
                ))}
            </div>
            
            <div className="d-flex justify-content-between">
            <button onClick={() => navigate("/add-task")} className="m-4 btn btn-secondary">
                Add Tasks
            </button>
            {selectedTaskIds.length > 0 &&
            
            <button onClick={handleDelete} className="m-4 btn btn-danger">
                Delete Task Checked
            </button> 
            }

            </div>
        </>

    );
};

export default TaskList;
