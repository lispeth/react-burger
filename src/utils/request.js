import { checkResponse } from "./checkResponse.js";

export function request(endpoint, options) {
  const BASE_URL = process.env.REACT_APP_URL_DOMAIN;
  const url = `${BASE_URL}/${endpoint}`;
  return fetch(url, options).then(checkResponse);
}
