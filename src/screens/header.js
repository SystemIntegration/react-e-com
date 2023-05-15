import { AppBar, Autocomplete, Badge, Box, Container, Dialog, IconButton, TextField, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ReactComponent as Logo } from "./images/logo.svg"
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { url } from '../apiHandler';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Header(props) {
    const [searchName, setSearchName] = useState("");
    const [value, setValue] = useState("");
    const [searchingSeq, setSearchingSeq] = useState([]);
    const [cartLength, setCartLength] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    const cartItems = JSON.parse(localStorage.getItem("cart"));

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    useEffect(() => {
        // method for get data from API
        const API = async () => {
            const response = await fetch(url)
            const json = await response.json()
            setSearchingSeq(json.products)
            // For check response please uncomment below line.
        }
        API();
    }, [])

    useEffect(() => {
        const rData = localStorage.getItem("cart");
        if (rData !== null) {
            setCartLength(JSON.parse(rData))
        }
    })

    const handleInputChange = (event) => {
        setSearchName(event.target.value)
    };

    const handleOptionChange = (event, value) => {
        setValue(value)
    };

    let newOption = [];
    newOption = searchingSeq.map((data) => { return ({ label: data.title }) })

    const dataForSend = searchingSeq.filter((data) => { return data.title === value.label });

    if (props.value && props.tabValue === 0) {
        props.onSearch(searchName);
    }

    // Method for Close Drawer
    const handleCloseDrawer = () => {
        setShowPopup(false);
    };

    // method for Add item to cart
    const handleAddToCart = (product) => {
        const existingProductIndex = cartItems.findIndex(item => item.id === product.id);
        if (existingProductIndex >= 0) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingProductIndex].quantity += 1;
            localStorage.setItem("cart", JSON.stringify(updatedCartItems))
        } else {
            const newCartItem = { ...product, quantity: 1 };
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
            localStorage.setItem("cart", JSON.stringify(updatedCartItems))

        }
    };

    return (
        <Box>
            <AppBar position="fixed" style={{ background: '#1470A7' }}>
                <Container maxWidth="xl">
                    <Toolbar className='toolbar' disableGutters>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Logo style={{ width: '3rem', height: '3rem', marginRight: '1rem' }} />
                            <Typography
                                className='logoName'
                                style={{
                                    color: '#fff',
                                    display: 'block',
                                }}
                                noWrap
                                component="a"
                                href="/home"
                                sx={{
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    textDecoration: 'none',
                                }}
                            >
                                BMV Shopping
                            </Typography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                            <div className='inputField' style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Link to="/product" state={dataForSend[0]} style={{ pointerEvents: dataForSend.length === 0 && 'none' }}>
                                        <SearchIcon style={{ marginTop: '1rem', color: 'white' }} />
                                    </Link>
                                    <Autocomplete
                                        loading
                                        options={newOption}
                                        getOptionLabel={(option) => option.label}
                                        clearOnEscape={false}
                                        clearOnBlur={false}
                                        className="autoComplete"
                                        disableClearable
                                        onChange={handleOptionChange}
                                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                        renderInput={(params) => (
                                            <>
                                                <TextField
                                                    className="inputTagCSS"
                                                    label="Search Product Name"
                                                    {...params}
                                                    value={searchName}
                                                    onChange={handleInputChange}
                                                    variant="standard"
                                                    style={{ marginLeft: '1rem' }}
                                                >
                                                </TextField>
                                            </>
                                        )}
                                    />
                                </div>
                                <div>
                                    <IconButton aria-label="cart" onClick={togglePopup}>
                                        <Badge badgeContent={cartLength.length} color="info">
                                            <ShoppingCartIcon style={{ color: 'aliceblue' }} />
                                        </Badge>
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
            {showPopup && (
                <Dialog anchor="right" open={showPopup} onClose={handleCloseDrawer}>
                    <div className="cart-container">
                        {cartItems.length > 0 ? <> <div className="cart-items" style={{ height: '80vh', overflow: 'auto' }} >
                            <table style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <td className='cartImgs'></td>
                                        <td style={{ width: '7rem' }} >Product Name</td>
                                        <td style={{ width: '7rem' }} >Product Price</td>
                                        <td style={{ width: '7rem' }} >Product QTY</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map(item => (
                                        <tr key={item.id}>
                                            <td className='cartImgs'><img className='cartImg' src={item.thumbnail} /></td>
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
                            <div className="cart-total" style={{ display: 'flex', alignItems: 'center' }}>
                                <p style={{ marginRight: '1rem' }}>Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
                                <Link to='/signUp'><button>Checkout</button></Link>
                            </div></> : <h2  style={{width:'25rem'}}>You Cart is empty</h2>}
                    </div>
                </Dialog>
            )}
        </Box>
    )
}

export default Header