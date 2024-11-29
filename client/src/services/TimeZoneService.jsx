import axios from "axios";

const API_URL = `http://api.timezonedb.com/v2.1/get-time-zone`;
const API_KEY = import.meta.env.VITE_TIMEZONEDB_API_KEY;

export const getTimeZone = async (lat, lng) => {
    try {
        const response = await axios.get(API_URL, {
            params: {
                key: API_KEY,
                format: 'json',
                by: 'position',
                lat: lat,
                lng: lng
            }
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
};