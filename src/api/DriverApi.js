const BASE_URL = "http://localhost:8080/driver";

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

// API to fetch all rides
export const getAllRides = async () => {
  const token = getTokenFromCookie();
  try {
    const response = await fetch(`${BASE_URL}/showAllRequests`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch rides.");
    return await response.json();
  } catch (error) {
    console.error("Error fetching rides:", error);
    throw error;
  }
};

// API to accept a ride
export const acceptRide = async (rideId) => {
  const token = getTokenFromCookie();
  try {
    const response = await fetch(`${BASE_URL}/acceptRide/${rideId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to accept the ride.");
    return await response.json();
  } catch (error) {
    console.error("Error accepting ride:", error);
    throw error;
  }
};

// API to reject a ride
export const rejectRide = async (rideId) => {
  const token = getTokenFromCookie();
  try {
    const response = await fetch(`${BASE_URL}/rejectRide/${rideId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to reject the ride.");
    return await response.json();
  } catch (error) {
    console.error("Error rejecting ride:", error);
    throw error;
  }
};
