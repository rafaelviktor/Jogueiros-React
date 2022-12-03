import axios from 'axios';
const instance = axios.create({baseURL: 'http://ec2-15-228-145-173.sa-east-1.compute.amazonaws.com:3333'});
export default instance