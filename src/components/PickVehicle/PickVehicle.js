import React, { useState } from "react";
import "./PickVehicle.css";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";

const PickVehicle = () => {
  const [isModalVisible, setModalVisibility] = useState(false); // Modal is hidden by default
  const [selectedVehicle, setSelectedVehicle] = useState(null); // Track selected vehicle

  const navigate = useNavigate(); // Correctly invoke useNavigate

  const showModal = (vehicle) => {
    setSelectedVehicle(vehicle); // Set the selected vehicle
    setModalVisibility(true); // Show the modal
  };

  const hideModal = () => {
    setModalVisibility(false); // Hide the modal
    setSelectedVehicle(null); // Reset selected vehicle
  };

  const vehicles = [
    {
      id: 1,
      name: "Bike",
      description: "Fast & affordable 🏍️",
      icon: "🏍️",
      eta: "3 mins away",
      price: "₹20",
    },
    {
      id: 2,
      name: "Auto",
      description: "Three wheeler 🛺",
      icon: "🛺",
      eta: "4 mins away",
      price: "₹30",
    },
    {
      id: 3,
      name: "Mini",
      description: "Compact car 🚗",
      icon: "🚗",
      eta: "5 mins away",
      price: "₹40",
    },
    {
      id: 4,
      name: "Sedan",
      description: "Comfortable sedan 🚙",
      icon: "🚙",
      eta: "6 mins away",
      price: "₹50",
    },
  ];

  return (
    <div className="pick-vehicle-page">
      <div className="page-header">
        <h1>Select Your Ride 🚖</h1>
      </div>

      <div className="vehicles-container">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="vehicle-option"
            onClick={() => showModal(vehicle)} // Pass the vehicle to the modal
          >
            <div className="vehicle-details">
              <span className="vehicle-icon">{vehicle.icon}</span>
              <div className="vehicle-info">
                <h3>{vehicle.name}</h3>
                <p>{vehicle.description}</p>
                <span className="eta">{vehicle.eta}</span>
              </div>
            </div>
            <div className="price-tag">
              <span>{vehicle.price}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Component */}
      <Modal
        isVisible={isModalVisible}
        onClose={hideModal}
        content={
          selectedVehicle && (
            <div>
              <h2>{selectedVehicle.name}</h2>
              <p>{selectedVehicle.description}</p>
              <p>
                <strong>ETA:</strong> {selectedVehicle.eta}
              </p>
              <p>
                <strong>Price:</strong> {selectedVehicle.price}
              </p>
              <button onClick={() => navigate("/confirm-ride")}>
                Confirm Ride
              </button>
            </div>
          )
        }
      />
    </div>
  );
};

export default PickVehicle;
