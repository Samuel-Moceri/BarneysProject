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
    const subdivisions = Object.entries(shippingSubdivisions).map(( [ code, name ] ) => ({ id: code, label: name }));
    const options = shippingOptions.map((shippingOptions) => ({id: shippingOptions.id, label: `${shippingOptions.description} - (${shippingOptions.price.formatted_with_symbol}) ` }))

    // console.log(countries);
    // console.log(shippingOptions);

    const fetShippingCountries = async (checkoutTokenId) => { 
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

        // console.log(countries);
        setShippingCountries(countries);

        // Array of countries [ BE, DE, FR ...]
        setShippingCountry(Object.keys(countries)[0]);
    };

    const fetchSubdivision = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

        setShippingSubdivisions(subdivisions);

        setShippingSubdivision(Object.keys(subdivisions)[0]);
    };

    const fetchshippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });

        setShippingOptions(options);
        setShippingOption(options[0].id)
    };

    useEffect(() => {
        fetShippingCountries(checkoutToken.id)
    }, []);

    useEffect(() => {
        if(shippingCountry) fetchSubdivision(shippingCountry);
    }, [shippingCountry]);

    useEffect(() => {
        if(shippingSubdivision) fetchshippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    }, [shippingSubdivision])

    return (
        <>
            <Typography variant="h6" gutterBottom> Adresse de Livraison </Typography>
            <FormProvider { ...methods } >
                <form >
                    <Grid container spacing={4}>
                        <FormInput name="prénom" label="Prénom" />
                        <FormInput name="nom" label="Nom" />
                        <FormInput name="adresse" label="Adresse" />
                        <FormInput name="email" label="E-mail" />
                        <FormInput name="city" label="Ville" />
                        <FormInput name="codePostal" label="Code Postal" />

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

                        <Grid item xs={12} sm={6} >
                            <InputLabel>Région</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(event) => setShippingSubdivision(event.target.value)} >
                                {subdivisions.map((subdivision) => (
                                    <MenuItem key={subdivision.id} value={subdivision.id} >
                                        {subdivision.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <InputLabel>Option de livraison</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(event) => setShippingOption(event.target.value)} >
                                {options.map((option) => (
                                    <MenuItem key={option.id} value={option.id} >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>

                    </Grid>
                </form>
            </FormProvider>
        </>
    );
};

export default AddressForm;
