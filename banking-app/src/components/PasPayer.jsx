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

    const test = () => {
        const num = 243000

        console.log("test :",new Intl.NumberFormat('en-IN',{style: "currency", currency: "EUR"}).format(num));
    }

    test()


    return (
        <div>
            {console.log("facture: ", facture)}

            <Box sx={{ flexGrow: 1 }}>
                {facture.map((elem) =>
                    <Grid container spacing={2}>

                        <Grid item xs={4}>
                            <p><Checkbox />{elem.invoiceNumber}</p>
                            <p>date</p>
                        </Grid>
                        <Grid item xs={4}>
                            <p>{paymentOptions(elem.multiPaymentStatus, elem.discount)}</p>
                        </Grid>
                        <Grid item xs={4}>
                            <p>{elem.amount}</p>
                        </Grid>
                    </Grid>

                )}
            </Box>
        </div>
    );


}

export default Paspayer;
