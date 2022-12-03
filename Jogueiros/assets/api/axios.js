import axios from 'axios';
const instance = axios.create({baseURL: 'http://ec2-18-228-13-76.sa-east-1.compute.amazonaws.com:3333'});
export default instance