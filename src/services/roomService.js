import serverInstance from './serverHandling';


const baseURL = "rooms";
const tokenKey = process.env.TOKEN_KEY;

const availableUrl = `${baseURL}/available`;

const specificRoom = roomId => `${baseURL}/${roomId}`;



const createRoom = async ({ number, guestsCapacity, priceForNight }) => {
    const token = localStorage.getItem(tokenKey);
    try {
        const response = await serverInstance.post(baseURL, { number, guestsCapacity, priceForNight }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.room;

    } catch (ex) {
        throw ex.response.data;
    }
}

const getAllRooms = async () => {
    try {
        const response = await serverInstance.get(baseURL, {});
        return response.data.rooms;

    } catch (ex) {
        throw ex.response.data;
    }
}

const getAvailableRooms = async (startDate, endDate) => {
    const token = localStorage.getItem(tokenKey);
    try {
        const response = await serverInstance.get(availableUrl, {
            data: { startDate, endDate },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data.rooms;
    } catch (ex) {
        throw ex.response.data;
    }
}

const updateRoomDetails = async (roomId, roomDetails) => {
    const token = localStorage.getItem(tokenKey);
    try {
        const response = await serverInstance.put(specificRoom(roomId), roomDetails, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    } catch (ex) {
        throw ex.response.data;
    }
}

const getRoom = async roomId => {
    const token = localStorage.getItem(tokenKey);
    try {
        const response = await serverInstance.get(specificRoom(roomId), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data.room;
    } catch (ex) {
        throw ex.response.data;
    }
}


const deleteRoom = async roomId => {
    const token = localStorage.getItem(tokenKey);
    try {
        const response = await serverInstance.delete(specificRoom(roomId), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    } catch (ex) {
        throw ex.response.data;
    }
}

export { createRoom };
export { deleteRoom };
export { getAllRooms };
export { getAvailableRooms }
export { getRoom }

export { updateRoomDetails }