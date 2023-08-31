import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import PropTypes from 'prop-types';

const MenuDrawer = ({open , onClose, children}) => (
    <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
    >
        {children}
    </Drawer>
);


MenuDrawer.prototype = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}

export default MenuDrawer;