import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import NoteState from './context/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import HomePage from './components/HomePage';
import FacultyPage from './components/FacultyPage';
import FirstPage from './components/FirstPage';
import Jwtdecode from './components/Jwtdecode';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === '/') {
      window.location.href = '/faculty.html';
    }
  }, [navigate]);

  return (
    <NoteState>
      <div>
        <Header />
        <Routes>
          <Route path='/jwt' element={<Jwtdecode />} />
          <Route path='/homepage' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/facultypage' element={<FacultyPage />} />
        </Routes>
        <Footer />
      </div>
    </NoteState>
  );
};

export default App;
