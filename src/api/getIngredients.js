const BASE_URL = process.env.REACT_APP_URL_DOMAIN;

const getIngredients = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/ingredients`);
    if (!response.ok) {
      throw new Error(`Error while requesting: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while requesting:", error);
    throw error;
  }
};

export default getIngredients;
