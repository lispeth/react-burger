import { request } from "../utils/request";

export const getOrder = async (ingredients) => {
  try {
    return await request("orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients }),
    });
  } catch (error) {
    console.error("Error while requesting order:", error);
    throw error;
  }
};
