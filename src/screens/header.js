import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { ReactComponent as Logo } from "./images/logo.svg"

function Header(props) {
    const [searchText, setSearchText] = useState('');

    const handleSearch = (value) => {
        setSearchText(value)
    };

    if(props.value && props.tabValue === 0){
        props.onSearch(searchText);
    }


    return (
        <Box>
            <AppBar position="fixed" style={{ background: '#1470A7' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Logo style={{width:'3rem',height:'3rem', marginRight:'1rem'}}/>
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