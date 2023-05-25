import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://lulu-bot.tech:3001'
}); //asd

export default instance;