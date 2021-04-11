import React, { useState, useEffect } from 'react';
import './Todo.css';
import TodoItem from './TodoItem';
import {getId} from '../lib/util';
import DateTimePicker from 'react-datetime-picker';

function CreateTask({ addTask }) {
        const [value, setValue] = useState("");
        const [description, setDescription] = useState("");
        const [dateTime, SetDateTime] = useState(new Date());

        const handleSubmit = e => {
            e.preventDefault();
            if (!value) return;
            var date = dateTime.toLocaleString();
            
            addTask(value, description, date);
            console.log(value, description, date);
            setValue("");
            setDescription("");
            SetDateTime("");
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
                <input
                    type="text"
                    className="input"
                    value={description}
                    placeholder="Add description"
                    onChange={e => setDescription(e.target.value)}
                />
                <DateTimePicker
                    onChange={SetDateTime}
                    value={dateTime}
                />
                <input type="submit" value="Submit" />
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
                dateTime: "11/1/11",
                completed: true
            },
            {
                id: getId(),
                title: "Do your workout",
                description: "An com voi ma",
                dateTime: "11/1/11",
                completed: true
            },
            {
                id: getId(),
                title: "Hangout with friends",
                description: "An com voi ma",
                dateTime: "11/1/11",
                completed: false
            }
        ]);
        useEffect(() => {
          setTasksRemaining(tasks.filter(task => !task.completed).length)
        }, [tasks]);

        const addTask = (title, description, dateTime) => {
            var id = getId();
            const newTasks = [...tasks, {id, title, description, dateTime, completed: false }];
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