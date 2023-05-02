import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material'
import React from 'react'

function Header2(props) {
    return (
        <Box Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ background: '#337def' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                            <img src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png" className="imageForShopping" alt="logo" style={{ marginRight: '1rem' }} />
                            <Typography
                                variant="h4"
                                style={{
                                    color: '#fcc729',
                                    display: 'block',
                                }}
                                noWrap
                                component="a"
                                href="/"
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
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
}

export default Header2