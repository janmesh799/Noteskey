export const backendUrl = "https://plannerpulse.onrender.com";
// export const backendUrl = "http://localhost:5000";
export const authTokenName = "authToken";

export const getAuthToken = (): string => {
  const token: string | null = localStorage.getItem(authTokenName);
  if (!token) return "";
  return token;
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem(authTokenName, token);
  return;
};
