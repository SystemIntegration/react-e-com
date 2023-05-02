import { FormControl, FormControlLabel, Grid, Radio, RadioGroup, Rating } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { url, urlCategory, urlCategoryList } from "../apiHandler";
import Header from "./header";

function MainPage() {
  const [products, setProducts] = useState([])
  const [value, setValue] = useState('All');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // method for get data from API
    const API = async () => {
      const URL = value == "All" ? url : (urlCategory + value);
      const response = await fetch(URL)
      const json = await response.json()
      setProducts(json.products)
      // For check response please uncomment below line.
      // console.log('response', json.products);

      const responseList = await fetch(urlCategoryList)
      const jsonList = await responseList.json()
      setCategories(jsonList)
      // For check response please uncomment below line.
      // console.log('response', jsonList);
    }
    API();
  }, [value])

  const handleChange = (event) => {
    setValue(event.target.value);
  };


  return (
    <>
      <div className="products-container">
        {/* Header part */}
        <Header />
        <div style={{ display: 'flex' }}>
          <div style={{ width: '30%', height: '88vh', overflow: 'auto', margin: '1rem 0 0 1rem' }}>
            <h3>Shop By category</h3>
            <FormControl style={{ margin: '1rem' }}>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel value="All" control={<Radio />} label="ALL" />
                {
                  categories.map((data) => {
                    return (
                      <FormControlLabel value={data} control={<Radio />} label={data.toUpperCase()} />
                    )
                  })
                }
              </RadioGroup>
            </FormControl>
          </div>
          <div style={{ width: '70%', height: '88vh', overflow: 'auto' }}>
            {/* Main content part */}
            <Grid container spacing={2}>
              {products.map(product => (
                <Grid key={product.id} item lg={12}>
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
        </div>
      </div>
    </>
  );
}

export default MainPage