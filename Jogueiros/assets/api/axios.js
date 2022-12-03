import axios from 'axios';
const instance = axios.create({baseURL: 'http://15.228.45.135:3333'});
export default instance