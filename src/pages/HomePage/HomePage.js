import "./HomePage.css";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import signUpApi from "../../api/signUpApi";
import loginApi from "../../api/loginApi";
import NavBar from "../../components/NavBar/NavBar";
import roleApi from "../../api/roleApi";

const SignUpSuccessModal = ({ setShowSignUpSuccess, setShowLogin }) => (
  <div className="modal-overlay">
    <div className="success-modal">
      <div className="success-message">
        <span className="checkmark">✔️</span>
        <h2>Sign Up Successful!</h2>
        <p>Successfully signed up. Please log in to continue.</p>
      </div>
      <button
        onClick={() => {
          setShowSignUpSuccess(false);
          setShowLogin(true);
        }}
        className="login-btn"
      >
        Hurray! Login
      </button>
    </div>
  </div>
);

// Separate Modal Components
const LoginModal = ({
  loginData,
  handleLoginChange,
  handleLogin,
  setShowLogin,
  setLoginData,
}) => (
  <div className="modal-overlay">
    <div className="login-modal">
      <h2>Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="input-field"
        value={loginData.email}
        onChange={handleLoginChange}
        autoFocus
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="input-field"
        value={loginData.password}
        onChange={handleLoginChange}
      />
      <button onClick={handleLogin} className="login-btn">
        Login
      </button>
      <button
        onClick={() => {
          setShowLogin(false);
          setLoginData({ email: "", password: "" });
        }}
        className="cancel-btn"
      >
        Cancel
      </button>
    </div>
  </div>
);

const SignUpModal = ({
  signUpData,
  handleSignUpChange,
  handleSignUp,
  setShowSignUp,
  setSignUpData,
}) => (
  <div className="modal-overlay">
    <div className="login-modal">
      <h2>Sign Up</h2>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        className="input-field"
        value={signUpData.name}
        onChange={handleSignUpChange}
        autoFocus
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="input-field"
        value={signUpData.email}
        onChange={handleSignUpChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="input-field"
        value={signUpData.password}
        onChange={handleSignUpChange}
      />
      <button onClick={handleSignUp} className="login-btn">
        Sign Up
      </button>
      <button
        onClick={() => {
          setShowSignUp(false);
          setSignUpData({ name: "", email: "", password: "" });
        }}
        className="cancel-btn"
      >
        Cancel
      </button>
    </div>
  </div>
);

const HomePage = () => {
  const navigate = useNavigate();
  const [showSignUpSuccess, setShowSignUpSuccess] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = async () => {
    try {
      // Call the API with the form data
      const response = await signUpApi(signUpData);

      if (response) {
        console.log("Sign up successful, navigating to login...");
        setShowSignUp(false);
        setSignUpData({
          name: "",
          email: "",
          password: "",
        });
        setShowSignUpSuccess(true);
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      alert("Sign Up failed. Please try again.");
    }
  };

  const handleLogin = async () => {
    const loginPayload = {
      email: loginData.email, // Use the email from the state
      password: loginData.password, // Use the password from the state
    };

    console.log("Attempting to log in with data:", loginPayload); // Log the payload for debugging

    try {
      // Call the API with the form data
      const response = await loginApi(loginPayload);

      // Check if the response is successful
      if (response) {
        console.log("Login successful, navigating to dashboard...");
        setLoginData({
          email: "",
          password: "",
        });
        // Navigate to dashboard or home page after successful login

        const email = loginPayload.email;

        const { timestamp, data, error } = await roleApi(email);

        // Check if the user has the required role
        if (data && data.includes("DRIVER") && data.includes("RIDER")) {
          navigate("/driverdashboard");
        } else if (data && data.includes("RIDER")) {
          navigate("/riderdashboard");
        }

        console.log("Login Data: ", JSON.stringify(response)); // Properly log the response
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="app-container">
      {/* Use the NavBar component here */}
      <NavBar setShowLogin={setShowLogin} setShowSignUp={setShowSignUp} />

      <section className="hero-section">
        <div className="hero-content">
          <h1>Your Ride, Your Way</h1>
          <p>
            Get to your destination safely and comfortably with our reliable
            ride-sharing service.
          </p>
          <div className="cta-buttons">
            <button className="cta-btn">Get a Ride</button>
            <button className="cta-btn secondary">Become a Driver</button>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="features-container">
          <div className="feature-item">
            <div className="feature-icon">🚗</div>
            <div className="feature-title">Fast Rides</div>
            <div className="feature-description">
              Get to your destination faster with our optimized routes.
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">⚡</div>
            <div className="feature-title">Affordable</div>
            <div className="feature-description">
              Enjoy budget-friendly prices with no hidden fees.
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🌍</div>
            <div className="feature-title">Available Everywhere</div>
            <div className="feature-description">
              Our service is available in cities across the globe.
            </div>
          </div>
        </div>
      </section>

      {showLogin && (
        <LoginModal
          loginData={loginData}
          handleLoginChange={handleLoginChange}
          handleLogin={handleLogin}
          setShowLogin={setShowLogin}
          setLoginData={setLoginData}
        />
      )}

      {showSignUp && (
        <SignUpModal
          signUpData={signUpData}
          handleSignUpChange={handleSignUpChange}
          handleSignUp={handleSignUp}
          setShowSignUp={setShowSignUp}
          setSignUpData={setSignUpData}
        />
      )}

      {showSignUpSuccess && (
        <SignUpSuccessModal
          setShowSignUpSuccess={setShowSignUpSuccess}
          setShowLogin={setShowLogin}
        />
      )}
    </div>
  );
};

export default HomePage;
