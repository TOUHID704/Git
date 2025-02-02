import React, { useEffect, useState } from "react";
import { getRideHistory } from "../../api/RideHistoryApi";
import "../RideDashBoard/HistoryRide.css";

const HistoryRides = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRideHistory = async () => {
      try {
        const response = await getRideHistory();
        if (response && response.data) {
          setRides(response.data.content);
        }
      } catch (error) {
        console.error("Failed to fetch ride history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRideHistory();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  const formatDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return "N/A";
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffMinutes = Math.floor((end - start) / (1000 * 60));
    return `${diffMinutes} minutes`;
  };

  if (loading) {
    return (
      <div className="history-rides-container">
        <div className="loading">Loading ride history...</div>
      </div>
    );
  }

  return (
    <div className="history-rides-container">
      <h2>Ride History</h2>
      <div className="ride-cards-grid">
        {rides.map((ride) => (
          <div key={ride.rideId} className="ride-history-card">
            <div className="ride-header">
              <h3>Ride #{ride.rideId}</h3>
              <span className={`status ${ride.rideStatus.toLowerCase()}`}>
                {ride.rideStatus}
              </span>
            </div>

            <div className="ride-details">
              <div className="detail-row">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <strong>Pickup:</strong>
                  <p>{ride.pickupLocation.coordinates.join(", ")}</p>
                </div>
              </div>

              <div className="detail-row">
                <i className="fas fa-flag-checkered"></i>
                <div>
                  <strong>Drop-off:</strong>
                  <p>{ride.dropOffLocation.coordinates.join(", ")}</p>
                </div>
              </div>

              <div className="detail-row">
                <i className="fas fa-user"></i>
                <div>
                  <strong>Driver:</strong>
                  <p>{ride.driver.user.name}</p>
                </div>
              </div>

              <div className="ride-meta">
                <div>
                  <strong>Fare:</strong>
                  <p>${ride.fare.toFixed(2)}</p>
                </div>
                <div>
                  <strong>Payment:</strong>
                  <p>{ride.paymentMethod}</p>
                </div>
                <div>
                  <strong>Duration:</strong>
                  <p>{formatDuration(ride.startedAt, ride.endedAt)}</p>
                </div>
              </div>

              <div className="ride-timestamps">
                <small>Started: {formatDate(ride.startedAt)}</small>
                <small>Ended: {formatDate(ride.endedAt)}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryRides;
