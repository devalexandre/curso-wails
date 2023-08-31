import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextArea from '@mui/joy/Textarea';

import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import Modal from '../components/modal';

const NewHistory = (props) => {

    return (
        <Modal 
        open={props.open} 
        title={"Novo Histórico"}
        handleClose={props.handleClose} 
        actions={
            <Grid container spacing={2} direction={"row-reverse"}>
                <Grid item xs={12} sm={2}>
                    <IconButton aria-label="save" size="small" onClick={props.handleSave} color='success'>
                        <SaveIcon />
                    </IconButton>
                </Grid>
            </Grid>
        }
        > 
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
            <TextArea 
                aria-label="historico"
                minRows={10} 
                placeholder="Digite o histórico"
                style={{width: '100%'}} 
                value={props.newHistory} 
                onChange={(e) => props.setNewHistory(e.target.value)} 
            />
            </Grid>
        </Grid>
        </Modal>
        )
    }

export default NewHistory;
