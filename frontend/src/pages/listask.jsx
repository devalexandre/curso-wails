import * as React from 'react';
import {useState, useEffect} from 'react';
import IconButton from '@mui/material/IconButton';
import EditOutlined from '@mui/icons-material/EditNoteOutlined';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckIcon from '@mui/icons-material/Check';
import DeleteForeverOutlined from '@mui/icons-material/DeleteForeverOutlined'; 
import { DataGrid , GridToolbar } from '@mui/x-data-grid';
import Tooltip from '@mui/joy/Tooltip';
import ButtonGroup from '@mui/material/ButtonGroup';
import Details from './details';
import Chip  from "@mui/joy/Chip";


import {  UpdateTask,  DeleteTask} from '../../wailsjs/go/tasks/Repository'

const ListTask = (props) => {
        const [openDetails, setOpenDetails] = useState(false);
        const [tasks, setTasks] = useState([]);


          const finalizar = (task_id) =>{
            const task = {
                id: parseInt(task_id),
                data_entrega: new Date(),
            };

            UpdateTask(task)
            .then((result) => {
                console.log("finalizar", result)
                props.getTasks()
            })
                .catch((err) => {
                    console.log("finalizar", err)
                })
        }

        const deleteTask = (id) => {
            DeleteTask(id)
            .then((result) => {
                console.log("deleteTask", result)
                props.getTasks()
            })
            .catch((err) => {
                console.log("deleteTask", err)
            })
        }


   
        const columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'titulo', headerName: 'Titulo', width: 130 },
            { field: 'estimativa', headerName: 'Estimativa', width: 130 },
            { field: 'descricao', headerName: 'Descrição', width: 130 ,sortable: false},
            { field: 'data_criacao', headerName: 'Data de Criação', width: 130,
             renderCell: (params) => {
                const value = params.value;
                const date = new Date(value);
                const formattedDate = new Intl.DateTimeFormat('pt-BR').format(date);
                return formattedDate;
             }},
             { field: 'data_entrega', headerName: 'Data de Entrega', width: 130,
             renderCell: (params) => {
                const value = params.row.data_entrega;
                if (value === null) {
                    return <Chip  color={"error"}>Não entregue</Chip>;
                }
                const date = new Date(value);
                const formattedDate = new Intl.DateTimeFormat('pt-BR').format(date);
                return <Chip  color={"success"}  endDecorator={<CheckIcon fontSize="md" />} > {formattedDate} </Chip>;
             }},
            { 
            field: 'historico', 
            headerName: '',
            width: 130 ,
            sortable: false,

            renderCell: (params) =>
                <div>
                    <ButtonGroup>
                    <Tooltip title="detalhes" color="primary" placement="top" variant={"outlined"}>
                <IconButton
                                    aria-label="detalhes"
                                    size="small"
                                    color={"primary"}
                                    onClick={() => {
                                        setTasks(params.row)
                                        setOpenDetails(true)
                                        console.log("params",params.row)
                                    }}
                                    >
                                        <EditOutlined />
                                    </IconButton>
                                    </Tooltip>
                        <Tooltip title="finalizar" color="success" placement="top" variant={"outlined"}>
                        <IconButton
                            aria-label="finalizar"
                            size="small"
                            onClick={() => finalizar(params.row.id) }
                        >
                            { params.row.data_entrega  === null ? <CheckCircleOutline /> : <CheckCircleOutline color='success' />}

                        </IconButton>
                        </Tooltip>

                        <Tooltip title="deletar" color="danger" placement="top" variant={"outlined"}>
                        <IconButton
                            aria-label="deletar"
                            size="small"
                            onClick={() => deleteTask(params.row.id) }
                        >
                            <DeleteForeverOutlined color='error' />
                        </IconButton>
                        </Tooltip>

                                    </ButtonGroup>
                </div>
            },

        ];


        return (
            <div style={{ height: 400, width: '100%' }}> 
                <DataGrid 
                    rows={props.tasks} 
                    columns={columns} 
                    rowSelection={false} 
                    initialState={{ 
                        filter:{ 
                            filterModel: {
                                items:[],
                                quickFilterValues:[],
                                
                        },
                    },
                        pagination: {
                            paginationModel: {
                                page: 0,
                                pageSize: 5,
                                },
                            },
                    }}
                pageSizeOptions={[5, 10, 20]} 
                slots={{ 
                    toolbar: GridToolbar,
                }}

                slotProps={{ 
                    toolbar: {
                        showQuickFilter: true,
                                          },
                }}
            />
        <IconButton aria-label="delete" size="medium" color='success'
            style={{ position: 'absolute', top:'50px', right:'50px' }}
            onClick={() => props.handleOpen()} 
        >
            <AddCircleOutlineIcon />
        </IconButton>
            <Details open={openDetails} handleClose={() => setOpenDetails(false)} id={tasks.id} />
    </div>
    );
}


export default ListTask;


