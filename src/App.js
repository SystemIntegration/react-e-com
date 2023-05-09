import "./App.css"
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import MainPage from "./screens/mainPage";
import SignUp from "./screens/signUp";
import Products from "./screens/products";
import ProductsList from "./screens/productsList";


function App() {
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/product" element={<Products />} />
          <Route path="/productList" element={<ProductsList />} />
        </Routes>
      </BrowserRouter>
    </>
  )

}

export default App;