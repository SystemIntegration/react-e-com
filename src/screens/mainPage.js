import { AppBar, Badge, BottomNavigation, BottomNavigationAction, Box, Container, Dialog, Drawer, FormControl, Grid, InputLabel, MenuItem, Paper, Rating, Select, Toolbar, Typography } from "@mui/material"
import Carousel from 'react-material-ui-carousel'
import { useEffect, useState } from "react"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { url } from "../apiHandler";
import Header from "./header";

function MainPage() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [productForDilog, setProductForDilog] = useState([])
  const [cartItems, setCartItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [category, setCategory] = useState('');
  const categorys = ["smartphones", "laptops", "fragrances", "skincare", "groceries", "home-decoration"]

  useEffect(() => {
    // method for get data from API
    const fatchAPI = async () => {
      const response = await fetch(url)
      const json = await response.json()
      setProducts(json.products)
      // For check response please uncomment below line.
      console.log('response', json.products);
    }
    fatchAPI();
  }, [])

  // Method for save dropdown selection.
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  // Method for open dialog
  const handleClickOpen = (products) => {
    setOpen(true);
    setProductForDilog(products)
  };

  // Method for Open Drawer
  const handleClickOpenDrawer = () => {
    setOpenDrawer(true);
  };

  // Method for through error when cart value is zero(0)
  const error = () => {
    return (
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Your cart is empty!',
      })
    )
  };

  // Method for Close dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Method for Close Drawer
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  // Method for searching
  const searchTask = (e) => {
    setSearch(e.target.value);
  };

  // method for Add item to cart
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

  // method for remove item from cart
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

  // method for carousel
  function Item(props) {
    return (
      <img src={props.item} alt="" style={{ height: '10rem', width: '10rem' }} />
    )
  }
  // method for calculate TotalPrice
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // method for search data
  const filterDataBySearch = products.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );
  // method for category data data
  const filterDataBySelect = products.filter((t) =>
    t.category.includes(category)
  );

  // Use this variable for show data in main UI.
  const displayData = category === '' ? filterDataBySearch : filterDataBySelect

  return (
    <>
      <div className="products-container">
        {/* Header part */}
        <Header />
        {/* Main content part */}
        {/* <Grid container spacing={2} style={{ marginBottom: '5rem', textAlign: 'center', marginTop: '1rem' }}>
          {displayData.map(product => (
            <Grid key={product.id} item lg={3} md={4} sm={6} xs={12} style={{ border: '1px solid gray', paddingLeft: '0' }} >
              <img src={product.thumbnail} alt="" style={{ height: '10rem', width: '10rem', cursor: 'pointer' }} onClick={() => { handleClickOpen(product) }} />
              <h2 style={{ margin: '0' }}>{product.title}</h2>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h4 style={{ color: 'green' }}>{product.discountPercentage}% Off</h4>
                <Rating
                  name="simple-controlled"
                  value={product.rating}
                  style={{ marginLeft: '1rem' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>${product.price}</p>
              </div>
            </Grid>
          ))}
        </Grid> */}
        <div style={{marginBottom: '3rem'}}>
          {displayData.map((product) => {
            return (
              <div style={{ display: 'flex',margin: '1rem 1rem', padding: '1rem 1rem'}}>
                <div className="img" style={{ backgroundColor:'rgba(128,128,128, 0.4)'}}>
                  <img src={product.thumbnail} alt="" style={{ height: '10rem', width: '10rem', cursor: 'pointer',padding: '1rem 1rem'   }} onClick={() => { handleClickOpen(product) }} />
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
                    <p style={{ fontSize:'2rem', margin: '0' }}>${product.price}</p>
                  </div>
                </div>
              </div>
            )
          })
          }
        </div>
        {/* bottom part */}
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation
            style={{ justifyContent: 'end', alignContent: 'center', height: '3rem', backgroundColor: '#337def' }}
          >
            <BottomNavigationAction label="Recents" icon={
              <Badge badgeContent={cartItems.length} color="success">
                <ShoppingCartIcon color="action" />
              </Badge>
            } onClick={() => { cartItems.length > 0 ? handleClickOpenDrawer() : error() }} />
          </BottomNavigation>
        </Paper>
        {/* Product details part */}
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
        {/* Cart details */}
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
                    <td><img src={item.thumbnail} style={{ width: '5rem', height: '5rem', borderRadius: '33%' }} /></td>
                    <td><p>{item.title}</p></td>
                    <td><p>${item.price * item.quantity}</p></td>
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
            <Link to='/signUp'><button>Checkout</button></Link>
          </div>
        </Dialog>
      </div>
    </>
  );
}

export default MainPage