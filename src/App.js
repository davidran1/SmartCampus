import "./App.css";
import WaterPage from "./components/screens/learnMorePage/WaterPage.js";
import MicroClimaticPage from "./components/screens/learnMorePage/MicroClimaticPage.js";
import AirPage from "./components/screens/learnMorePage/AirPage.js";
import RecyclingPage from "./components/screens/learnMorePage/RecyclingPage.js";
import CleanlinessPage from "./components/screens/learnMorePage/CleanlinessPage.js";
import PowerPage from "./components/screens/learnMorePage/PowerPage.js";
import ContactUs from "./components/screens/ContactPage.js";
import Staff from "./components/screens/StaffPage.js";
import Students from "./components/screens/StudentsPage.js";
import NewsPage from "./components/screens/NewsPage.js";
import Header from "./components/MainHeader.js";
import Chatbot from "./components/Chatbot.js";
import Footer from "./components/Footer.js";
import MainPage from "./components/screens/MainPage.js";
import Login from "./components/screens/LoginRegisterPage/LoginPage.js";
import Register from "./components/screens/LoginRegisterPage/SignUpPage.js";
import AirDashboard from "./components/dashboard/AirDashboard.jsx";
import PowerDashboard from "./components/dashboard/PowerDashboard.jsx";
import WaterDashboard from "./components/dashboard/WaterDashboard.jsx";
import CleanlinessDashboard from "./components/dashboard/CleanlinessDashboard.jsx";
import RecyclingDashboard from "./components/dashboard/RecyclingDashboard.jsx";
import MicroClimaticDashboard from "./components/dashboard/MicroClimaticDashboard.jsx";

import AdminDashboard from "./components/screens/AdminPage/AdminDashboard";
import AdminUsersTable from "./components/screens/AdminPage/AdminUsersTable";
import AdminAlertCenter from "./components/screens/AdminPage/AdminAlertCenter";
import SensorStatistics from "./components/screens/AdminPage/SensorStatistics";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ValidTokenPage from "./components/screens/LoginRegisterPage/ValidTokenPage.js";
import LoadingScreen from "./components/screens/LoadingScreen.js";
import { useSelector } from "react-redux";

const AdminRoute = ({ element }) => {
  const role = useSelector((state) => state.userData.role);
  console.log("role is " + role);

  if (role !== 0) {
    //Redirect to login or unauthorized page if user is not an admin
    return <Navigate to="/" />;
  }
  return element;
};

const UserRoute = ({ element }) => {
  const role = useSelector((state) => state.userData.role);
  console.log("role is " + role);

  if (role === "") {
    //Redirect to login or unauthorized page if user is not logged in user
    return <Navigate to="/login" />;
  }
  return element;
};

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Chatbot
          title="Mapping of Hit College"
          src={"temp"}
          width="100%"
          height="100%"
          loading="lazy"
        />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/power" element={<PowerPage />} />
          <Route path="/air" element={<AirPage />} />
          <Route path="/water" element={<WaterPage />} />
          <Route
            path="/RecyclingGarbageEfficiency"
            element={<RecyclingPage />}
          />
          <Route path="/microClimatic" element={<MicroClimaticPage />} />
          <Route path="/cleanliness" element={<CleanlinessPage />} />
          <Route path="/students" element={<Students />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route
            path="/airDashboard"
            element={<UserRoute element={<AirDashboard />} />}
          />
          <Route
            path="/powerDashboard"
            element={<UserRoute element={<PowerDashboard />} />}
          />
          <Route
            path="/waterDashboard"
            element={<UserRoute element={<WaterDashboard />} />}
          />
          <Route
            path="/cleanlinessDashboard"
            element={<UserRoute element={<CleanlinessDashboard />} />}
          />
          <Route
            path="/MicroDashboard"
            element={<UserRoute element={<MicroClimaticDashboard />} />}
          />
          <Route
            path="/RecyclingGarbageEfficiencyDashboard"
            element={<UserRoute element={<RecyclingDashboard />} />}
          />
          <Route
            path="/admin"
            element={<AdminRoute element={<AdminDashboard />} />}
          />
          <Route
            path="/UsersTable"
            element={<AdminRoute element={<AdminUsersTable />} />}
          />
          <Route
            path="/SensorStatistics"
            element={<AdminRoute element={<SensorStatistics />} />}
          />
          <Route
            path="/AlertCenter"
            element={<AdminRoute element={<AdminAlertCenter />} />}
          />
          <Route path="/validateToken" element={<ValidTokenPage />} />
          <Route path="/loading" element={<LoadingScreen />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
