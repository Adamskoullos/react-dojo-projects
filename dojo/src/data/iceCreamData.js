import axios from "axios";

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
    console.log(err.message);
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
