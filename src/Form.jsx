import React, { Fragment, useState, useEffect } from "react";

const Form = () => {
    const [task, setTask] = useState([])
    const [newTask, setNewTask] = useState('')

    useEffect(() => {
        fetch('https://playground.4geeks.com/todo/users/cyttariasp', {
            method: "POST",
            body: JSON.stringify({
                name: "cyttariasp",
                todos: []
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (!res.ok) {
                    console.log('error');
                }
                return res.json();
            })
            .then(data => console.log('user create', data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        fetch('https://playground.4geeks.com/todo/users/cyttariasp')
            .then(res => res.json())
            .then(data => setTask(data.todos))
            .catch(err => console.log(err));
    }, []);


    const handleInputChange = (e) => {
        setNewTask(e.target.value)
    }

    const addTask = (event) => {
        event.preventDefault();

        const taskFetch = {
            label: newTask,
            is_done: false
        };

        fetch('https://playground.4geeks.com/todo/todos/cyttariasp', {
            method: "POST",
            body: JSON.stringify(taskFetch),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => resp.json())
            .then(data => {
                setTask([...task, data]);
                setNewTask('');
            })
            .catch(error => console.log(error));
    };

    const deleteTask = (id) => {
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE"
        })
            .then(res => {
                if (res.ok) {
                    setTask(task.filter(t => t.id !== id));
                }
            })
            .catch(err => console.log(error));
    };


    return (
        <div className="container mt-5">
            <div className="col-auto bg-body-secondary rounded border border-dark-subtle pt-2" style={{ width: '500px' }}>
                <h1>To Do List</h1>
                <form className="d-flex container" onSubmit={addTask}>
                    <input
                        name="task"
                        value={newTask}
                        onChange={handleInputChange}
                        id="taskInput"
                        type="text"
                        placeholder="What needs to be done?"
                        className="container form-control bg-body-secondary" >
                    </input>
                </form>
                <ul id="taskList" className="list-group">
                    {task.map((a) => (
                        <li key={a.id} className="container d-flex justify-content-between border border-dark-subtle">
                            {a.label}
                            <b className="text-danger" style={{ cursor: 'pointer' }} onClick={() => deleteTask(a.id)}>X</b>
                        </li>
                    ))}
                </ul>
                <p>{task.length} Item left</p>
            </div>
        </div>
    )
}

export default Form

