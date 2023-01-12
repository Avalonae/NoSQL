import React,{useState} from 'react';
import {Link} from 'react-router-dom';

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
        e.preventDefault();
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
                <input type="text" 
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
                <input type="text" 
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
    </div>
  )
}

export default Register