import axios from 'axios';

const hostApi = process.env.NODE_ENV === "development" ? "http://localhost" : "http://localhost";
const portApi = process.env.NODE_ENV === "development" ? 3001 : 3001;

const baseURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}/api`;

async function getUserRides(data) {
    const url = `${baseURLApi}/rides/getRides`;
    return await axios.post(url, data).then(response => response.data);
}

async function getUserReservation(data) {
    const url = `${baseURLApi}/rides/getReservations`;
    return await axios.post(url, data).then(response => response.data);
}

async function deleteUserRecord(data) {
    const url = `${baseURLApi}/rides/deleteReservation`;
    return await axios.post(url, data).then(response => response.data);
}

async function addRide(ride) {
    const url = `${baseURLApi}/rides/addRide`;
    return await axios.post(url, ride).then(response => response.data);
}

async function deletUserData(username) {
    const url = `${baseURLApi}/rides/deleteUserData`;
    return await axios.post(url, username).then(response => response.data);
}

async function updateUserReservation(data) {
    const url = `${baseURLApi}/rides/updateReservation`;
    return await axios.post(url, data).then(response => response.data);
}

export {
    getUserRides,
    deleteUserRecord,
    addRide,
    deletUserData,
    updateUserReservation,
    getUserReservation,
};