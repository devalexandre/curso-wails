import React from 'react'
import {createRoot} from 'react-dom/client'
import { StyledEngineProvider } from '@mui/material/styles';

import './style.css'
import App from './App'



const container = document.getElementById('root')

const root = createRoot(container)

root.render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <App/>
        </StyledEngineProvider>
    </React.StrictMode>
)
