import React, { useState, useEffect } from 'react';
import './Todo.css';
import TodoItem from './TodoItem';
import {getId} from '../lib/util';

function CreateTask({ addTask }) {
        const [value, setValue] = useState("");

        const handleSubmit = e => {
            e.preventDefault();
            if (!value) return;

            addTask(value);
            setValue("");
        }

        return (
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="input"
                    value={value}
                    placeholder="Add a new task"
                    onChange={e => setValue(e.target.value)}
                />
            </form>
        );
    }


function Todo() {
        const [tasksRemaining, setTasksRemaining] = useState(0);
        const [tasks, setTasks] = useState([
            {
                id: getId(),
                title: "Grab some Pizza",
                description: "An com voi ma",
                deadline: "",
                completed: true
            },
            {
                id: getId(),
                title: "Do your workout",
                description: "An com voi ma",
                deadline: "",
                completed: true
            },
            {
                id: getId(),
                title: "Hangout with friends",
                description: "An com voi ma",
                deadline: "",
                completed: false
            }
        ]);
        useEffect(() => {
          setTasksRemaining(tasks.filter(task => !task.completed).length)
        });

        const addTask = (title) => {
            const newTasks = [...tasks, { title, completed: false }];
            setTasks(newTasks);
        };

        const completeTask = (index) => {
            const newTasks = [...tasks];
            newTasks[index].completed = true;
            setTasks(newTasks);
        };

        const removeTask = (index) => {
            const newTasks = [...tasks];
            newTasks.splice(index, 1);
            setTasks(newTasks);
        };

        return (
            <div className="todo-container">
                <div className="header">Pending tasks ({tasksRemaining})</div>
                <div className="tasks">
                    {tasks.map((task, index) => (
                        <TodoItem
                        task={task}
                        index={index}
                        completeTask={completeTask}
                        removeTask={removeTask}
                        key={index}
                        />
                    ))}
                </div>
                <div className="create-task" >
                    <CreateTask addTask={addTask} />
                </div>
            </div>
        );    }

export default Todo;