import axios from "axios";

import baseUrl from "../config";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const create = async (order) => {
  try {
    const response = await axios.post(
      `${baseUrl.server}/api/order/add`,
      order,
      { headers }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const orderList = async () => {
  try {
    const response = await axios.get(`${baseUrl.server}/api/order/list`, {
      headers,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
