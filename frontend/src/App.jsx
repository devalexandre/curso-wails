import * as React from 'react';
import {useState, useEffect} from 'react';
import './App.css';
import TaskList from './pages/listask'
import NewTask from './pages/newtask';
import { GetTasks } from '../wailsjs/go/tasks/Repository';

const App =() =>{
    const [open, setOpen] = useState(false);
    const [tasks, setTasks] = useState([]);

    const handleOpen = () => {
        setOpen(true);
    };

    const getTasks = () => {
        GetTasks()
        .then((result) => {
            console.log("ListTask",result)
            if (result === null) {
                setTasks([]);
                return;
            }
           
            setTasks(result)
        })
        .catch((err) => {
            console.log("ListTask",err)
        })
    }

    useEffect(() => {
        getTasks();
    }, []);

    return(
    <div className="App">
        <TaskList handleOpen={handleOpen} tasks={tasks} getTasks={getTasks}/>
        <NewTask open={open} handleClose={() =>{
            getTasks()
            setOpen(false)
        }} afterSave={() => {
            getTasks()
            setOpen(false)
            }} />
        </div>
    )
}

export default App
