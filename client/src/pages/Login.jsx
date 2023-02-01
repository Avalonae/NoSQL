import React,{useState} from 'react';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';

const Login = () => {

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
      });
    
      const navigate = useNavigate();
    
      const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => 
        {
          return { ...prev, [name]: value };
        });
      };
    
      const submitHandler = (e) => {
        e.preventDefault();
    
        console.log(inputs);
    
        axios
          .post(
            "http://localhost:5000/api/user/login",
            { ...inputs },
            { withCredentials: true }
          )
          .then((res) => {
            console.log(res);
    
            if (!res.data.created) 
            {
              if (res.data.error_type === 0) 
              {
                toast.error(res.data.error[0].msg, 
                    {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
              } 
              else if (res.data.error_type === 1) 
              {
                toast.error(res.data.message, 
                    {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
              }
              else if (res.data.error_type === 2) 
              {
                toast.error(res.data.message, 
                    {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
              }
            }
    
            if (res.data.created) {
              toast.success(res.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              navigate("/");
            }
          })
          .catch((err) => {
            console.log(`Request error: ${err}`);
          });
      };

return (

    <div className="w-full py-12 flex justify-center items-center">
        <form className="bg-[#F9F7F7] p-4 shadow-md border rounded" onSubmit={submitHandler}>
        <h2 className="text-center w-full p-4 text-[#060606] text-3xl font-bold">ZALOGUJ SIĘ</h2>

            <div className="mb-2">
                <label className="text-[#060606] mb-2 font-bold" for="username">
                Nazwa użytkownika
                </label>
                <input type="text" 
                placeholder="Nazwa użytkownika" 
                id="username"
                name="username"
                onChange={onChangeHandler}
                value={inputs.username}
                className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md border border-gray-500 rounded"
                />
            </div>

            <div className="mb-6 py-2">
                <label className="text-[#060606] mb-2 font-bold" for="password">
                Hasło
                </label>
                <input type="password" 
                placeholder="Nazwa użytkownika"
                name="password"
                id="password"
                onChange={onChangeHandler}
                value={inputs.password}
                className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md border border-gray-500 rounded"
                />
            </div>

            <div className="flex justify-between items-center my-7 mb-6">
                <button className="text-white font-bold bg-[#FFA500] py-2 px-7 mx-2 border rounder hover:bg-[#F37703] transition duration-300">
                    Login
                </button>
                <button className="text-white text-blue-500">Zapomniałeś hasła?</button>
            </div>
        </form>
        <ToastContainer/>
    </div>
  )
}

export default Login