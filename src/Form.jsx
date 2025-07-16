import React, { Fragment, useState } from "react";

const Form = () => {

    const [task, setTask] = useState([])
    const [newTask, setNewTask] = useState('')

    const handleInputChange = (e) => {
        setNewTask(e.target.value)
    }

    const addTask = (event) => {
        event.preventDefault()
        setTask([...task, newTask])
        setNewTask('')
    }

    const deleteTask = (elementdeleted) => {
        setTask(task.filter((_, index) => index !== elementdeleted))
    }


    return (
        <div className="container mt-5">
            <div className="col-auto bg-body-secondary rounded border border-dark-subtle pt-2" style={{width: '500px'}}>
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
                    {task.map((a, b) => (
                        <li key={b} className="container d-flex justify-content-between border border-dark-subtle">
                            {a}
                            <b className="text-danger" style={{cursor: 'pointer'}} onClick={() => deleteTask(b)}>X</b>
                        </li>
                    ))}
                </ul>
                <p>{task.length} Item left</p>
            </div>
        </div>
    )
}

export default Form

