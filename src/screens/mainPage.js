import { Grid, Rating } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { url } from "../apiHandler";
import Header from "./header";
import Bottom from "./bottom";
import Category from "./Category";

function MainPage() {
  const [products, setProducts] = useState([])
  const [searchResult, setSearchResult] = useState('');
  const [tabValue, setTabValue] = useState('');

  useEffect(() => {
    // method for get data from API
    const API = async () => {
      const response = await fetch(url)
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
      <div className="products-container">
        {/* Header part */}
        <Header value={true} onSearch={handleSearch} tabValue={tabValue} />
        {tabValue === 0 ?
          <div style={{ display: 'flex', overflow: 'auto', marginBottom: '5rem' }}>
            <div>
              {/* Main content part */}
              <Grid className="mainGrid" container spacing={2}>
                {filteredData.map(product => (
                  <Grid key={product.id} item lg={4} md={6} sm={12} xs={12}>
                    <div style={{ display: 'flex', margin: '1rem' }}>
                      <div>
                        <Link to='/product' state={product}>
                          <img className="img" src={product.thumbnail} alt="" style={{ padding: '0.8rem', background: 'gray' }} />
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
          </div> : <Category />}
        <Bottom OnTabChange={setTabValue} />
      </div >
    </>
  );
}

export default MainPage;