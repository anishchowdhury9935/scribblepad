import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import YourNotes from './components/YourNotes';
import About from './components/About';
import NoteState from './context/NoteState';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert'
import AddNote from './components/AddNote';
import Home from './components/Home';
function App() {
  return (
    <div>
      <Router>
        <NoteState>
          <Navbar companyName='Scribble pad' />
          <Alert />
          <div className="middle-content container" style={{ "padding": "0 10vw", "overflow": "hidden" }}>
            {/* all Routes */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/AddNote" element={<AddNote />} />
              <Route path="/yournotes" element={<YourNotes />} />
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