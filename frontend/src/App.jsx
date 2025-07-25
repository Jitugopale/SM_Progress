import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import RegitserPage from './components/Authentication/RegitserPage.jsx'
import LoginPage from './components/Authentication/LoginPage.jsx';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<RegitserPage />} />
          <Route path="/login" element={<LoginPage/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App
