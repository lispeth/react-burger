const BASE_URL = process.env.REACT_APP_URL_DOMAIN;

export const getOrder = async (ingredients) => {
  try {
    const response = await fetch(`${BASE_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients }),
    });
    if (!response.ok) {
      throw new Error(`Error while requesting: ${response.status}`);
    }
    const data = await response.json();
    console.log("Order response data:", data.order.number);
    return data.order.number;
  } catch (error) {
    console.error("Error while requesting:", error);
    throw error;
  }
};
