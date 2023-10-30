import logo from './logo.svg';
import './App.css';
import  {useState} from 'react'
import { BrowserRouter as Router, Route, Switch,Routes } from 'react-router-dom';
import ProblemList from './pages/ProblemList';
import ProblemEditor from './pages/ProblemEditor';
import Navbar from "./components/Navbar"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set initial login state
  return (
    <div className="App">
      
       <Router>
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/ProblemList"  element={<ProblemList />} />
          <Route path="/problem/:id" element={<ProblemEditor/>} />
        </Routes>
      </Router>
      {/* Other components and content of your application */}
    </div>
  );
}

export default App;
