import { getCookie, setCookie } from "cookies-next";
import { BASE_URL, TOKEN_COOKIE } from "./constants";

export const getUserProjects = async () => {
  const token = getCookie(TOKEN_COOKIE);
  if (!token) {
    throw new Error("Token is undefined");
  }
  const res = await fetch(`${BASE_URL}/projects`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

export const createProject = async (data: any) => {
  const token = getCookie(TOKEN_COOKIE);
  const res = await fetch(`${BASE_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const updateProject = async (id: string, data: any) => {
  const token = getCookie(TOKEN_COOKIE);
  const res = await fetch(`${BASE_URL}/projects/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const getProjectById = async (id: string) => {
  const token = getCookie(TOKEN_COOKIE);
  const res = await fetch(`${BASE_URL}/projects/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};
