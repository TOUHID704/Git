const loginApi = async (loginData) => {
  try {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Login successful:", data);
      return data; // Return the response data
    } else {
      console.error("Login failed with status:", response.status);
      alert("Login failed. Please check your credentials.");
      return null; // Explicitly return null for failure
    }
  } catch (error) {
    console.error("Error during login API call:", error);
    throw error; // Rethrow the error to be caught in the calling function
  }
};

export default loginApi;
