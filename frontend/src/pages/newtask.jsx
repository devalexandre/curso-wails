import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '../components/modal';
import Grid from '@mui/material/Grid';
import TextArea from '@mui/joy/Textarea';
import { CreateTask } from '../../wailsjs/go/tasks/Repository';

const NewTask = (props) => {

    const [newTask, setNewTask] = useState({
        id: 0,
        titulo: "",
        estimativa: "",
        descricao: "",
    });

    const handleSave = () => {
        const task = {
            id: parseInt(newTask.id),
            titulo: newTask.titulo,
            estimativa: parseInt(newTask.estimativa),
            descricao: newTask.descricao,
        };

        CreateTask(task)
        .then(() => {
            console.log("execute", "afterSave");
            props.afterSave();
            
            props.handleClose();
            })
            .catch((err) => {
            console.log(err);
        }
        );
    };

        return (
            <Modal 
            open={props.open} 
            title={ props.id ? "Editar Tarefa" : "Nova Tarefa"} 
            handleClose={props.handleClose}  
            actions={
                    <Grid container spacing={50}>
                        <Grid item xs={12} sm={6}>
                            <Button variant="contained" onClick={() => handleSave()} color='success'>Salvar</Button>
                        </Grid>
                    </Grid>
                }
        > 
            <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                    <TextField 
                    label="Codigo" 
                    variant="outlined" 
                    value={newTask.id} 
                        onChange={(e) => setNewTask({...newTask,id:e.target.value})}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField 
                    label="Titulo" 
                    variant="outlined" 
                    value={newTask.titulo} 
                        onChange={(e) => setNewTask({...newTask,titulo:e.target.value})}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField 
                    label="Estimativa" 
                    variant="outlined"
                    size={"small"}
                    value={newTask.estimativa} 
                    onChange={(e) => setNewTask({...newTask,estimativa:e.target.value})} 
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextArea 
                    label="Descrição"
                    variant="outlined"
                    sm={12} 
                    minRows={10} 
                    value={newTask.descricao} 
                    onChange={(e) => setNewTask({...newTask,descricao:e.target.value})} 
                    />
                </Grid>
            </Grid>
        </Modal>
        );
    };

export default NewTask;

            
