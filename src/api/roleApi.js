const roleApi = async (email) => {
  try {
    const response = await fetch(
      `http://localhost:8080/auth/getRolesByEmail?email=${email}`,
      {
        method: "GET",
        credentials: "include", // Assuming authentication is needed
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const roles = await response.json();
      console.log("Roles fetched successfully:", roles);
      return roles; // Return the roles data
    } else {
      console.error("Failed to fetch roles with status:", response.status);
      alert("Failed to fetch roles. Please try again.");
      return null; // Explicitly return null for failure
    }
  } catch (error) {
    console.error("Error during role API call:", error);
    throw error; // Rethrow the error to be caught in the calling function
  }
};

export default roleApi;
