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
  return null;
};

// API to fetch ride history
export const getRideHistory = async () => {
  const token = getTokenFromCookie();
  try {
    const response = await fetch(`${BASE_URL}/getMyRides/history`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch ride history.");

    return await response.json();
  } catch (error) {
    console.error("Error fetching ride history:", error);
    throw error;
  }
};
