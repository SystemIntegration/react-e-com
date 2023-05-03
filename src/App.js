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
          <Route path="/home" element={<MainPage />}>
          </Route>
          <Route path="/signUp" element={<SignUp />}>
          </Route>
          <Route path="/product" element={<Products />}>
          </Route>
          <Route path="/productList" element={<ProductsList />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )

}

export default App;