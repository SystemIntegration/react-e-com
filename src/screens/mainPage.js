import { FormControl, FormControlLabel, Grid, Radio, RadioGroup, Rating } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { url, urlCategory, urlCategoryList } from "../apiHandler";
import Header from "./header";

function MainPage() {
  const [products, setProducts] = useState([])
  const [searchResult, setSearchResult] = useState('');

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

  const handleSearch = (searchText) => {
    setSearchResult(searchText);
  };

  // mainTask list for show in display.
  const filteredData = products.filter((t) =>
    // console.log('searchResult', t.title.toLowerCase().includes(searchResult.toLowerCase())),
    t.title.toLowerCase().includes(searchResult.toLowerCase())
  );

  return (
    <>
      <div className="products-container">
        {/* Header part */}
        <Header value={true} onSearch={handleSearch} />
        <div style={{ display: 'flex' }}>
          <div>
            {/* Main content part */}
            <Grid container spacing={2}>
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
        </div>
      </div>
    </>
  );
}

export default MainPage