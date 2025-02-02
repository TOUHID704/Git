import React, { useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import ActiveRides from "./ActiveRides";
import HistoryRides from "./HistoryRides";
import "./RideDashboard.css";

const RideDashboard = () => {
  const location = useLocation();
  const rideId = location.state?.rideId;

  const [isActiveRidesPage, setIsActiveRidesPage] = useState(true);
  const [isHistoryRidesPage, setIsHistoryRidesPage] = useState(false);

  const showActiveRidesPage = () => {
    setIsHistoryRidesPage(false);
    setIsActiveRidesPage(true);
  };

  const showHistoryRidesPage = useCallback(() => {
    setIsActiveRidesPage(false);
    setIsHistoryRidesPage(true);
  }, []);

  return (
    <div className="ride-dashboard-container">
      <div className="ride-button-container">
        <button
          onClick={showActiveRidesPage}
          className={`active-rides ${isActiveRidesPage ? "active" : ""}`}
        >
          Active Rides
        </button>
        <button
          onClick={showHistoryRidesPage}
          className={`history-rides ${isHistoryRidesPage ? "active" : ""}`}
        >
          History
        </button>
      </div>

      {isActiveRidesPage && (
        <ActiveRides rideId={rideId} onRideEnd={showHistoryRidesPage} />
      )}
      {isHistoryRidesPage && <HistoryRides />}
    </div>
  );
};

export default RideDashboard;
