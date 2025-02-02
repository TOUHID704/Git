import React, { useState } from "react";
import "./RiderDashBoard.css";
import BookingRide from "../Rider/BookingRide";
import { useNavigate } from "react-router-dom";
const RiderDashboard = () => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleRideButton = () => {
    navigate("/ridePage");
  };

  const handleManageProfile = () => {
    navigate("/userprofile");
  };
  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-text">QuickCab</span>
          </div>
          <div className="auth-buttons">
            <button className="login-btn-header" onClick={toggleOptions}>
              Menu
            </button>
          </div>
        </div>
        {showOptions && (
          <div className="modal-options">
            <ul>
              <li onClick={handleRideButton}>Ride</li>
              <li onClick={handleManageProfile}>Manage Profile</li>
              <li>Wallet</li>
              <li>Sign Out</li>
            </ul>
          </div>
        )}
      </header>
      <BookingRide />
    </div>
  );
};

export default RiderDashboard;
