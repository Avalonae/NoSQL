import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {GlobalContext} from '../GlobalContext/GlobalContext';
import Cookie from "js-cookie";
const Navbar = () => 
{

  const {LoginStatus, IsLoggedIn} = useContext(GlobalContext); 

  const logoutHandler = () => 
  {
    Cookie.remove("jwt_token");
    IsLoggedIn(false);
  };
  
  return (
    <div className="w-full h-25 bg-[#060606] flex justify-between">
      <div className='flex row'>
        <h1 className="text-white font-bold md:text-4xl sm:3xl text-xl p-3 ml-7">
        WYPOŻYCZALNIA
        </h1>
        <h1 className="text-[#FFA500] font-bold md:text-4xl  text-xl p-3 ">
        PŁYT
        </h1>
        <h1 className="text-white font-bold md:text-4xl sm:3xl text-xl p-3">
        MUZYCZNYCH
        </h1>
        </div>
        <ul className="hidden md:flex p-3">

            <Link to="/">
              <li className="text-[#e6e6e6] text-lg font-bold p-2 mx-3 hover:text-white transition duration-300 cursor-pointer">
              Home
              </li>
            </Link>


            {LoginStatus 
            ? (
            <>
            <Link to="collection">
              <li className="text-[#e6e6e6] text-lg font-bold p-2 mx-3 hover:text-white transition duration-300 cursor-pointer">
              Kolekcja
              </li>
            </Link>

              <Link to="/">
                <li onClick={logoutHandler} className="text-lg text-[#e6e6e6] font-bold p-2 mx-3 hover:text-white transition duration-300 cursor-pointer">
                Wyloguj się!
                </li>
              </Link>
            </>
            ) : (
            <>
              <Link to="/login">
                <li className="text-[#e6e6e6] text-lg font-bold p-2 mx-3 hover:text-white transition duration-300 cursor-pointer">
                Zaloguj się
                </li>
              </Link>
              <Link to="register">
                <li className="text-[#e6e6e6] text-lg font-bold p-2 mx-3 hover:text-white transition duration-300 cursor-pointer">
                Zarejestruj się
                </li>
              </Link>
            </>) }        
            
        </ul>
    </div>
  );
};

export default Navbar