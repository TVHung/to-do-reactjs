import React from 'react'
import '../assets/css/TodoItem.css';

export default function TodoItem({ task, id, completeTask, removeTask }) {
    return (
        <div className="task">
            <div className="infor" style={{ textDecoration: task.completed ? "line-through" : "" }}>
                <p className="titleItem">{task.title}</p>
                <p className="description">{task.description}</p>
                <p>{task.dateTime}</p>
            </div>
            <div className="control">
                <button className="controlBtn" onClick={() => removeTask(id)}>Delete</button>
                <button className="controlBtn" onClick={() => completeTask(id)}>Complete</button>
            </div>
        </div>
    )
}
