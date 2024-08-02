import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://13.213.3.47/api',
  headers: {
    "Content-type": "application/json"
  }
});