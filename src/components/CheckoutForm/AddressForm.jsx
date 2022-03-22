import React, { useState } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from "react-hook-form";

import { commerce } from "../../library/commerce";

import FormInput from './CustomTextField'

const AddressForm = () => {
    


    return (
        <>
            <Typography variant="h6" gutterBottom> Adresse de Livraison </Typography>
            <FormProvider { ...methods } >
                <form onSubmit=''>
                    <Grid container spacing={4}>
                        <FormInput required name="prénom" label="Prénom" />
                        <FormInput required name="nom" label="Nom" />
                        <FormInput required name="adresse" label="Adresse" />
                        <FormInput required name="email" label="E-mail" />
                        <FormInput required name="city" label="Ville" />
                        <FormInput required name="codePostal" label="Code Postal" />

                        <Grid item xs={12} sm={6} >
                            <InputLabel>Pays de Livraison</InputLabel>
                            <Select value={} fullWidth onChange={} >
                                <MenuItem key={} value={} >
                                    Select Me
                                </MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <InputLabel>Shipping Subdivision Région</InputLabel>
                            <Select value={} fullWidth onChange={} >
                                <MenuItem key={} value={} >
                                    Select Me
                                </MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <InputLabel>Option de livraison</InputLabel>
                            <Select value={} fullWidth onChange={} >
                                <MenuItem key={} value={} >
                                    Select Me
                                </MenuItem>
                            </Select>
                        </Grid>

                    </Grid>
                </form>
            </FormProvider>
        </>
    );
}

export default AddressForm
