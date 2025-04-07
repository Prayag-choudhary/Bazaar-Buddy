import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Profile from './components/profile';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import Capture from './components/capture';

// New Components
import Category from './components/category';
import Bookmarks from './components/Bookmarks';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Category />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/capture" element={<Capture />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;

