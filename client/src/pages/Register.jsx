// AXIOS : biblioteka pozwalająca na połączenie się z BACKENDEM (Node.js) i tworzyć zapytania HTTP

import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

    const [inputs, setInputs] = useState(
    {
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        password: "",
        confirm_password: ""
    });

    const onChangeHandler = (e) => 
    {
        const {name, value} = e.target;
        setInputs((prev) => {
            return {...prev, [name]: value }
        });
    };

    const submitHandler = (e) =>
    {
        e.preventDefault(); // Anulowanie zdarzenia (e -> event) w przeglądarce.

        // AXIOS: Połączenie z API na endpoint: 'user/register'

        axios
            .post("http://localhost:5000/api/user/register", // Metoda POST 
            {...inputs}, // Ddane wejściowe
            {withCredentials: true}) // Uwzględnianie plików COOKIE
            .then((res) => // Jeżeli się uda
            {
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
                }

                if (res.data.created)
                {
                    toast.success(res.data.message, 
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
            })
            .catch((err) => //Jęzeli błąd
            {
                console.log(`REQUEST ERROR: ${err}`)
            });
    }
    
  return (
    <div className="w-full py-12 flex justify-center items-center">
        <form className="bg-white p-4 shadow-md border rounded" onSubmit={submitHandler}>
        <h2 className="text-center w-full p-4 text-gray-500 text-2xl font-bold">ZAREJESTRUJ SIĘ</h2>

            <div className="mb-2">
                <label className="text-gray-500 mb-2 font-bold" for="firstname">
                Imię
                </label>
                <input type="text" 
                placeholder="Imię" 
                id="firstname"
                name="firstname"
                onChange={onChangeHandler}
                className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md border border-gray-500 rounded"
                />
            </div>

            <div className="mb-6">
                <label className="text-gray-500 mb-2 font-bold" for="lastname">
                Nazwisko
                </label>
                <input type="text" 
                placeholder="Nazwisko" 
                id="lastname"
                name="lastname"
                onChange={onChangeHandler}
                className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md border border-gray-500 rounded"
                />
            </div>

            <div className="mb-2">
                <label className="text-gray-500 mb-2 font-bold" for="username">
                Nazwa użytkownika
                </label>
                <input type="text" 
                placeholder="Nazwa użytkownika" 
                id="username" 
                name="username"
                onChange={onChangeHandler}
                className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md border border-gray-500 rounded"
                />
            </div>

            <div className="mb-2">
                <label className="text-gray-500 mb-2 font-bold" for="email">
                E-Mail
                </label>
                <input type="text" 
                placeholder="E-Mail" 
                id="email"
                name="email"
                onChange={onChangeHandler}
                className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md border border-gray-500 rounded"
                />
            </div>

            <div className="mb-2">
                <label className="text-gray-500 mb-2 font-bold" for="password">
                Hasło
                </label>
                <input type="password" 
                placeholder="Hasło" 
                id="password"
                name="password"
                onChange={onChangeHandler}
                className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md border border-gray-500 rounded"
                />
            </div>

            <div className="mb-2">
                <label className="text-gray-500 mb-2 font-bold" for="confirm_password">
                Potwierdź Hasło
                </label>
                <input type="password"
                placeholder="Potwierdź Hasło" 
                id="confirm_password"
                name="confirm_password"
                onChange={onChangeHandler}
                className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md border border-gray-500 rounded"
                />
            </div>

            <div className="flex flex-row justify-between items-center my-3 mb-5">
                <button className="text-white font-bold bg-blue-500 py-2 px-3 border rounder hover:bg-blue-700">
                Zarejestruj się
                </button>
                <Link to="/login" className="text-blue-500"><p>Mam już konto</p></Link>
            </div>
        </form>
        <ToastContainer />
    </div>
  )
}

export default Register