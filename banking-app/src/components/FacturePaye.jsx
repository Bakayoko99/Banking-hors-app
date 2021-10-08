import React, { useEffect, useState } from 'react';
import '../styles/FacturePayeStyle.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';




const Facturepaye = () => {

    useEffect( async () => {

        const response = await axios.get('https://test.soan-solutions.io/test_front/datas')

        console.log(response);
     
        
    });


    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <h3><Checkbox/>1 ok</h3>
                    </Grid>
                    <Grid item xs={4}>
                        <h3>2 ok</h3>
                    </Grid>
                    <Grid item xs={4}>
                        <h3>3 ok</h3>
                    </Grid>
                    <Grid item xs={4}>
                        <h3><Checkbox/>4 ok</h3>
                    </Grid>
                    <Grid item xs={4}>
                        <h3>5 ok</h3>
                    </Grid>
                    <Grid item xs={4}>
                        <h3>6 ok</h3>
                    </Grid>
                    <Grid item xs={4}>
                        <h3><Checkbox/>7 ok</h3>
                    </Grid>
                    <Grid item xs={4}>
                        <h3>8 ok</h3>
                    </Grid>
                    <Grid item xs={4}>
                        <h3>9 ok</h3>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default Facturepaye;
