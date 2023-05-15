import { AppBar, Autocomplete, Box, Container, TextField, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ReactComponent as Logo } from "./images/logo.svg"
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { url } from '../apiHandler';

function Header(props) {
    const [searchName, setSearchName] = useState("");
    const [value, setValue] = useState("");
    const [searchingSeq, setSearchingSeq] = useState([]);

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
                            <div className='input' style={{ textAlign: 'center', width: '15rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
}

export default Header