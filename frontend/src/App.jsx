import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import RegitserPage from './components/Authentication/RegitserPage.jsx'
import LoginPage from './components/Authentication/LoginPage.jsx';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import Dashboard from './components/Dashboard/Dashboard';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<RegitserPage />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App
