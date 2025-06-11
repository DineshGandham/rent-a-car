import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import CarList from './pages/HomePage';
import Booking from './pages/Bookings';
import PageLayout from './components/PageLayout';
import Vehicles from './pages/Vehicles';
import Register from './pages/Register';
import ForgotPassword from "./pages/ForgotPassword";
import { useSelector } from 'react-redux';
import CarLoader from './components/CarLoader';

function App() {
  const { loading } = useSelector(state => state.auth);
  return (
    <>
     {loading && <CarLoader />}
    <Router>
      <PageLayout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cars" element={<CarList />} />
        <Route path="/bookings" element={<Booking />} />
        <Route path="/vehicles" element={<Vehicles/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<CarList />} />
      </Routes>
      </PageLayout>
    </Router>
    </>
  );
}

export default App;
