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
      console.log("Data: ", sortedData);
      return sortedData;
    }
  } catch (err) {
    console.log(err.message);
  }
};
