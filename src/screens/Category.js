import React, { useState } from 'react'
import { categoryName, mainCategoryData } from './utils';
import { Grid } from '@mui/material';

function Category() {

  const [selectedCategory, setSelectedCategory] = useState(categoryName[0].name);
  const [category, setCategory] = useState(categoryName[0].name);

  const handleCategory = (category) => {
    setSelectedCategory(category);
    setCategory(category)
  }

  const filterData = (arr, key) => {
    // Filter the array to get the object that contains the specified key
    const filteredObj = arr.find(obj => Object.keys(obj).includes(key));

    if (filteredObj) {
      // If the object is found, get the value of the key
      const filteredValue = filteredObj[key];

      if (Array.isArray(filteredValue)) {
        // If the value is an array, return it
        return filteredValue;
      } else {
        // If the value is not an array, return an empty array
        return [];
      }
    } else {
      // If the object is not found, return an empty array
      return [];
    }
  };


  // Call the filterData function to get the data for the specified key
  const userData = filterData(mainCategoryData, category);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ background: 'gray', height: '83vh', width: '10%', textAlign: 'center', overflow: 'auto' }}>
        {categoryName.map((data) => {
          return (<div style={{
            background: selectedCategory === data.name ? 'white' : 'gray',
            paddingTop: '2rem', cursor: 'pointer'
          }}
            onClick={() => handleCategory(data.name)}>
            <img src={data.icon} alt="" style={{ height: '2.1rem', width: '2.1rem' }} />
            <p style={{ margin: 0 }}>
              {data.name}
            </p>
          </div>)
        })}
      </div>
      <div style={{ background: 'white', height: '83vh', width: '90%', overflow: 'auto' }}>
        <Grid container spacing={2} style={{ textAlign: 'center', marginTop: '1rem' }}>
          {userData.map(product => (
            <Grid item lg={4} md={6} sm={12} xs={12} style={{ padding: '1rem' }} >
              <div>
                <img src={product.icon} alt="" style={{ height: '2rem', width: '2rem' }} />
                <h2 style={{ marginLeft: "1rem" }}>{product.title.toUpperCase()}</h2>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default Category;