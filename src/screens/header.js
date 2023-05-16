import { AppBar, Autocomplete, Badge, Box, Container, Dialog, IconButton, TextField, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ReactComponent as Logo } from "./images/logo.svg"
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { url } from '../apiHandler';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from './redux/cartValue';

function Header(props) {
    const [searchName, setSearchName] = useState("");
    const [value, setValue] = useState("");
    const [searchingSeq, setSearchingSeq] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const dispatch = useDispatch();
    const cartItem = useSelector((item) => item.cartItems);

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
        setCartItems(cartItem)
    }, [])

    useEffect(() => {
        setCartItems(cartItem)
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

    return (
        <Box>
            <AppBar position="fixed" style={{ background: '#1470A7' }}>
                <Container maxWidth="xl">
                    <Toolbar className='toolbar' disableGutters>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Logo style={{ width: '3rem', height: '3rem', marginRight: '1rem' }} />
                            <Link to="/home" style={{ textDecoration:'none' }}>
                                <Typography
                                    className='logoName'
                                    style={{
                                        color: '#fff',
                                        display: 'block',
                                    }}
                                    noWrap
                                    sx={{
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        textDecoration: 'none',
                                    }}
                                >
                                    BMV Shopping
                                </Typography>
                            </Link>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                            <div className='inputField' style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Link to="/product" state={dataForSend[0]} style={{ pointerEvents: dataForSend.length === 0 && 'none' }}>
                                        <SearchIcon style={ { marginTop: '1rem', color: 'white' }} />
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
                                        <Badge badgeContent={cartItems.length} color="info">
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
                                            <td><p>${item.price * item.qty}</p></td>
                                            <td>
                                                <button onClick={() => dispatch(removeFromCart(item))}>-</button>
                                                <span className='addButton'>{item.qty}</span>
                                                <button className='addButton' onClick={() => dispatch(addToCart(item))}>+</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                            <div className="cart-total" style={{ display: 'flex', alignItems: 'center' }}>
                                <p style={{ marginRight: '1rem' }}>Total: ${cartItems.reduce((total, item) => total + item.price * item.qty, 0)}</p>
                                <Link to='/signUp'><button>Checkout</button></Link>
                            </div></> : <h2 style={{ width: '25rem' }}>You Cart is empty</h2>}
                    </div>
                </Dialog>
            )}
        </Box>
    )
}

export default Header