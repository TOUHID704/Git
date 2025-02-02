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

// API to fetch ride details by rideId
export const getRideDetails = async (rideId) => {
  const token = getTokenFromCookie();
  try {
    const response = await fetch(`${BASE_URL}/getMyRide/${rideId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch ride details.");

    return await response.json();
  } catch (error) {
    console.error("Error fetching ride details:", error);
    throw error;
  }
};
