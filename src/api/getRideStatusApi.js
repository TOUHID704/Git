const BASE_URL = "http://localhost:8080/rider";

// Helper function to get the token from cookies
const getTokenFromCookie = () => {
  const name = "token=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null; // Token not found
};

// API to fetch the status of a specific ride request
export const getRideRequestStatus = async (rideRequestId) => {
  const token = getTokenFromCookie();
  try {
    const response = await fetch(`${BASE_URL}/rides/${rideRequestId}/status`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch ride request status.");
    return await response.json();
  } catch (error) {
    console.error("Error fetching ride request status:", error);
    throw error;
  }
};
