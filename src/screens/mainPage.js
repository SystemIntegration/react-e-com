import { Grid,Rating} from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { url } from "../apiHandler";
import Header from "./header";

function MainPage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    // method for get data from API
    const API = async () => {
      const response = await fetch(url)
      const json = await response.json()
      setProducts(json.products)
      // For check response please uncomment below line.
      // console.log('response', json.products);
    }
    API();
  }, [])


  return (
    <>
      <div className="products-container">
        {/* Header part */}
        <Header />
        {/* Main content part */}
        <Grid container spacing={2}>
          {products.map(product => (
            <Grid key={product.id} item lg={4} md={6} sm={12} xs={12}>
              <div style={{ display: 'flex', margin: '1rem 1rem', padding: '1rem 1rem' }}>
                <div className="img" style={{ backgroundColor: 'rgba(128,128,128, 0.4)' }}>
                  <Link to='/product' state={product}>
                    <img src={product.thumbnail} alt="" style={{ height: '10rem', width: '10rem', cursor: 'pointer', padding: '1rem 1rem' }} />
                  </Link>
                </div>
                <div style={{ marginLeft: '2rem' }}>
                  <h2 style={{ margin: '0' }}>{product.title}</h2>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h4 style={{ color: 'green' }}>{product.discountPercentage}% Off</h4>
                    <Rating
                      name="simple-controlled"
                      value={product.rating}
                      style={{ marginLeft: '1rem' }}
                    />
                  </div>
                  <div>
                    <p style={{ fontSize: '2rem', margin: '0' }}>${product.price}</p>
                  </div>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}

export default MainPage