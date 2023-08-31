import * as React from 'react';
import {useState, useEffect} from 'react';
import './App.css';
import TaskList from './pages/listask'
import NewTask from './pages/newtask';
import { GetTasks } from '../wailsjs/go/tasks/Repository';
import MenuDrawer from './components/Drawer';
import { List, ListItem, ListItemIcon, ListItemText, Divider, Typography, IconButton, ButtonGroup,Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DetailsIcon from '@mui/icons-material/DeveloperBoard';
import DeleteForeverOutlined from '@mui/icons-material/DeleteForeverOutlined';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import EditNoteOutlined from '@mui/icons-material/EditNoteOutlined';
import Details from './pages/details';

const App =() =>{
    const [open, setOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);

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

    const finalizar = (task_id) =>{
        const task = {
            id: parseInt(task_id),
            data_entrega: new Date(),
        };

        UpdateTask(task)
        .then((result) => {
            console.log("finalizar", result)
            getTasks()
        })
            .catch((err) => {
                console.log("finalizar", err)
            })
    }

    const deleteTask = (id) => {
        DeleteTask(id)
        .then((result) => {
            console.log("deleteTask", result)
            getTasks()
        })
        .catch((err) => {
            console.log("deleteTask", err)
        })
    }


    useEffect(() => {
        getTasks();
    }, []);

    return(
    <div className="App">
     <IconButton onClick={() => setOpenDrawer(true)} color='info' style={{position:"absolute",left:10,top:0}}>
        <DetailsIcon />
    </IconButton>
   
        <MenuDrawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
            <ListItem button onClick={() => setOpen(true)}>
                <ListItemIcon>
                    <AddIcon />
                </ListItemIcon>
                <ListItemText primary="New Task" />
            </ListItem>
        </List>
        <Divider />
        { tasks.length}
            {/* tasks */}
            {tasks.length === 0 && (
                <Typography variant="h6" align="center">
                    No tasks
                </Typography>
            )}
            <List>
                {tasks.map((task) => (
                    <ListItem key={task.id}>
                        <ListItemText primary={task.titulo} />
                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                        <IconButton onClick={() => setOpenDetails(true)}>
                              <EditNoteOutlined color='primary' />
                        </IconButton>
                            <IconButton onClick={() => finalizar(task.id)}>
                              <CheckCircleOutline color='success' />
                            </IconButton>
                            <IconButton onClick={() => deleteTask(task.id)}>
                               <DeleteForeverOutlined color='error' />
                            </IconButton>
                        </ButtonGroup>   
                    </ListItem>
                ))}
            </List>
        </MenuDrawer>
        <TaskList handleOpen={handleOpen} tasks={tasks} getTasks={getTasks} />
        <NewTask open={open} handleClose={() =>{
            getTasks()
            setOpen(false)
        }} afterSave={() => {
            getTasks()
            setOpen(false)
            }} />

        <Details open={openDetails} handleClose={() => setOpenDetails(false)} id={tasks.id} />
        </div>
    )
}

export default App
