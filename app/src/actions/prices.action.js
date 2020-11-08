import axios from 'axios';

const hostApi = process.env.NODE_ENV === "development" ? "http://localhost" : "http://localhost";
const portApi = process.env.NODE_ENV === "development" ? 3001 : 3001;

const baseURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}/api`;

async function getPrices() {
    const url = `${baseURLApi}/prices/getPrices`;
    return await axios.get(url).then(response => response.data);
}

async function getRidePrice(ride) {
    const url = `${baseURLApi}/prices/getRidePrice`;
    return await axios.post(url, ride).then(response => response.data);
}

export {
    getPrices,
    getRidePrice,
};