import moment from 'moment';
import 'moment-timezone';

/*
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
        throw error;
    }
}; */

/* export const getTimeZone = async (lat, lng) => {
    const params = {
        key: API_KEY,
        format: 'json',
        by: 'position',
        lat: lat,
        lng: lng
    };
    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
        method: "GET",
        redirect: "follow",
    };
    try {
        const response = await fetch(`${API_URL}?${queryString}`, requestOptions);
        if (!response.ok) {
            throw new Error('Network is not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}; */

/* const calculateTimeZoneOffset = (lng) => {
    const offset = lng / 15; //longitude / 15 = offset in hours
    return Math.round(offset * 100) / 100; //round to 2 decimal places
};

export const getTimeZoneData = (lng) => {
    const offset = calculateTimeZoneOffset(lng);
    const currentTime = moment().utcOffset(offset * 60); //convert offset hours to minutes
    const formattedTime = currentTime.format('YYYY-MM-DD HH:mm:ss');
    const abbreviation = currentTime.format('z');
    const isDST = currentTime.isDST() ? 'Yes' : 'No';
    return {
        formattedTime: formattedTime,
        abbreviation: abbreviation,
        gmtOffset: offset,
        isDST: isDST
    };
} */

import tzlookup from 'tz-lookup';

export const getTimeZoneData = async (lat, lng) => {
    try {
        const timezone = tzlookup(lat, lng);
        if (!timezone) {
            throw new Error('Timezone lookup failed');
        }
        const currentTime = moment().tz(timezone);
        const formattedTime = currentTime.format('YYYY-MM-DD HH:mm:ss');
        const abbreviation = currentTime.format('z');
        const offset = currentTime.format('Z');
        const isDST = currentTime.isDST() ? 'Yes' : 'No';
        return {
            formattedTime: formattedTime,
            abbreviation: abbreviation,
            zoneName: timezone,
            gmtOffset: offset,
            isDST: isDST
        };
    } catch (error) {
        console.error(`Error in getTimeZoneData function: ${error.message}`);
        throw new Error('Failed to get time zone data');
    }
};
    