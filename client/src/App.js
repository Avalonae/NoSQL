
import './App.css';
import Navbar from './components/Navbar';
import {Route, Routes} from 'react-router-dom';
import Cookie from 'js-cookie';
import axios from 'axios';
import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { GlobalContext } from './GlobalContext/GlobalContext';
import { useContext } from 'react';

//PAGES
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetails from './pages/ProductDetails';
import Collection  from './pages/Collection';


function App() 
{

  const navigate = useNavigate();
  const {IsLoggedIn, LoginStatus} = useContext(GlobalContext)
  console.log(LoginStatus);

  const token = Cookie.get("jwt_token");

  useEffect(() => 
  {
    axios
      .post(
        "http://localhost:5000/api/user/verify_account",
        { token },
        { withCredentials: true }
      )
      .then((res) => 
      {
        console.log(res);
        if (!res.data.status) 
        {
          Cookie.remove("jwt_token");
          //navigate("/login");
          IsLoggedIn(false);
        } 
        else 
        {
          IsLoggedIn(true);
        }
      })
      .catch((err) => 
      {
        console.log(`Błąd: ${err}`);
      });
  }, [navigate]);

  return (
      <div className='App'>
        <div className=''>
          <Navbar />
          </div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="collection" element={<Collection />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="productdetails/:albumid" element={<ProductDetails />} />
            </Routes>
        </div>
  );
}

export default App;
