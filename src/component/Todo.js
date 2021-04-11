import React, { useState, useEffect, useCallback } from 'react';
import '../assets/css/Todo.css';
import TodoItem from './TodoItem';
import {getId} from '../lib/util';
import DateTimePicker from 'react-datetime-picker';
import '../assets/css/DateTimePicker.css'
import Filter from './Filter';

function CreateTask({ addTask }) {
        const [value, setValue] = useState("");
        const [description, setDescription] = useState("");
        const [dateTime, SetDateTime] = useState("");

        const handleSubmit = e => {
            e.preventDefault();
            if (!value) return;

            var date = dateTime.toLocaleString();
            addTask(value, description, date);
            
            setValue("");
            setDescription("");
            SetDateTime("");
        }

        return (
            <>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="input"
                        value={value}
                        placeholder="Add a new task"
                        onChange={e => setValue(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        className="input"
                        value={description}
                        placeholder="Add description"
                        onChange={e => setDescription(e.target.value)}
                    />
                    <DateTimePicker
                        className="dateTime"
                        onChange={SetDateTime}
                        value={dateTime}
                    />
                    <input type="submit" value="Add" />
                </form>
            </>
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
                completed: false
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
        
        const [filter, setFilter] = React.useState('ALL');
        
        const displayItems = tasks.filter(tasks => {
            if (filter === 'ALL') return true;
            if (filter === 'TODO') return !tasks.completed;
            if (filter === 'DONE') return tasks.completed;
        });
        
        const addTask = useCallback((title, description, dateTime) => {
            var id = getId();
            const newTasks = [...tasks, {id, title, description, dateTime, completed: false }];
            setTasks(newTasks);
        }, [tasks]);

        const completeTask = (idItem) => {
            const newTask = tasks.map(task => {
                if (task.id === idItem) {
                    task.completed = !task.completed;
                }
                return task;
              });
              setTasks(newTask);
        };

        const removeTask = (idItem) => {
            const newTasks = [...tasks];
            setTasks(newTasks.filter(({ id }) => id !== idItem));
        };

        const sortByTime = useCallback(() => {
            const tasksSorted = [...tasks].sort((a, b) => {
                if(a.dateTime === ""){
                    return 1;
                }else if(b.dateTime === ""){
                    return -1;
                }else{
                    return a.dateTime < b.dateTime ? -1 : 1
                }
            });
            setTasks(tasksSorted);
            console.log(tasksSorted);
        }, [tasks]);
        
        const handleFilterChange = value => setFilter(value);

        return (
            <div className="todo-container">
                <h3 className="nameApp">To Do application</h3>
                <div className="create-task" >
                    <CreateTask addTask={addTask} />
                </div>
                <div className="header">Pending tasks ({tasksRemaining})</div>
                <button onClick={() => sortByTime()}>Sort</button>
                <Filter
                    onChange={handleFilterChange}
                    value={tasks}
                />
                    {displayItems.map((task) => (
                        <TodoItem
                        task={task}
                        id={task.id}
                        completeTask={completeTask}
                        removeTask={removeTask}
                        key={task.id}
                        />
                    ))}
            </div>
        );    
}


export default Todo;
