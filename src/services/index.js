import axios from "axios";

const baseURL = "http://dev.rapptrlabs.com/Tests/scripts/user-login.php";
const headers = {
  "Content-Type": "multipart/form-data",
};

export const fetchData = async (body) => {
  return axios.post(baseURL, body, { headers });
};
