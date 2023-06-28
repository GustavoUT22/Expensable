import apiFetch from "./api-fetch.js";
import { tokenKey } from "../config.js";

export async function loginService(email, password) {
  const credentials = {
    email,
    password,
  };

  const { token, ...user } = await apiFetch("login", { body: credentials });
  sessionStorage.setItem(tokenKey, token);
  return user;
}



export async function createUser(email, password, first_name, last_name, phone) {
  const newUser = {email, password, first_name, last_name, phone}
  const { token, ...user } = await apiFetch("signup", { body: newUser });
  sessionStorage.setItem(tokenKey, token);
  return user;
}

export async function logout() {
  const data = await apiFetch("logout", { method: "DELETE" })
  sessionStorage.removeItem(tokenKey)
  return data
}

export async function getProfileInfo() {
  const data = await apiFetch("profile")
  return data
}
