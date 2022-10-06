import axios from 'axios';
const instance = axios.create({baseURL: 'https://jogueiros-api.herokuapp.com'});
export default instance