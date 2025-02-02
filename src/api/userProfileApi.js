const getTokenFromCookie = () => {
  const name = "token="; // Use the cookie name "token"
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length); // Return the token value
    }
  }
  return null; // Token not found
};

const userProfileApi = async () => {
  const token = getTokenFromCookie(); // Get the token from the cookie
  try {
    const response = await fetch("http://localhost:8080/rider/getMyProfile", {
      method: "GET",
      credentials: "include", // Include cookies in the request
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });

    if (response.ok) {
      const data = await response.json(); // Parse JSON response
      return data;
    } else {
      console.error("Failed to fetch user profile:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

export default userProfileApi;
