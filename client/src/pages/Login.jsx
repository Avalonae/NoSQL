import React,{useState} from 'react';

const Login = () => {

    const [inputs, setInput] = useState(
    {
        username: "",
        password: "",
    });

    const onChangeHandler = (e) => 
    {
        const {name, value } = e.target;
        setInput(prev => {
            return { ...prev, [name]: value};
        });
    };

    const submitHandler = (e) => 
    {
        e.preventDefault();
        console.log(inputs);
    };

return (
    <div className="w-full py-12 flex justify-center items-center">
        <form className="bg-white p-4 shadow-md border rounded" 
        onSubmit={submitHandler}
        >
        <h2 className="text-center w-full p-4 text-gray-500 text-2xl font-bold">ZALOGUJ SIĘ</h2>
            <div className="mb-2">
                <label className="text-gray-500 mb-2 font-bold" for="username">
                Nazwa użytkownika
                </label>
                <input type="text" 
                placeholder="username" 
                id="username"
                name="username"
                onChange={onChangeHandler}
                value={inputs.username}
                className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md border border-gray-500 rounded"
                />
            </div>

            <div className="mb-2">
                <label className="text-gray-500 mb-2 font-bold" for="password">
                Hasło
                </label>
                <input type="text" 
                placeholder="password"
                name="password"
                id="password"
                onChange={onChangeHandler}
                value={inputs.password}
                className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md border border-gray-500 rounded"
                />
            </div>

            <div className="flex justify-between items-center my-3 mb-5">
                <button className="text-white font-bold bg-blue-500 py-2 px-3 border rounder hover:bg-red-700">
                    Login
                </button>
                <a href="#" className="text-white text-blue-500">Zapomniałeś hasła?</a>
            </div>
        </form>
    </div>
  )
}

export default Login