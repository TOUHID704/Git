import React, { useState, useEffect } from "react";
import "./Modal.css";
import { useNavigate } from "react-router-dom";

const Modal = ({ isVisible, onClose, content }) => {
  const [progress, setProgress] = useState(0); // To track the progress of finding the driver
  const [status, setStatus] = useState("Finding a Driver..."); // Initial status
  const [elapsedTime, setElapsedTime] = useState(0); // Track the elapsed time
  const [findDriver, setFindDriver] = useState(false); // Boolean to simulate finding the driver
  const navigate = useNavigate();

  // Mock finding the driver process (you can replace with actual API response)
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      if (findDriver) {
        setProgress(100); // Set progress to 100 when driver is found
        setStatus("Driver Found! 🚗");
        clearInterval(interval); // Stop the interval when driver is found
        setTimeout(() => {
          navigate("/riderdashboard"); // Redirect after a short delay
        }, 2000);
      } else {
        // If findDriver is false, keep filling the progress bar
        setProgress((prev) => {
          if (prev < 100) {
            return prev + 2; // Increase the progress
          } else {
            clearInterval(interval); // Stop the interval if progress reaches 100%
            return prev;
          }
        });
      }

      // Elapsed Time tracking (increasing every second)
      if (!findDriver) {
        setElapsedTime((prevTime) => prevTime + 1); // Increment the elapsed time
      }
    }, 1000); // Runs every second

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [isVisible, findDriver, navigate]);

  if (!isVisible) return null; // Return null if modal is not visible

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
          X
        </button>
        <div className="modal-body">
          <h2>{status}</h2>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="timer">
            <p>{`Time elapsed: ${elapsedTime}s`}</p>
          </div>
          {status === "Driver Found! 🚗" && (
            <p>Your ride is ready! Redirecting...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
