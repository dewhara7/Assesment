import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar'; // Import Navbar
import Home from './Home'; // Import Home component
import Register from './Register';
import Admission from './admission'; // Import Register component
import UpdateUser from "./UpdateUser";
const App = () => {
  return (
    <Router>
      <div>
        <Navbar /> {/* Add Navbar to the layout */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home route */}
          <Route path="/register" element={<Register />} /> {/* Register route */}
          <Route path="/admission" element={<Admission />} />
          <Route path="/updateUser/:id" element={<UpdateUser />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
