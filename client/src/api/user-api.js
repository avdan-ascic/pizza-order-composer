import axios from "axios";

import baseUrl from "../config";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const create = async (user) => {
  try {
    const response = await axios.post(
      `${baseUrl.server}/api/users/register`,
      user,
      { headers }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err.response.data.errors ? err.response.data : err;
  }
};

const login = async (user) => {
  try {
    const response = await axios.post(
      `${baseUrl.server}/api/users/login`,
      user,
      { headers }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

const logout = async () => {
  try {
    const response = await axios.get(`${baseUrl.server}/api/users/logout`, {
      headers,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const authenticate = async () => {
  try {
    const response = await axios.get(
      `${baseUrl.server}/api/users/authenticate`,
      { headers }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export { create, login, logout, authenticate };
