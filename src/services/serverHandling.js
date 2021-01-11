import axios from 'axios';


const serverInstance = axios.create({
     baseURL: "http://localhost:80/"
})


export default serverInstance;

