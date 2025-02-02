import React, { useEffect, useState } from "react";
import "./DriverHome.css";
import { getAllRides, acceptRide, rejectRide } from "../../api/DriverApi";

const DriverHome = () => {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await getAllRides();
        setRides(response.data || []);
      } catch (error) {
        console.error("Error fetching rides:", error);
        alert("Failed to fetch ride requests.");
      }
    };
    fetchRides();
  }, []);

  const handleAccept = async (rideId) => {
    try {
      await acceptRide(rideId);
      alert(`Ride ${rideId} accepted successfully!`);
      setRides(rides.filter((ride) => ride.rideRequestId !== rideId));
    } catch (error) {
      console.error("Error accepting ride:", error);
      alert("Failed to accept the ride.");
    }
  };

  const handleReject = async (rideId) => {
    try {
      await rejectRide(rideId);
      alert(`Ride ${rideId} rejected successfully!`);
      setRides(rides.filter((ride) => ride.rideRequestId !== rideId));
    } catch (error) {
      console.error("Error rejecting ride:", error);
      alert("Failed to reject the ride.");
    }
  };

  return (
    <div className="driver-home">
      <h1>Driver Dashboard</h1>
      {rides.length === 0 ? (
        <p>No ride requests available.</p>
      ) : (
        <div className="ride-cards">
          {rides.map((ride) => (
            <div key={ride.rideRequestId} className="ride-card">
              <h2>Ride Request #{ride.rideRequestId}</h2>
              <p>
                <strong>Pickup Location:</strong>{" "}
                {ride.pickupLocation.coordinates.join(", ")}
              </p>
              <p>
                <strong>Drop-off Location:</strong>{" "}
                {ride.dropOffLocation.coordinates.join(", ")}
              </p>
              <p>
                <strong>Fare:</strong> ${ride.fare.toFixed(2)}
              </p>
              <p>
                <strong>Requested Time:</strong>{" "}
                {new Date(ride.rideRequestedTime).toLocaleString()}
              </p>
              <p>
                <strong>Rider Name:</strong> {ride.rider.user.name}
              </p>
              <p>
                <strong>Payment Method:</strong> {ride.paymentMethod}
              </p>
              <div className="ride-actions">
                <button
                  className="accept-btn"
                  onClick={() => handleAccept(ride.rideRequestId)}
                >
                  Accept
                </button>
                <button
                  className="reject-btn"
                  onClick={() => handleReject(ride.rideRequestId)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DriverHome;
