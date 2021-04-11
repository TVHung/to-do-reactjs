import React from 'react'
import '../assets/css/TodoItem.css';

export default function TodoItem({ task, id, completeTask, removeTask }) {
    return (
        <div className="task">
            <div style={{ textDecoration: task.completed ? "line-through" : "" }}>
                <p className="titleItem">{task.title}</p>
                <p>{task.description}</p>
                <p>{task.dateTime}</p>
            </div>
            <div className="control">
                <button style={{ background: "red" }} onClick={() => removeTask(id)}>x</button>
                <button onClick={() => completeTask(id)}>Complete</button>
            </div>
        </div>
    )
}
