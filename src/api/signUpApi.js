const signUpApi = async (formData) => {
  try {
    // Call the API
    const response = await fetch("http://localhost:8080/auth/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Send formData as JSON
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Sign-Up Successful:", data);
      return data; // Return the response data
    } else {
      console.error("Sign-Up Failed:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export default signUpApi;
