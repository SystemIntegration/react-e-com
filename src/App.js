import "./App.css"
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import MainPage from "./screens/mainPage";
import SignUp from "./screens/signUp";


function App() {
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<MainPage />}>
          </Route>
          <Route path="/signUp" element={<SignUp />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )

}

export default App;