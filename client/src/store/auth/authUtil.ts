export const backendUrl = "https://plannerpulse.onrender.com";
// export const backendUrl = "http://localhost:5000";
export const authTokenName = "authToken";

export const getAuthToken = (): string => {
  if (typeof window !== "undefined") {
    const token: string | null = localStorage.getItem(authTokenName);
    if (!token) return "";
    return token;
  }
  return ""; // Return an empty string if running on the server
};


export const setAuthToken = (token: string): void => {
  localStorage.setItem(authTokenName, token);
  return;
};
