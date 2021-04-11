import React from 'react'
import './Todo.js';

export default function TodoItem({ task, index, completeTask, removeTask }) {
    return (
        <div className="task" style={{ textDecoration: task.completed ? "line-through" : "" }}>
            <p>{task.title}</p>
            <p>{task.description}</p>
            <p>{task.dateTime}</p>
            
            <button style={{ background: "red" }} onClick={() => removeTask(index)}>x</button>
            <button onClick={() => completeTask(index)}>Complete</button>
        </div>
    )
}
