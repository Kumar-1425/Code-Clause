import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Gallery from './components/Gallery.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [backgroundGradient, setBackgroundGradient] = useState('');
  const navigate = useNavigate(); // Get the navigation function

  useEffect(() => {
    const gradients = [
      'linear-gradient(to right, #ff5733, #ff33a1)',
      'linear-gradient(to right, #33ff57, #3357ff)',
      'linear-gradient(to right, #ff33a1, #33a1ff)',
      'linear-gradient(to right, #a1ff33, #33ff57)',
      'linear-gradient(to right, #33a1ff, #ff5733)',
      'linear-gradient(to right, #3357ff, #a1ff33)',
    ];

    const changeGradient = () => {
      const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
      setBackgroundGradient(randomGradient);
    };

    const intervalId = setInterval(changeGradient, 3000); // Change gradient every 3 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const handleGalleryNavigation = () => {
    navigate('/gallery'); // Navigate to the gallery route
  };

  return (
    <div className="App" style={{ background: backgroundGradient, height: '100vh' }}>
      <div className="content-container">
        <h1>Welcome to the Image Gallery</h1>
        <p>Click below to navigate to your gallery and start uploading your images!</p>
        <button onClick={handleGalleryNavigation} className="btn btn-primary">Go to Gallery</button>
      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;
