import React, { useEffect, useState } from 'react';
import '../styles/PasPayerStyle.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';


const Paspayer = () => {

    const [facture, setFacture] = useState([]);

    useEffect(async () => {

        const response = await axios.get('https://test.soan-solutions.io/test_front/datas')

        const data = response.data.payments

        for (let i = 0; i < data.length; i++) {

            if (data[i].payedDate === null) {
                setFacture(facture => [...facture, data[i]])
            }
        }

        console.log(data);

    }, []);

    const paymentOptions = (status, discount) => {


        if (status === "AVAILABLE" && discount === null) {
            return (
                <div>
                    <p>3x sans frais</p>
                    <p>Disponible</p>
                </div>
            )
        } else if (status === "AVAILABLE" && discount !== null) {
            return (
                <div>
                    <p>3x et Escompte</p>
                    <p>-{discount.rate}% pendant {discount.maxDaysToPay} jours</p>
                </div>
            )
        } else if (status === "NONE" && discount !== null) {
            return (
                <div>
                    <p>Escompte</p>
                    <p>-{discount.rate}% pendant {discount.maxDaysToPay} jours</p>
                </div>
            )
        }


    }

    const formatNumber = (num) => {

        const number = num.toFixed(2).replace(".", ",")

        const ok = number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')

        return ok

        // console.log("formatNumber: ", ok);
    }

    // formatNumber(500000)

    const addDays = (date, days) => {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result.toLocaleDateString("fr-FR");
        // console.log("addDays: ", result.toLocaleDateString("en-US"));
    }


    return (
        <div>
            {console.log("facture: ", facture)}

            <Box sx={{ flexGrow: 1 }}>
                {facture.map((elem) =>
                    <Grid container spacing={2}>

                        <Grid item xs={4}>
                            <p><Checkbox />{elem.invoiceNumber}</p>
                            <p>A régler avant le {addDays(elem.sentDate, elem.maxDaysToPay)}</p>
                        </Grid>
                        <Grid item xs={4}>
                            <p>{paymentOptions(elem.multiPaymentStatus, elem.discount)}</p>
                        </Grid>
                        <Grid item xs={4}>
                            <p>{formatNumber(parseInt(elem.amount))} €</p>
                        </Grid>
                    </Grid>

                )}
            </Box>
        </div>
    );


}

export default Paspayer;
