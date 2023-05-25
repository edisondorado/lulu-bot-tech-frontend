import axios from "axios";

const instance = axios.create({
  baseURL: "https://lulu-bot.tech/api"
});

export default instance;
