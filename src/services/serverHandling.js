import axios from 'axios';


const serverInstance = axios.create({
     baseURL: "http://localhost:80/"
})

const sendRequestWithToken = async (method, url, token, body = {}, params = {}) => {
     const result = await serverInstance({
          method,
          url,
          headers: {
               Authorization: `Bearer ${token}`
          },
          data: body,
          params

     })
     return result;


}
export default serverInstance;


export { sendRequestWithToken };