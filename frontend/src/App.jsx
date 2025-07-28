import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import RegitserPage from './components/Authentication/RegitserPage.jsx'
import LoginPage from './components/Authentication/LoginPage.jsx';
import Dashboard from './components/MainPage/UsersDashboard/Dashboard';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import MainPage from './components/MainPage/MainPage';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<RegitserPage />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/dashboard" element={<MainPage/>} >
               <Route index element={<Dashboard/>} />
              {/* <Route path="product" element={<ProductMaster/>} />
              <Route path="operations" element={<AddUpdate/>} />
              <Route path="staff" element={<StaffMaster/>} />
              <Route path="call" element={<CallMaster/>} />
              <Route path="service" element={<ServiceMaster/>} />
              <Route path="customer" element={<CustomerMaster/>} />
              <Route path="request" element={<RequestMaster/>} />
              <Route path="delivered" element={<ProductDelivery/>} /> */}
          </Route>
          <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App
