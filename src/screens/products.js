import React, { useState } from 'react'
import Header from './header'
import { useLocation } from 'react-router-dom'
import { Button, Rating } from '@mui/material';

function Products() {
    const location = useLocation();
    const product = location.state;
    console.log('Data', product);

    const [image, setImage] = useState(product.images[0])
    const [selectedImage, setSelectedImage] = useState(product.images[0]);

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setImage(image)
    }

    return (
        <div>
            <Header />
            <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '1rem 1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 1rem' }}>
                    <div style={{ paddingTop: '3rem' }}>
                        {product.images.map((data) => {
                            return (
                                <div style={{ margin: '1rem 1rem' }}>
                                    <img src={data} alt="" style={{
                                        width: '4rem', height: '4rem', cursor: 'pointer',
                                        border: '2px solid black',
                                        boxShadow: selectedImage === data ? '0 0 2px 2px aqua' : 'none'
                                    }}
                                        onClick={() => handleImageClick(data)}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        <img src={image} alt="" style={{ width: '33rem', height: '30rem', marginLeft: '3rem', borderRadius: '10px' }} />
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
                        <h4 style={{ color: 'green', marginLeft: "1rem" }}>{product.discountPercentage}% Off</h4>
                    </div>
                    <Button style={{ fontSize: '1.5rem', borderRadius: '12px', marginTop: '10rem', backgroundColor: 'aqua', color: 'black' }} >Add to cart</Button>
                </div>
            </div>
        </div>
    )
}

export default Products