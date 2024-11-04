import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FacultyPage = () => {
  const navigate = useNavigate();
  const [inputdata, setInputData] = useState('');
  const [reviewdata, setReviewData] = useState([]);

  const searchName = localStorage.getItem('searchName');
  const search = JSON.parse(searchName);

  useEffect(() => {
    realtimeReview();
  }, []);

  const realtimeReview = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/getfaculty/${search}`, {

        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const facultyReview = await response.json();
      setReviewData(facultyReview.data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const changeHandler = (e) => setInputData(e.target.value);

  const buttonHandler = async (e) => {
    e.preventDefault();

    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    const storedFacultyId = localStorage.getItem('facultyId');
    const userName = localStorage.getItem('userName');

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: storedUserId,
          facultyId: storedFacultyId,
          userName: userName,
          review: inputdata,
        })
      });

      if (response.ok) {
        realtimeReview();
        setInputData('');
      } else {
        console.error('Failed to save user review');
        const res = await response.json();
        console.log(res);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const storedFacultyData = localStorage.getItem('facultydata');
  const parsedFacultyData = storedFacultyData ? JSON.parse(storedFacultyData) : null;

  return (
    <div className="flex flex-col items-center py-10 bg-gray-100 min-h-screen">
      {/* Faculty Info */}
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Faculty Page</h1>
        {parsedFacultyData && (
          <div className="flex flex-col items-center">
            <p className="text-lg font-semibold mb-2">{parsedFacultyData.title}</p>
            <img src={parsedFacultyData.image} alt="Faculty_Photo" className="w-48 h-60 object-cover rounded-md" />
          </div>
        )}
      </div>

      {/* Reviews Section */}
      <div className="bg-white p-6 mt-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-6 text-center">Reviews</h2>
        <div className="space-y-4">
          {reviewdata && reviewdata.review && reviewdata.review.map((item, index) => (
            <div key={index} className="pb-8 border-b border-gray-200 max-xl:max-w-3xl max-xl:mx-auto">
              <div className="flex sm:items-center flex-col sm:flex-row justify-between mb-4">
                <div className="flex items-center gap-3">
                  {Array(4).fill().map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                      <g clipPath="url(#clip0_13624_2974)">
                        <path d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z" fill="#FBBF24" />
                      </g>
                      <defs>
                        <clipPath id="clip0_13624_2974">
                          <rect width="30" height="30" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-500">{item.date}</p>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <p className="font-semibold text-lg text-black">{item.userName}</p>
                <p className="text-gray-500">verified student</p>
              </div>
              <p className="text-gray-500 mb-6">{item.review}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Review Input */}
      <form onSubmit={buttonHandler} className="mt-8 w-full max-w-2xl">
        <input
          type="text"
          placeholder="Write a review..."
          onChange={changeHandler}
          value={inputdata}
          className="border border-gray-300 p-2 mb-4 w-full rounded-lg focus:ring-2 focus:ring-gray-400"
        />
        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300"
        >
          Post the Review
        </button>
      </form>
    </div>
  );
};

export default FacultyPage;
