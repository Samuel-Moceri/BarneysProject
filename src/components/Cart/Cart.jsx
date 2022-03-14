import React from 'react'
import { Container, Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";


import useStyles from './styles';
import CartItem from './CartItem/CartItem';


const Cart = ({ cart, handleRemoveFromCart, handleEmptyCart, handleUpdateCartQty }) => {
    const classes = useStyles();
    
    const EmptyCart = () => (
        <Typography variant="subtitle1" >
            Vous n'avez aucun produit dans votre panier...  
                <Link to="/" className={classes.link} >
                  N'hésitez pas à le remplir
                </Link> !
        </Typography>
    );

    const FilledCart = () => (
        <>
            <Grid container spacing={3} >
                {cart.line_items.map((item)=> (
                    <Grid item xs={12} sm={4} key={item.id} >
                        <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} />
                    </Grid>
                ))}
            </Grid>

            <div className={classes.cardDetails} >
                    <Typography variant="h4" >
                        Subtotal: { cart.subtotal.formatted_with_symbol }
                    </Typography>
                    <div>
                        <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart} >Supprimer le Panier</Button>
                        <Button component={Link} to="/paiement" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Paiement</Button>
                    </div>
            </div>
        </>
    );

    if(!cart.line_items) return 'Chargement...'

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterBottom>Votre Panier</Typography>
            { !cart.line_items.length ? <EmptyCart /> : <FilledCart /> }
        </Container>
    )
}

export default Cart
