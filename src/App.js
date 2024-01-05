import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/NoteState';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert'

function App() {
  return (
    <div>
        <Router>
      <NoteState>
        <Navbar companyName='inotebook'/>
        <Alert/>
          <div className="middle-content container">
            {/* all Routes */}
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
            </Routes>
          </div>
      </NoteState>
        </Router>
    </div>
  );
}
export default App;