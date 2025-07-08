import React,{ useState } from "react"
import { Link } from "react-router-dom"
import dayjs from "dayjs"
const TaskDetail = ({ task, checked, onToggle }) => {

    return <>
        <div className="d-flex justify-content-between border text-dark" key={task.id}>
            <div className="col-4 p-2 border">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(task.id)} // questo è il "toggle"
                    className=""
                    
                />
                <Link to={`/${task.id}`} className="text-decoration-none mx-2">
                    {task.title}
                </Link>
            </div>
            <div className={`col-4 p-2 border ${task.status === "To do" ? "bg-danger" : task.status === "Doing" ? "bg-warning" : "bg-success"}`}>
                {task.status}
            </div>
            <div className="col-4 p-2 border">{dayjs(task.createdAt).format("DD/MM/YYYY")}</div>

        </div>
    </>
}

export default React.memo(TaskDetail)