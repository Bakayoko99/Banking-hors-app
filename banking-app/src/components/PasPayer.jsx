import React, { useEffect, useState } from 'react';
import '../styles/PasPayerStyle.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FlashOnIcon from '@mui/icons-material/FlashOn';


const Paspayer = () => {

    const [facture, setFacture] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState('1');
    const [checkBox, setCheckBox] = useState([]);
    const [checked, setChecked] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                <div className="allOptions">
                    <p className="pOptions"><FlashOnIcon id="flash" />3x sans frais</p>
                    <p className="pOptions2">Disponible</p>
                </div>
            )
        } else if (status === "AVAILABLE" && discount !== null) {
            return (
                <div className="allOptions">
                    <p className="pOptions"><FlashOnIcon id="flash"/>3x et Escompte</p>
                    <p className="pOptions2">-{discount.rate}% pendant {discount.maxDaysToPay} jours</p>
                </div>
            )
        } else if (status === "NONE" && discount !== null) {
            return (
                <div className="allOptions">
                    <p className="pOptions"><FlashOnIcon id="flash" />Escompte</p>
                    <p className="pOptions2">-{discount.rate}% pendant {discount.maxDaysToPay} jours</p>
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

    // formatNumber(500000)

    const addDays = (date, days) => {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result.toLocaleDateString("fr-FR");
        // console.log("addDays: ", result.toLocaleDateString("en-US"));
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 493,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    const handleChange = (event) => {
        setState(event.target.value);
    };

    const pays = [
        {
            value: '1',
            label: 'France',
        },
        {
            value: '2',
            label: 'Italie',
        },
        {
            value: '3',
            label: 'Allemagne',
        },
        {
            value: '4',
            label: 'Angleterre',
        },
    ];


    const priceChecked = (price) => {

        // if(checked === false){

        //     setChecked(true)
        //     setCheckBox([...checkBox, price])


        // }else{
        //     setChecked(false)
        //     setCheckBox(checkBox.filter(e => e !== price))
        //     // for(let i = 0; i < Checkbox.length; i++){
        //     //     if(checkBox[i] === price ){
        //     //     }
        //     // }
        // }

        // setCheckBox(true)

        // const allPrices = []

        // allPrices.push(price)
        // if (document.getElementById("myCheck").checked = true) {

        //     setCheckBox([...checkBox, price])
        // } else {
        //     document.getElementById("checkbox").checked = false
        // }




        // console.log("checked", allPrices);

    }


    return (
        <div>
            {console.log("facture: ", facture)}
            {console.log("checkBox: ", checkBox)}

            <Box sx={{ flexGrow: 1 }}>
                {facture.map((elem) =>
                    <Grid container spacing={2} key={elem.invoiceNumber}>

                        <Grid item xs={4}>
                            <div>
                                <p className="factureN"><Checkbox id="myCheck" onChange={() => priceChecked(elem.amount)} />{elem.invoiceNumber}</p>
                                <p className="deadLine">A régler avant le {addDays(elem.sentDate, elem.maxDaysToPay)}</p>
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
                <div className="oki">
                    <Button id="payButton" onClick={handleOpen}>Payer</Button>

                    {/* <button className="payButton">okkk</button> */}
                </div>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}

            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="div">
                        Payement sécurisé par prélèvement bancaire
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Box
                            sx={{
                                width: 500,
                                '& .MuiTextField-root': { m: 1, width: '93%' },
                            }}
                        >
                            <TextField fullWidth label="Titulaire du compte*" id="fullWidth" />
                            <TextField fullWidth label="Adresse du titulaire*" id="fullWidth" />
                        </Box>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                required
                                id="outlined-required"
                                label="Ville"
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Region"
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Code Postal"
                                placeholder="Code Postal"
                            />
                            <TextField
                                id="outlined-select-state"
                                select
                                label="Pays*"
                                value={state}
                                onChange={handleChange}
                            >
                                {pays.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>

                        </Box>
                        <Box
                            sx={{
                                width: 500,
                                '& .MuiTextField-root': { m: 1, width: '93%' },
                            }}
                        >
                            <TextField fullWidth label="IBAN*" id="fullWidth" />
                        </Box>
                    </Typography>
                    <div className="oki">
                        <Button onClick={handleClose}>Close modal</Button>

                    </div>
                </Box>

            </Modal>

        </div>
    );


}

export default Paspayer;

