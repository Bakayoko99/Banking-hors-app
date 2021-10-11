import React, { useEffect, useState } from 'react';
import '../styles/FacturePayeStyle.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import FlashOnIcon from '@mui/icons-material/FlashOn';



const Facturepaye = () => {

    const [facture, setFacture] = useState([]);

    useEffect(async () => {

        const response = await axios.get('https://test.soan-solutions.io/test_front/datas')

        const data = response.data.payments

        for (let i = 0; i < data.length; i++) {

            if (data[i].payedDate !== null) {
                setFacture(facture => [...facture, data[i]])
            }
        }

        console.log(data);

    }, []);

    const paymentDate = (date) => {

        const result = new Date(date)

        return result.toLocaleDateString("fr-FR")

    }

    const paymentOptions = (status, discount) => {


        if (status === "USED" && discount === null) {
            return (
                <div className="allOptions">
                    <p className="pOptions"><FlashOnIcon id="flash" />3x sans frais</p>
                    <p className="pOptions2">Appliqué</p>
                </div>
            )
        } else if (status === "USED" && discount !== null) {
            return (
                <div className="allOptions">
                    <p className="pOptions"><FlashOnIcon id="flash" />3x et Escompte</p>
                    <p className="pOptions2">Appliqué</p>
                </div>
            )
        } else if (status === "NONE" && discount !== null) {
            return (
                <div className="allOptions">
                    <p className="pOptions"><FlashOnIcon id="flash" />Escompte</p>
                    <p className="pOptions2">Appliqué</p>
                </div>
            )
        }


    }

    const formatNumber = (price) => {

        const ok = price.length

        String.prototype.splice = function (idx, rem, str) {
            return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
        };

        var result = price.splice(ok - 2, 0, ",");

        // console.log("test: ", result.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 '));

        return result.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')

        // console.log("formatNumber: ", ok);
    }

   


    return (
        <div>
            {console.log("facture: ", facture)}

             <Box sx={{ flexGrow: 1 }}>
                {facture.map((elem) =>
                    <Grid container spacing={2}>

                        <Grid item xs={4}>
                            <div>
                                <p className="facturePayedN">{elem.invoiceNumber}</p>
                                <p className="deadLine">Réglée le {paymentDate(elem.payedDate)} </p>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <p>{paymentOptions(elem.multiPaymentStatus, elem.discount)}</p>
                        </Grid>
                        <Grid item xs={4}>
                            <p className="price">{formatNumber(elem.amount)} €</p>
                        </Grid>
                    </Grid>

                )}
                
            </Box>
          
        </div>
    );
}

export default Facturepaye;

