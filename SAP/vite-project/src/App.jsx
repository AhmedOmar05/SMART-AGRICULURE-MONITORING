import Auth  from './components/Auth';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Dashboard from './components/Dashboard'; // Your dashboard component
import LandingPage from  "./components/LangingPage";
import Navbar  from './components/Navbar';



function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LandingPage />} />
        <Route path="/Auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Navabr" element={<Navbar/>}/>
      </Routes>
    </Router>
  );
}
export default App
//<Route path="/" element={<LandingPage />} />; //<Route path="/dashboard" element={<Dashboard />} />
//<Route path="/Navabr" element={<Navbar/>}/>@plugin "daisyui";