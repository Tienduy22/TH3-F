import axios from "axios";

/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
export const ApiUserList = async () => {
  const res = await axios.get("http://localhost:8081/api/user/list")
  return res.data
};

export const ApiUserDetail = async (id) => {
  const res = await axios.get(`http://localhost:8081/api/user/${id}`)
  return res.data
};

export const ApiPhotosOfUser = async (id) => {
  const res = await axios.get(`http://localhost:8081/api/photo/photosOfUser/${id}`)
  return res.data
};

export const ApiPhotosOfUserAll = async () => {
  const res = await axios.get(`http://localhost:8081/api/photo/photosOfUser/all`)
  return res.data
};



