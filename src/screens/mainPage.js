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
          <div className="leftDiv">
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
          <div className="rightDiv">
            {/* Main content part */}
            <Grid container spacing={2}>
              {products.map(product => (
                <Grid key={product.id} item lg={6}>
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
        </div>
      </div>
    </>
  );
}

export default MainPage