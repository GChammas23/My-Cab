import axios from 'axios';

const hostApi = process.env.NODE_ENV === "development" ? "http://localhost" : "http://localhost";
const portApi = process.env.NODE_ENV === "development" ? 3001 : 3001;

const baseURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}/api`;

async function getDrivers() {
    const url = `${baseURLApi}/drivers/getDrivers`;
    return await axios.get(url).then(response => response.data);
}



export {
    getDrivers,
};