import serverInstance from './serverHandling';


const tokenKey = process.env.TOKEN_KEY;

const baseURL = "reservations";

const userReservationsUrl = `${baseURL}/user`;
const specificReservation = id => `${baseURL}/${id}`;

const createReservation = async ({ roomId: room, startDate, endDate, totalPrice, extras }) => {
    const token = localStorage.getItem(tokenKey);
    try {
        const response = await serverInstance.post(baseURL, { room, startDate, endDate, totalPrice, extras }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const { reservation, message } = response.data;
        return { reservation, message };
    } catch (ex) {
        throw ex.response.data;
    }
}

const getAllReservations = async () => {

    try {
        const response = await serverInstance.get(baseURL, {});
        return response.data.reservations;
    } catch (ex) {
        throw ex.response.data;
    }
}

const getUserReservations = async () => {
    const token = localStorage.getItem(tokenKey);
    try {
        const response = await serverInstance.get(userReservationsUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.reservations;
    } catch (error) {
        throw error.response.data;
    }
}

const updateReservationDetails = async (reservationId, reservationDetails) => {
    const token = localStorage.getItem(tokenKey);
    try {
        const response = await serverInstance.put(specificReservation(reservationId), reservationDetails, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const { reservation, message } = response.data;
        return { reservation, message };
    } catch (error) {
        throw error.response.data;
    }
}

const deleteReservation = async (reservationId) => {
    const token = localStorage.getItem(tokenKey);
    try {
        const response = await serverInstance.delete(specificReservation(reservationId), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export { createReservation }
export { getAllReservations }
export { getUserReservations }
export { updateReservationDetails }
export { deleteReservation }