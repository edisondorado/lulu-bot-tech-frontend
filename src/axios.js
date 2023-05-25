import axios from "axios";

const instance = axios.create({
  // baseURL: "https://lulu-bot.tech/api"
  baseURL: "http://localhost:3001/api"
});

export default instance;
