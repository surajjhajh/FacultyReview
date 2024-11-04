import React, { useContext } from 'react';
import NoteContext from '../context/NoteContext';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { search, setSearch, facultydata, setFacultyData } = useContext(NoteContext);
  const navigate = useNavigate();

  function changeHandler(e) {
    const { value } = e.target;
    setSearch(value);
  }

  const buttonHandler = async (e) => {
    e.preventDefault();

    try {
      const savedUserResponse = await fetch(
        `${process.env.REACT_APP_BASE_URL}/getfaculty/${search}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const searchData = await savedUserResponse.json();
      console.log('Search Response....', searchData);

      setFacultyData(searchData.data);

      // Faculty id in local storage
      const facultyId = searchData.data._id;
      localStorage.setItem('facultyId', facultyId);
      console.log(facultyId);
    } catch (error) {
      console.log('Error logging in', error);
    }
  };

  function reviewHandler(e) {
    e.preventDefault();

    const facultyDataInLocalStorage = JSON.stringify(facultydata);
    localStorage.setItem('facultydata', facultyDataInLocalStorage);

    const facultySearchInLocalStorage = JSON.stringify(search);
    localStorage.setItem('searchName', facultySearchInLocalStorage);

    navigate('/facultypage');
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Banner */}
      <div className="bg-blue-600 py-10">
        <h1 className="text-center text-white text-4xl font-bold">
          Welcome to Faculty Finder 👩‍🏫👨‍🏫
        </h1>
        <p className="text-center text-white text-lg mt-2">
          Discover information about your faculty members effortlessly.
        </p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-10">
        <div className="flex flex-col items-center">
          {/* <img
            src="https://example.com/faculty-banner.jpg" 
            alt="Faculty Banner"
            className="w-full max-w-3xl mx-auto mb-6 rounded-lg shadow-md"
          /> */}

          <label className="block mb-2 text-lg font-semibold text-gray-900">
            Search for a Faculty Member 🔍
          </label>
          <form className="max-w-sm mx-auto">
            <input
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md text-sm text-gray-900"
              type="text"
              placeholder="Enter faculty name"
              onChange={changeHandler}
              value={search}
            />
          </form>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={buttonHandler}
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Search Faculty
          </button>

          {facultydata && (
            <div className="text-center mt-6">
              <p className="text-lg font-medium">{facultydata.title}</p>
              <a href={facultydata.url}>
                <img
                  src={facultydata.image}
                  alt="Faculty_Photo"
                  width="250"
                  height="300"
                  className="mx-auto my-4 rounded-lg shadow-md"
                />
              </a>
            </div>
          )}

          <button
            onClick={reviewHandler}
            className="px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            View Reviews 📜
          </button>
        </div>

        {/* Footer Section */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            Can't find the faculty you're looking for? Feel free to contact us!
          </p>
          <p className="text-gray-600 mt-2">
            📧 Email: support@facultyfinder.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
