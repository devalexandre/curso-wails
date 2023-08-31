import * as React from 'react';
import { useState , useEffect} from 'react';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Modal from '../components/modal';
import NewHistory from './historico';
import { GetByID } from "../../wailsjs/go/tasks/Repository.js";
import Chip from '@mui/material/Chip';
import { Create } from "../../wailsjs/go/historico/Repository.js";

const Details = (props) => { 
    
    const [openHistory, setOpenHistory] = useState(false);
    const [history, setHistory] = useState({});
    const [task, setTask] = useState({});

    useEffect(() => {
        getTaskById(props.id);
    }, [props.id]);

    const getTaskById = (id) => {
        if (!id) return;
        GetByID(id)
        .then((result) => {
            setTask(result);
        })
        .catch((err) => {
            console.log("ERROR", err);
        });
    }
  
    const handleSave = () => {
        console.log('save',history);
        console.log('task_id',props.id);
        const historico = {
            id: 0,
            texto: history,
            task_id: parseInt(props.id)
        };
        Create(historico)
        .then(() => {
            console.log("execute", "afterSave");
            setOpenHistory(false);
            getTaskById(props.id);
            setOpenHistory(false);
        })
        .catch((err) => {
            console.log("ERROR handleSave", err);
        });

        }


    const dateToBr = (date) => {
        if (!date) return null;
        const data = new Date(date);
        const formattedDate = new Intl.DateTimeFormat('pt-BR').format(data);
        return formattedDate;
    }

    const addDaysToDate = (date, days) => {
        if (!date) return null;
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return `${dateToBr(result)}`
    }


    return (
        <Modal 
        open={props.open} 
        title={`Detalhes da Tarefa ${task.id}`}
        handleClose={props.handleClose} 
        actions={
            <Grid container spacing={2} direction={"row-reverse"}>
                <Grid item xs={12} sm={2}>
                    <IconButton aria-label="save" size="small" onClick={() => setOpenHistory(true)} color='success'>
                        <AddCircleIcon />
                    </IconButton>
                </Grid>
            </Grid>
        }>
        <Grid container spacing={5}>
            <Grid item xs={12} sm={2}>
                <label>Data Entrega</label>
            </Grid>
            <Grid item xs={12} sm={3}>
                <Chip label={ task.data_entrega ?  dateToBr(task.data_entrega): "Em andamento"  }
                      color={ task.data_entrega ?  "success" : "error"  } />

            </Grid>
            <Grid item xs={12} sm={2}>
                <label>Estimativa</label>
            </Grid>
            <Grid item xs={12} sm={2}>
                <label >

                    { addDaysToDate(task.data_criacao,task.estimativa)} </label>
            </Grid>
        </Grid>

        <Grid container spacing={5}>
            <Grid item xs={12} sm={12} mt={10} pl={5}  textAlign={"left"}  >
               <p>Descrição</p>
            </Grid>
            { task.historico &&
                task.historico.map(item => (
            <Grid item xs={12} sm={12} border="solid" ml={5} key={item.id} mt={3} p={3}>
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={12} textAlign={"right"} mr={17} >
                        <p>{ dateToBr(item.data) }</p>
                    </Grid>
                    <Grid item xs={12} sm={12} textAlign={"left"} ml={5} >  
                        <p>{item.texto}</p>
                    </Grid>
                </Grid>
            </Grid>
            ))}
        </Grid>
        <NewHistory open={openHistory} handleClose={() => setOpenHistory(false)} setNewHistory={setHistory} handleSave={handleSave}  />
        </Modal>
    )};

export default Details;
            
