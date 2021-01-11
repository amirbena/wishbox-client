import serverInstance from './serverHandling';
import jwtDecode from 'jwt-decode';


const baseURL = "users";
const tokenKey = process.env.TOKEN_KEY;
const signupUrl = `${baseURL}/signup`;
const signinUrl = `${baseURL}/signin`;
const listExceptAdmin = `${baseURL}/admin`;


const signup = async ({ fullName, numGuests, email, password, address, country, phone }) => {
    try {
        const response = await serverInstance.post(signupUrl, { fullName, numGuests, email, password, address, country, phone });
        const token = response.headers["authorization"];
        localStorage.setItem(tokenKey, token)
        const { message, user } = response.data;
        return { message, user };
    } catch (ex) {
        throw ex.response.data;
    }
}


const signin = async ({ email, password }) => {
    try {
        const response = await serverInstance.post(signinUrl, { email, password });
        const token = response.headers["authorization"];
        localStorage.setItem(tokenKey, token)
        const { message, user } = response.data;
        return { message, user };
    } catch (ex) {
        throw ex.response.data;
    }
}

const changeUserAsAdmin = async (userId) => {
    const token = localStorage.getItem(tokenKey);
    try {
        const response = await serverInstance.put(baseURL, { userId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

const logout = () => {
    localStorage.removeItem(tokenKey);
}

const getAllUsersExceptCurrent = async () => {
    const token = localStorage.getItem(tokenKey);
    try {
        const response = await serverInstance.get(listExceptAdmin, {
            Authorization: `Bearer ${token}`
        })
        return response.data.users;
    } catch (error) {
        throw error.response.data;
    }
}

const getCurrentUser = () => {
    try {
        const jwt = localStorage.getItem(tokenKey);
        if (!jwt) return null;
        return jwtDecode(jwt);
    }
    catch (ex) {
        return null;
    }
}

export { signup }
export { signin }
export { getAllUsersExceptCurrent }
export { changeUserAsAdmin }
export { getCurrentUser }
export { logout }