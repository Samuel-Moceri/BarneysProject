import React from 'react';
import { AppBar, ToolBar, IconButton, Badge, MenuItem, Menu, Typography } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";

import logo from '../../assets/vinyle.png';
import classes from '*.module.css';


const Navbar = () => {
    return (
        <> 
            <AppBar position="fixed" className={classes.appBar} color='inherit' >
                <ToolBar>
                    <Typography variant="h6" className={classes.title} color="inherit" >
                        <img src={logo} alt="Commerce.js" height="25px" className={classes.image} />
                        Commerce.js
                    </Typography>
                    <div className={classes.grow} />

                    <div className={classes.button} >
                        

                    </div>
                </ToolBar>

            </AppBar>
            
        </>
    )
}

export default Navbar
