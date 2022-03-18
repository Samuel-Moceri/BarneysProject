import React from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from "react-hook-form";

import FormInput from './CustomTextField'

const AddressForm = () => {
    const methods = useForm();

    return (
        <>
            <Typography variant="h6" gutterBottom> Adresse de Livraison </Typography>
            <FormProvider { ...methods } >
                <form onSubmit=''>
                    <Grid container spacing={3}>
                        <FormInput required name="prénom" label="votre prénom" />
                    </Grid>
                </form>
            </FormProvider>
        </>
    );
}

export default AddressForm
