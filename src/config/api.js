import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/", // Add protocol (http:// or https://)
});

// Add a request interceptor to do something before calling the API
api.interceptors.request.use(
  function (config) {
    // Commenting out the authentication part for now
    /*
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token if it exists
    }
    */
    return config;
  },
  function (error) {
    // Handle the request error
    return Promise.reject(error);
  }
);

export default api;
