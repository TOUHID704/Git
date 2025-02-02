import React, { useEffect, useState } from "react";
import { getRideDetails } from "../../api/getMyRideApi";
import "./ActiveRide.css";

const ActiveRides = ({ rideId, onRideEnd }) => {
  const [ride, setRide] = useState(null);

  useEffect(() => {
    const fetchRideData = async () => {
      if (!rideId) {
        console.error("No rideId provided");
        return;
      }

      try {
        const response = await getRideDetails(rideId);
        console.log("Fetched Ride Data:", response);
        if (response && response.data) {
          if (response.data.rideStatus === "ENDED") {
            onRideEnd(); // Call the parent function to switch to history view
            return;
          }
          setRide(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch ride data:", error);
      }
    };

    fetchRideData();
    const interval = setInterval(fetchRideData, 30000);

    return () => clearInterval(interval);
  }, [rideId, onRideEnd]);

  if (!ride) {
    return (
      <div className="active-rides-container">
        <div className="loading-container">No active ride found</div>
      </div>
    );
  }

  return (
    <div className="active-rides-container">
      <div className="ride-card">
        <h3>Ride Request ID: {ride.rideId}</h3>
        <p>
          Pickup Location:{" "}
          {ride.pickupLocation?.coordinates?.join(", ") || "N/A"}
        </p>
        <p>
          Drop-off Location:{" "}
          {ride.dropOffLocation?.coordinates?.join(", ") || "N/A"}
        </p>
        <p>Fare: ${ride.fare?.toFixed(2) || "N/A"}</p>
        <p>Status: {ride.rideStatus || "N/A"}</p>
        <p>Payment Method: {ride.paymentMethod || "N/A"}</p>
        <p>Ride OTP: {ride.otp || "N/A"}</p>
        <p>Driver Name: {ride.driver?.user?.name || "N/A"}</p>
        <p>Vehicle ID: {ride.driver?.vehicleId || "N/A"}</p>
        <p>Started At: {ride.startedAt || "N/A"}</p>
        <p>Ended At: {ride.endedAt || "N/A"}</p>
      </div>
    </div>
  );
};

export default ActiveRides;
