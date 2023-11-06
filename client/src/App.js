import logo from './logo.svg';
import './App.css';
import  {useState} from 'react'
import { BrowserRouter as Router, Route, Switch,Routes } from 'react-router-dom';
import ProblemList from './pages/ProblemList';
import ProblemEditor from './pages/ProblemEditor';
import Navbar from "./components/Navbar"
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set initial login state
  return (
    <div className="App">
  
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/ProblemList"  element={<ProblemList />} />
          <Route path="/problem/:problemId" element={<ProblemEditor/>} />
          <Route path="/login" element={<Login />}  />
          <Route path="/" element={<LandingPage />} ></Route>
          <Route path="/signup" element={<Signup />} />
        </Routes>
    
      {/* Other components and content of your application */}
    </div>
  );
}

export default App;
