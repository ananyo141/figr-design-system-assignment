import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { BASE_URL, TOKEN_COOKIE } from "./constants";

// Function to signup a new user
export const signupUser = async (userData: {
  email: string;
  password: string;
  name: string;
}) => {
  const res = await fetch(`${BASE_URL}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  // Optionally set a cookie if the signup process returns a token
  return data;
};

// Function to login a user
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const res = await fetch(`${BASE_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const data = await res.json();
  // Set a cookie with the token on successful login
  const token = data.data.token
  console.log(token)
  if (token) {
    setCookie(TOKEN_COOKIE, token);
  }
  return data;
};

// Function to update user details
export const updateUser = async (userId: string, updateData: any) => {
  const token = getCookie(TOKEN_COOKIE);
  if (!token) {
    throw new Error("Token is undefined");
  }
  const res = await fetch(`${BASE_URL}/user/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  });
  return await res.json();
};

// Function to sign out the current user
export const signoutUser = () => {
  // Delete the authToken cookie to effectively sign out the user
  deleteCookie(TOKEN_COOKIE);
};
