const logOutApi = async () => {
  try {
    const response = await fetch("http://localhost:8080/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.text(); // Parse the response as text
      console.log("Logout successful:", data);
      return data; // Return the response text
    } else {
      console.error("Logout failed:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export default logOutApi;
