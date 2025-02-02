import React, { useState, useEffect } from "react";
import "../Rider/BookingRide.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { getTokenFromCookie } from "../../../src/utils/tokenUtils";
import { useNavigate } from "react-router-dom";
import { getRideRequestStatus } from "../../api/getRideStatusApi";

const LocationInitializer = ({ onLocationFound }) => {
  const map = useMap();

  useEffect(() => {
    const locationHandler = (e) => {
      map.flyTo(e.latlng, map.getZoom());
      onLocationFound([e.latlng.lng, e.latlng.lat]);
    };

    map.locate();
    map.on("locationfound", locationHandler);

    return () => {
      map.off("locationfound", locationHandler);
    };
  }, [map, onLocationFound]);

  return null;
};

const LocationPicker = ({ onLocationSelect }) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onLocationSelect([lng, lat]);
    },
  });

  return null;
};

const searchLocations = async (query) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}`
    );
    const data = await response.json();

    return data.map((item) => ({
      label: item.display_name,
      value: [parseFloat(item.lon), parseFloat(item.lat)],
    }));
  } catch (error) {
    console.error("Error searching locations:", error);
    return [];
  }
};

const reverseGeocode = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();
    return data.display_name;
  } catch (error) {
    console.error("Error reverse geocoding:", error);
    return "";
  }
};

const BookingRide = () => {
  const navigate = useNavigate();

  const [currentLocation, setCurrentLocation] = useState(null);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropLocation, setDropLocation] = useState(null);
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropAddress, setDropAddress] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropSuggestions, setDropSuggestions] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("WALLET");
  const [loading, setLoading] = useState(false);

  const handlePickupSearch = async (value) => {
    setPickupAddress(value);
    if (value.length > 2) {
      const suggestions = await searchLocations(value);
      setPickupSuggestions(suggestions);
    } else {
      setPickupSuggestions([]);
    }
  };

  const handleDropSearch = async (value) => {
    setDropAddress(value);
    if (value.length > 2) {
      const suggestions = await searchLocations(value);
      setDropSuggestions(suggestions);
    } else {
      setDropSuggestions([]);
    }
  };

  const handlePickupSelect = (suggestion) => {
    setPickupAddress(suggestion.label);
    setPickupLocation(suggestion.value);
    setPickupSuggestions([]);
  };

  const handleDropSelect = (suggestion) => {
    setDropAddress(suggestion.label);
    setDropLocation(suggestion.value);
    setDropSuggestions([]);
  };

  const handleRequestRide = async () => {
    if (!pickupLocation || !dropLocation) {
      alert("Please select both pickup and drop locations");
      return;
    }

    setLoading(true);
    const token = getTokenFromCookie();

    if (!token) {
      alert("No token found. Please login again.");
      setLoading(false);
      navigate("/login");
      return;
    }

    try {
      const requestData = {
        pickupLocation: {
          coordinates: pickupLocation,
        },
        dropOffLocation: {
          coordinates: dropLocation,
        },
        paymentMethod,
      };

      const response = await fetch("http://localhost:8080/rider/requestRide", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const responseData = await response.json();
        const rideRequestId = responseData.data.rideRequestId;
        alert("Finding a driver");

        let polling = true;
        while (polling) {
          try {
            const rideResponse = await getRideRequestStatus(rideRequestId);
            if (rideResponse && rideResponse.data) {
              console.log("Ride Found:", rideResponse.data);
              polling = false;
              navigate("/ridePage", {
                state: { rideId: rideResponse.data.rideId },
              });
            } else {
              // Wait for 5 seconds before next poll
              console.log("Waiting for driver to accept...");
              await new Promise((resolve) => setTimeout(resolve, 5000));
            }
          } catch (error) {
            // If it's a 404, continue polling
            if (error.response && error.response.status === 404) {
              console.log("Waiting for driver to accept...");
              await new Promise((resolve) => setTimeout(resolve, 5000));
              continue;
            }
            // For other errors, log but continue polling
            console.log("Error checking ride status:", error);
            await new Promise((resolve) => setTimeout(resolve, 5000));
          }
        }
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to request ride");
      }
    } catch (error) {
      // Only show error alert for unexpected errors
      if (!error.message?.includes("404")) {
        console.error("Error requesting ride:", error);
        alert("Error requesting ride");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-container">
      <div className="booking-form">
        <h2>Book a Ride</h2>

        <div className="form-group">
          <label>Pickup Location</label>
          <input
            type="text"
            value={pickupAddress}
            onChange={(e) => handlePickupSearch(e.target.value)}
            placeholder="Enter pickup location"
          />
          {pickupSuggestions.length > 0 && (
            <div className="suggestions-container">
              {pickupSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => handlePickupSelect(suggestion)}
                >
                  {suggestion.label}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Drop Location</label>
          <input
            type="text"
            value={dropAddress}
            onChange={(e) => handleDropSearch(e.target.value)}
            placeholder="Enter drop location"
          />
          {dropSuggestions.length > 0 && (
            <div className="suggestions-container">
              {dropSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleDropSelect(suggestion)}
                >
                  {suggestion.label}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="WALLET">Wallet</option>
            <option value="CARD">Card</option>
            <option value="CASH">Cash</option>
          </select>
        </div>

        <div className="button-group">
          <button
            className="request-button"
            onClick={handleRequestRide}
            disabled={!pickupLocation || !dropLocation || loading}
          >
            {loading ? "Requesting..." : "Request Ride"}
          </button>
        </div>
      </div>

      <div className="map-container">
        <MapContainer center={[19.076, 72.8777]} zoom={13} className="map">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <LocationInitializer onLocationFound={setCurrentLocation} />
          <LocationPicker
            onLocationSelect={(coords) => {
              if (!pickupLocation) {
                setPickupLocation(coords);
                reverseGeocode(coords[1], coords[0]).then(setPickupAddress);
              } else if (!dropLocation) {
                setDropLocation(coords);
                reverseGeocode(coords[1], coords[0]).then(setDropAddress);
              }
            }}
          />
          {currentLocation && (
            <Marker position={[currentLocation[1], currentLocation[0]]} />
          )}
          {pickupLocation && (
            <Marker position={[pickupLocation[1], pickupLocation[0]]} />
          )}
          {dropLocation && (
            <Marker position={[dropLocation[1], dropLocation[0]]} />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default BookingRide;
