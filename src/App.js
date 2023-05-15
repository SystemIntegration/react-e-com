import "./App.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from "./screens/mainPage";
import SignUp from "./screens/signUp";
import Products from "./screens/products";
import ProductsList from "./screens/productsList";
import { Provider } from 'react-redux';
import store from "./screens/store";


function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/home" element={<MainPage />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/product" element={<Products />} />
            <Route path="/productList" element={<ProductsList />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </>
  )

}

export default App;