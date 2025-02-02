import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use Routes instead of Switch
import SignUp from "./pages/SignUpPage/SignUp";
import UserProfile from "../src/pages/UserProfilePage/UserProfile";
import RiderDashBoard from "./pages/RiderDashBoard/RiderDashBoard";
import BookingRide from "./pages/Rider/BookingRide";
import "leaflet/dist/leaflet.css"; // Leaflet CSS for styling

// Import Leaflet and configure marker icons
import L from "leaflet";
import HomePage from "./pages/HomePage/HomePage";
import RideDashBoard from "./pages/RideDashBoard/RideDashBoard";
import PickVehicle from "./components/PickVehicle/PickVehicle";
import DriverHome from "./pages/DriverDashBoard/DriverHome";

// Fix Leaflet marker icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/riderdashboard" element={<RiderDashBoard />} />
        <Route path="/driverdashboard" element={<DriverHome />} />
        <Route path="/bookingRide" element={<BookingRide />} />
        <Route path="/ridePage" element={<RideDashBoard />} />
        <Route path="/pickVehicle" element={<PickVehicle />} />
      </Routes>
    </Router>
  );
}

export default App;
