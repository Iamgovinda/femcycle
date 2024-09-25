import axios from "../config/axios";
import config from "../config";

export const get = (url, filters) => {
  try {
    return axios
      .get(url, {params: filters})
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  } catch (error) {
    throw error;
  }
};

export const post = (url, data) => {
  try {
    return axios
      .post(url, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  } catch (error) {
    throw error;
  }
};

export const patch = (url, data) => {
  try {
    return axios
      .patch(url, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  } catch (error) {
    throw error;
  }
};
export const remove = (url) => {
  try {
    return axios
      .delete(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  } catch (error) {
    throw error;
  }
};

export const loginPOST = (url, data) => {
  console.log("rootURL:", config.apiURL)
  console.log("url: ",url);
  console.log("data: ", data);
  return axios.post(config.apiURL + url, data);
};

export const registerPOST = (url, data) => {
  return axios.post(config.apiURL + url, data);
};

export const addToCart = (uuid, quantity) =>{
  return axios.post(config.apiURL + '/order/', {product:uuid, quantity:quantity})
}