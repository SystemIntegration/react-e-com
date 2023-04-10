import { AppBar, Badge, BottomNavigation, BottomNavigationAction, Box, Dialog, Drawer, FormControl, Grid, InputLabel, MenuItem, Paper, Rating, Select, TextField, Toolbar, Typography } from "@mui/material"
import Carousel from 'react-material-ui-carousel'
import { useEffect, useState } from "react"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { url } from "../apiHandler";

function MainPage() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [productForDilog, setProductForDilog] = useState([])
  const [cartItems, setCartItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [category, setCategory] = useState('');
  const categorys = ["smartphones","laptops","fragrances","skincare","groceries","home-decoration"]

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleClickOpen = (products) => {
    setOpen(true);
    setProductForDilog(products)
  };
  const handleClickOpenDrawer = (products) => {
    setOpenDrawer(true);
  };
  const error = (products) => {
    return (
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Your cart is empty!',
      })
    )
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  // Method for searching
  const searchTask = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fatchAPI = async () => {
      const response = await fetch(url)
      const json = await response.json()
      setProducts(json.products)
      // console.log('response', json.products);
    }
    fatchAPI();
  }, [])

  const handleAddToCart = (product) => {
    const existingProductIndex = cartItems.findIndex(item => item.id === product.id);
    if (existingProductIndex >= 0) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingProductIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      const newCartItem = { ...product, quantity: 1 };
      setCartItems([...cartItems, newCartItem]);
    }
  };

  const handleRemoveFromCart = (product) => {
    const existingProductIndex = cartItems.findIndex(item => item.id === product.id);
    if (existingProductIndex >= 0) {
      const updatedCartItems = [...cartItems];
      if (updatedCartItems[existingProductIndex].quantity === 1) {
        updatedCartItems.splice(existingProductIndex, 1);
      } else {
        updatedCartItems[existingProductIndex].quantity -= 1;
      }
      setCartItems(updatedCartItems);
    }
  };

  function Item(props) {
    return (
      <img src={props.item} alt="" style={{ height: '10rem', width: '10rem' }} />
    )
  }

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const filterDataBySearch = products.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const filterDataBySelect = products.filter((t) =>
    t.category.includes(category)
  );

  const displayData = category === '' ? filterDataBySearch : filterDataBySelect

  return (
    <>
      <div className="products-container">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" >
            <Toolbar style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography style={{ fontFamily: 'cursive' }} >
                  My Shopping site
                </Typography>
                <img src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png" alt="" style={{ height: '3rem' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FormControl style={{width:'15rem',marginRight:'1rem'}}>
                <InputLabel id="demo-simple-select-label" style={{color:'white',marginTop:'-0.5rem'}}>Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  style={{color:'white',height:'2.5rem'}}
                  value={category}
                  label="Age"
                  onChange={handleChange}
                >
                {categorys.map((data)=>{
                  return(
                    <MenuItem value={data}>{data}</MenuItem>
                  )
                })}
                </Select>
              </FormControl>
              <input
                type="text"
                className="inputTagCSS"
                placeholder="Search Tasks"
                value={search}
                onChange={searchTask}
                style={{ border: '0' }}
              />
              </div>
            </Toolbar>
          </AppBar>
        </Box>
        <Grid container spacing={2}  style={{ marginBottom: '5rem', textAlign: 'center', marginTop: '1rem' }}>
          {displayData.map(product => (
            <Grid item md={3} sm={6} xs={12} style={{ border: '1px solid gray', paddingLeft: '0' }} >
              <img src={product.thumbnail} alt="" style={{ height: '10rem', width: '10rem', cursor: 'pointer' }} onClick={() => { handleClickOpen(product) }} />
              <h2>{product.title}</h2>
              <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <p>${product.price}</p>
                <h4 style={{ color: 'green' }}>{product.discountPercentage}% Off</h4>
                <Rating
                  name="simple-controlled"
                  value={product.rating}
                />
                <button onClick={() => handleAddToCart(product)}>Add to cart</button>
              </div>
            </Grid>
          ))}
        </Grid>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation
            style={{ justifyContent: 'end', alignContent: 'center', height: '3rem', backgroundColor: '#F3FEE8' }}
          >
            <BottomNavigationAction label="Recents" icon={
              <Badge badgeContent={cartItems.length} color="success">
                <ShoppingCartIcon color="action" />
              </Badge>
            } onClick={() => { cartItems.length > 0 ? handleClickOpenDrawer() : error() }} />
          </BottomNavigation>
        </Paper>
        <Drawer
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Carousel>
            {
              productForDilog.images !== undefined && productForDilog.images.map((item, i) => <Item item={item} />)
            }
          </Carousel>
          <div style={{ width: '40rem', height: '30rem', textAlign: 'center' }}>
            <h2>{productForDilog.title}</h2>
            <p>${productForDilog.price}</p>
            <p>Description : <span>{productForDilog.description}</span></p>
            <button onClick={() => handleAddToCart(productForDilog)}>Add to cart</button>
          </div>
        </Drawer>
        <Dialog anchor="right" open={openDrawer} onClose={handleCloseDrawer}>
          <div className="cart-item" style={{ width: '38rem', height: '30rem', textAlign: 'center' }}>
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <td></td>
                  <td>Product Name</td>
                  <td>Product Price</td>
                  <td>Product QTY</td>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id} >
                    <td>
                      <img src={item.thumbnail} style={{ width: '5rem', height: '5rem', borderRadius: '33%' }} />
                    </td>
                    <td>
                      <p>{item.title}</p>
                    </td>
                    <td>
                      <p>${item.price * item.quantity}</p>
                    </td>
                    <td>
                      <button onClick={() => handleRemoveFromCart(item)} style={{ marginRight: '1rem' }}>-</button>
                      <span style={{ marginRight: '1rem' }}>{item.quantity}</span>
                      <button onClick={() => handleAddToCart(item)}>+</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>Total: ${calculateTotalPrice()}</p>
            <Link to='/signUp' >
              <button>Checkout</button>
            </Link>
          </div>
        </Dialog>
      </div>
    </>
  );
}

export default MainPage