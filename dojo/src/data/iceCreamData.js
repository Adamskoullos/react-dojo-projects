import axios from "axios";

export const getAvailableIceCreams = async () => {
  try {
    const res = await axios.get("/api/menu/stock-ice-creams");
    if (res.data) {
      const sortedData = [...res.data].sort((a, b) => {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      });
      return sortedData;
    }
  } catch (err) {
    throw err;
  }
};

export const getAvailableIceCream = async (id) => {
  let res;
  try {
    res = await axios.get(`/api/menu/stock-ice-creams/${id}`);
  } catch (err) {
    throw err;
  }
  if (res.data) {
    return res.data;
  }
};

export const addNewIceCream = async (data) => {
  try {
    const res = await axios.post(`/api/menu`, data);
    return res;
  } catch (err) {
    throw err;
  }
};

export const getMenu = async () => {
  try {
    const res = await axios.get("/api/menu");
    if (res.data) {
      const sortedData = [...res.data].sort((a, b) => {
        const nameA = a.iceCream.name;
        const nameB = b.iceCream.name;

        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
      });
      return sortedData;
    }
  } catch (err) {
    throw err;
  }
};

export const getIceCream = async (id) => {
  let res;
  try {
    res = await axios.get(`/api/menu/${id}`);
  } catch (err) {
    throw err;
  }
  if (res.data) {
    return res.data;
  }
};

export const updateIceCream = async (data) => {
  try {
    const res = await axios.put(`/api/menu/${data.id}`, data);
    return res;
  } catch (err) {
    throw err;
  }
};

export const deleteIceCream = async (id) => {
  try {
    const res = await axios.delete(`/api/menu/${id}`);
    return res;
  } catch (err) {
    throw err;
  }
};
