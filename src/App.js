import './App.css';
import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import noteContext from './context/noteContext';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/NoteState';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert'
import AddNote from './components/AddNote';
function App() {
  const context = useContext(noteContext)
  const { allAlert } = context;
  function first_signup() {
    if (localStorage.getItem('token') === "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNzA0NDY5NDk3fQ.uZX3xZzBt5GJY0ZhhtDQ9kPkTRURtvwcKq8wAYcnKPM") {
      allAlert("please login or sign up first", 'danger', { "display": "block" })
    }
  }
  useEffect(first_signup, [])
  return (
    <div>
      <Router>
        <NoteState>
          <Navbar companyName='Scribble pad' />
          <Alert />
          <div className="middle-content container" style={{ "padding": "0 10vw", "overflow": "hidden" }}>
            {/* all Routes */}
            <Routes>
              <Route path="/yournotes" element={<Home />} />
              <Route path="/" element={<AddNote />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </NoteState>
      </Router>
    </div>
  );
}
export default App;