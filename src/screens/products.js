import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Badge, BottomNavigation, BottomNavigationAction, Button, Dialog, Grid, Paper, Rating } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Swal from "sweetalert2";
import { urlCategory } from '../apiHandler';
import Header from './header';

function Products() {
    const location = useLocation();
    const product = location.state;

    const [image, setImage] = useState(product.images[0])
    const [selectedImage, setSelectedImage] = useState(product.images[0]);
    const [cartItems, setCartItems] = useState([]);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [products, setProducts] = useState([])
    const category = product.category;

    console.log('cartItems', product.category);

    useEffect(() => {
        const rData = localStorage.getItem("cart");
        if (rData !== null) {
            setCartItems(JSON.parse(rData));
            console.log('cart', JSON.parse(rData));
        }
    }, [])

    useEffect(() => {
        // method for get data from API
        const API = async () => {
            const response = await fetch(urlCategory + category)
            const json = await response.json()
            setProducts(json.products)
            // For check response please uncomment below line.
            // console.log('response', json.products);
        }
        API();
    }, [])


    const handleImageClick = (image) => {
        setSelectedImage(image);
        setImage(image)
    }

    const handleImageLoad = (image) => {
        setSelectedImage(image);
        setImage(image)
    }

    // Method for Open Drawer
    const handleClickOpenDrawer = () => {
        setOpenDrawer(true);
    };

    // Method for through error when cart value is zero(0)
    const error = () => {
        return (
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Your cart is empty!',
            })
        )
    };

    // Method for Close Drawer
    const handleCloseDrawer = () => {
        setOpenDrawer(false);
    };

    // method for Add item to cart
    const handleAddToCart = (product) => {
        const existingProductIndex = cartItems.findIndex(item => item.id === product.id);
        if (existingProductIndex >= 0) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingProductIndex].quantity += 1;
            setCartItems(updatedCartItems);
            localStorage.setItem("cart", JSON.stringify(updatedCartItems))
        } else {
            const newCartItem = { ...product, quantity: 1 };
            setCartItems([...cartItems, newCartItem]);
            localStorage.setItem("cart", JSON.stringify([...cartItems, newCartItem]))

        }
    };

    // method for remove item from cart
    const handleRemoveFromCart = (product) => {
        const existingProductIndex = cartItems.findIndex(item => item.id === product.id);
        if (existingProductIndex >= 0) {
            const updatedCartItems = [...cartItems];
            if (updatedCartItems[existingProductIndex].quantity === 1) {
                updatedCartItems.splice(existingProductIndex, 1);
            } else {
                updatedCartItems[existingProductIndex].quantity -= 1;
            }
            setCartItems(updatedCartItems);
            localStorage.setItem("cart", JSON.stringify(updatedCartItems))

        }
    };

    // method for calculate TotalPrice
    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // Calculate the original price
    const originalPrice = (discountedPrice, discountPercentage) => { return (discountedPrice / (1 - (discountPercentage / 100))) };

    return (
        <div>
            <Header value={false} />
            <div className='mainDivForProduct'>
                <div className='leftSide'>
                    <div style={{textAlign:'center',marginRight:'1rem'}}>
                        <img src={image} alt="" className='bigImg' />
                    </div>
                    <div className='imagesOfProductDiv'>
                        {product.images.map((data) => {
                            return (
                                <div className='imagesOfProducts'>
                                    <img src={data} alt="" className='imagesOfProduct' style={{
                                        border: '2px solid black',
                                        boxShadow: selectedImage === data ? '0 0 2px 2px aqua' : 'none'
                                    }}
                                        onClick={() => handleImageClick(data)}
                                        onLoad={() => handleImageLoad(product.images[0])}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div style={{ margin: '1rem' }}>
                    <h2 style={{ margin: '0' }}>{product.title.toUpperCase()}</h2>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <p>{product.rating.toFixed(1)}</p>
                        <Rating
                            name="simple-controlled"
                            value={product.rating.toFixed(1)}
                            style={{ marginLeft: '1rem' }}
                            readOnly
                        />
                    </div>
                    <p style={{ fontSize: '1.6rem', margin: '0' }}>{product.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <p style={{ fontSize: '3rem', margin: '0' }}>${product.price}</p>
                        <s style={{ fontSize: '2rem', marginLeft: '1rem' }}>
                            ${Math.floor(originalPrice(product.price, product.discountPercentage))}</s>
                        <h4 style={{ color: 'green', marginLeft: "1rem" }}>{product.discountPercentage}% Off</h4>
                    </div>
                    <Button className='addToCart' onClick={() => handleAddToCart(product)}>Add to cart</Button>
                    <Button className='removeFromCart' disabled={cartItems.length > 0 ? false : true} onClick={() => handleRemoveFromCart(product)} >Remove from cart</Button>
                </div>
            </div>
            <div style={{ textAlign: 'center', display: 'flex', margin: '2rem 0' }}>
                <hr style={{ borderTop: '1px solid black', width: '40%', margin: 'auto' }} />
                <span style={{ fontSize: '1.5rem' }}>Suggestion for you</span>
                <hr style={{ borderTop: '1px solid black', width: '40%', margin: 'auto' }} />
            </div>

            {/* suggestion */}
            <Grid container spacing={2} style={{ marginBottom: '4rem' }}>
                {products.map(product => (
                    <Grid key={product.id} item lg={4} md={6} sm={12} xs={12}>
                        <div style={{ display: 'flex', margin: '1rem 1rem' }}>
                            <div>
                                <Link to='/product' state={product}>
                                    <img className="img" src={product.thumbnail} alt="" />
                                </Link>
                            </div>
                            <div style={{ marginLeft: '2rem' }}>
                                <p className="title">{product.title}</p>
                                <div className="priceOff">
                                    <h4 style={{ color: 'green' }}>{product.discountPercentage}% Off</h4>
                                    <Rating
                                        name="simple-controlled"
                                        value={product.rating}
                                        className="rating"
                                    />
                                </div>
                                <div>
                                    <p className="price" >${product.price}</p>
                                </div>
                            </div>
                        </div>
                    </Grid>
                ))}
            </Grid>
            {/* bottom part */}
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    style={{ justifyContent: 'end', alignContent: 'center', height: '3rem', backgroundColor: '#337def' }}
                >
                    <BottomNavigationAction label="Recents" icon={
                        <Badge badgeContent={cartItems.length} color="success">
                            <ShoppingCartIcon color="action" />
                        </Badge>
                    } onClick={() => { cartItems.length > 0 ? handleClickOpenDrawer() : error() }} />
                </BottomNavigation>
            </Paper>
            {/* Cart details */}
            <Dialog anchor="right" open={openDrawer} onClose={handleCloseDrawer}>
                <div className="cart-container" >
                    <div className="cart-items" >
                        <table style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <td></td>
                                    <td style={{width:'7rem'}} >Product Name</td>
                                    <td style={{width:'7rem'}} >Product Price</td>
                                    <td style={{width:'7rem'}} >Product QTY</td>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map(item => (
                                    <tr key={item.id}>
                                        <td><img className='cartImg' src={item.thumbnail}/></td>
                                        <td><p>{item.title}</p></td>
                                        <td><p>${item.price * item.quantity}</p></td>
                                        <td>
                                            <button onClick={() => handleRemoveFromCart(item)}>-</button>
                                            <span className='addButton'>{item.quantity}</span>
                                            <button className='addButton' onClick={() => handleAddToCart(item)}>+</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="cart-total" style={{ height: '5rem', display: 'flex', alignItems: 'center' }}>
                        <p style={{ marginRight: '1rem' }}>Total: ${calculateTotalPrice()}</p>
                        <Link to='/signUp'><button>Checkout</button></Link>
                    </div>
                </div>

            </Dialog>
        </div>
    )
}

export default Products