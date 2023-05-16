import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { urlCategory } from '../apiHandler';
import { Grid, Rating } from '@mui/material';
import Header from './header';

function ProductsList() {
    const location = useLocation();
    const categoryName = location.state;
    const [products, setProducts] = useState([])
    const [searchResult, setSearchResult] = useState('');


    useEffect(() => {
        // method for get data from API
        const API = async () => {
            const response = await fetch(urlCategory + categoryName)
            const json = await response.json()
            setProducts(json.products)
        }
        API();
    }, [])

    const handleSearch = (searchText) => {
        setSearchResult(searchText);
    };

    // mainTask list for show in display.
    const filteredData = products.filter((t) =>
        t.title.toLowerCase().includes(searchResult.toLowerCase())
    );

    return (
        <>
            <Header value={true} onSearch={handleSearch} tabValue={0} />
            <div style={{marginTop:'5rem'}}>
            <Grid container spacing={2} >
                {filteredData.map(product => (
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
            </div>
        </>
    )
}

export default ProductsList