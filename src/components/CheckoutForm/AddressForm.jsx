import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from "react-hook-form";

import { commerce } from "../../library/commerce";

import FormInput from './CustomTextField'

const AddressForm = ({ checkoutToken }) => {
    
    const [shippingCountries, setShippingCountries, ] = useState([]);
    const [shippingCountry, setShippingCountry, ] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions, ] = useState([]);
    const [shippingSubdivision, setShippingSubdivision, ] = useState('');
    const [shippingOptions, setShippingOptions, ] = useState([]);
    const [shippingOption, setShippingOption, ] = useState('');

    const methods = useForm();

    const countries = Object.entries(shippingCountries).map(( [ code, name ] ) => ({ id: code, label: name }));

    // console.log(countries);

    const fetShippingCountries = async (checkoutTokenId) => { 
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

        // console.log(countries);
        setShippingCountries(countries);

        // Array of countries [ BE, DE, FR ...]
        setShippingCountry(Object.keys(countries)[0]);
    };

    useEffect(() => {
        fetShippingCountries(checkoutToken.id)
    }, []);

    return (
        <>
            <Typography variant="h6" gutterBottom> Adresse de Livraison </Typography>
            <FormProvider { ...methods } >
                <form >
                    <Grid container spacing={4}>
                        <FormInput required name="prénom" label="Prénom" />
                        <FormInput required name="nom" label="Nom" />
                        <FormInput required name="adresse" label="Adresse" />
                        <FormInput required name="email" label="E-mail" />
                        <FormInput required name="city" label="Ville" />
                        <FormInput required name="codePostal" label="Code Postal" />

                        <Grid item xs={12} sm={6} >
                            <InputLabel>Pays de Livraison</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(event) => setShippingCountry(event.target.value)} >
                                {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id} >
                                        {country.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>

                        {/* <Grid item xs={12} sm={6} >
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
                        </Grid> */}

                    </Grid>
                </form>
            </FormProvider>
        </>
    );
};

export default AddressForm;
