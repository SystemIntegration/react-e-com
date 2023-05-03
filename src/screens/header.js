import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'

function Header(props) {
    const [searchText, setSearchText] = useState('');

    const handleSearch = (value) => {
        setSearchText(value)
    };

    if(props.value && props.tabValue === 0){
        props.onSearch(searchText);
    }


    return (
        <Box Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ background: '#337def' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                            <img src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png" className="imageForShopping" alt="logo" style={{ marginRight: '1rem' }} />
                            <Typography
                                variant="h4"
                                style={{
                                    color: '#fcc729',
                                    display: 'block',
                                }}
                                noWrap
                                component="a"
                                href="/home"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    textDecoration: 'none',
                                }}
                            >
                                BMV Shopping
                            </Typography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                            {(props.value === true && props.tabValue === 0) &&
                            <div className='input' style={{ textAlign: 'center' }}>
                                <input type="search" placeholder='Search Product' className="inputTagCSS" onChange={(e) =>  handleSearch(e.target.value) }
                                    />
                            </div>}
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
}

export default Header