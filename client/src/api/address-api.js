import axios from "axios";

import baseUrl from "../config";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const createAddress = async (address) => {
  try {
    const response = await axios.post(
      `${baseUrl.server}/api/address/add`,
      address,
      { headers }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const addressList = async () => {
  try {
    const response = await axios.get(`${baseUrl.server}/api/address/list`, {
      headers,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const removeAddress = async (id) => {
  try {
    const response = await axios.post(
      `${baseUrl.server}/api/address/delete`,
      { id },
      { headers }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
