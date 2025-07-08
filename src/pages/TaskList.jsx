import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState, useCallback } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

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
    const { loading, error, tasks } = useContext(GlobalContext);
    const navigate = useNavigate();

    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState(1);
    const [search, setSearch] = useState("");
    const [filteredTasks, setFilteredTasks] = useState(tasks);

    // 🔁 Filtro con debounce
    const handleSearch = useCallback(
        debounce((value) => {
            const filtered = tasks.filter((task) =>
                task.title.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredTasks(filtered);
        }, 500),
        [tasks]
    );

    // 🔄 aggiorna filtro al cambiamento
    useEffect(() => {
        handleSearch(search);
    }, [search, handleSearch]);

    // 🔁 ordinamento sicuro (immutabile)
    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (sortBy === "title") {
            return sortOrder * a.title.localeCompare(b.title);
        } else if (sortBy === "status") {
            return sortOrder * a.status.localeCompare(b.status);
        } else if (sortBy === "createdAt") {
            return sortOrder * (new Date(a.createdAt) - new Date(b.createdAt));
        }
        return 0;
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading tasks.</p>;

    return (
        <>
            <h1 className="m-4">Lista task</h1>

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
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
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

                {sortedTasks.map((task) => (
                    <div className="d-flex justify-content-between border text-dark" key={task.id}>
                        <Link to={`/${task.id}`} className="text-decoration-none col-4 p-2 border">
                            {task.title}
                        </Link>
                        <div className={`col-4 p-2 border ${task.status === "To do" ? "bg-danger" : task.status === "Doing" ? "bg-warning" : "bg-success"}`}>
                            {task.status}
                        </div>
                        <div className="col-4 p-2 border">{new Date(task.createdAt).toLocaleDateString()}</div>
                    </div>
                ))}
            </div>

            <button onClick={() => navigate("/add-task")} className="m-4 btn btn-secondary">
                Add Tasks
            </button>
        </>
    );
};

export default TaskList;
