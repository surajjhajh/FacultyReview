import React, { useContext } from 'react';
import NoteContext from '../context/NoteContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const { signupData, setSignupData } = useContext(NoteContext);

  const navigate = useNavigate();

  function changeHandler(e) {
    const { name, value } = e.target;

    setSignupData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }


  
  const submitHandler = async (e) => {
    e.preventDefault();

    const savedUserResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/signup`, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...signupData }),
    });

    console.log('FORM RESPONSE.......', savedUserResponse);

    if (savedUserResponse.ok) {
      navigate('/login');
    } else {
      console.log('Error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-300">
      <form className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">First Name</label>
        <input
          className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          type="text"
          placeholder="First Name"
          name="firstName"
          onChange={changeHandler}
          value={signupData.firstName}
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Last Name</label>
        <input
          className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          type="text"
          placeholder="Last Name"
          name="lastName"
          onChange={changeHandler}
          value={signupData.lastName}
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
        <input
          className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          type="text"
          placeholder="Email"
          name="email"
          onChange={changeHandler}
          value={signupData.email}
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
        <input
          className="block w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          type="password"
          placeholder="Password"
          name="password"
          onChange={changeHandler}
          value={signupData.password}
        />

        <button
          onClick={submitHandler}
          className="w-full text-white bg-gradient-to-r from-green-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
