import { request } from "../utils/request";

const getIngredients = async () => {
  try {
    return await request("ingredients");
  } catch (error) {
    console.error("Error while requesting ingredients:", error);
    throw error;
  }
};

export default getIngredients;
