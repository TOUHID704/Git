import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signUpApi from "../../api/signUpApi"; // Import the API function

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleNameChange = (e) => {
    setName(e.target.value);  
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const submitUserDetails = async () => {
    // Construct the payload
    const formData = { name, email, password };

    try {
      // Call the API
      const response = await signUpApi(formData);

      // Navigate to login on success
      if (response) {
        console.log("Navigating to login...");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
  };

  return (
    <div>
      <h1>SignUp Page</h1>
      <label>Name</label>
      <input type="text" id="name" value={name} onChange={handleNameChange} />
      <br />
      <br />
      <label>Email</label>
      <input
        type="text"
        id="email"
        value={email}
        onChange={handleEmailChange}
      />
      <br />
      <br />
      <label>Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <br />
      <br />

      <button onClick={submitUserDetails}>Submit</button>

      <br />
      <br />

      <div>Output</div>
      <div>Name: {name}</div>
      <div>Email: {email}</div>
      <div>Password: {password}</div>
    </div>
  );
};

export default SignUp;
