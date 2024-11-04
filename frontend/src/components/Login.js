import React, { useContext, useState } from 'react';
import NoteContext from '../context/NoteContext';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const { formData, setFormData, isloggedin, setIsLoggedIn } = useContext(NoteContext);

  const [incorrect, setIncorrect] = useState('');

  const navigate = useNavigate();

  function changeHandler(event) {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  

  const buttonHandler = async (event) => {
    event.preventDefault();

    try {
      const savedUserResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData }),
      });

      console.log('Form Response.....', savedUserResponse);

      if (savedUserResponse.ok === false) {
        setIncorrect('Password is incorrect');
      }

      const res = await savedUserResponse.json();

      const token = res.token;

      localStorage.setItem('token', token);

      const decode = jwtDecode(token);
      console.log(decode.payload.id);

      const userId = decode.payload.id;
      localStorage.setItem('userId', userId);

      const userName = decode.payload.firstName;
      localStorage.setItem('userName', userName);

      if (savedUserResponse.ok) {
        navigate('/homepage');
      } else {
        setIncorrect('Password is incorrect');
      }
    } catch (error) {
      console.log('Error logging in', error);
    }
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-blue-200 via-indigo-300 to-purple-400 bg-pattern">
      <form className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">Your Email</label>
        <input
          className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="text"
          placeholder="Email"
          name="email"
          onChange={changeHandler}
          value={formData.email}
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
        <input
          className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="password"
          placeholder="Password"
          name="password"
          onChange={changeHandler}
          value={formData.password}
        />

        <button
          onClick={buttonHandler}
          className="w-full text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Login
        </button>

        {incorrect && <p className="text-red-500 text-center mt-4">{incorrect}</p>}
      </form>
    </div>
  );
};

export default Login;
