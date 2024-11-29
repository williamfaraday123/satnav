import { useEffect, useState } from "react";

import { getTimeZone } from "../../services/TimeZoneService";

const ShowTimeZone = ({ lat, lng }) => {
    const [showTimeZone, setShowTimeZone] = useState(false);
    const [timeZoneData, setTimeZoneData] = useState(null);

    useEffect(() => {
        setShowTimeZone(false);
    }, [lat, lng]);

    useEffect(() => {
        const fetchTimeZoneData = async () => {
            try {
                const data = await getTimeZone(lat, lng);
                setTimeZoneData(data);
            } catch (error) {
                alert(`Error fetching time zone data, ${error}`);
            }
        }

        if (showTimeZone)
            fetchTimeZoneData();
    }, [showTimeZone]);
    return(
        <>
            <button onClick = {() => {
                setShowTimeZone((prevState) => !prevState);
            }}>getTimeZone</button>
            {showTimeZone && (
                <>
                    <h3>Current Time</h3>
                    <p>{timeZoneData?.formatted} {timeZoneData?.abbreviation}</p>
                    <p>Time Zone: {timeZoneData?.zoneName}</p>
                    <p>GMT Offset: UTC/GMT +{timeZoneData?.gmtOffset/3600.00} hours</p>
                    <p>DST: {timeZoneData?.dst == "0" ? "No" : "Yes"}</p>
                    <p>Country: {timeZoneData?.countryName}</p>
                    <p>City: {timeZoneData?.cityName}</p>
                    <p>Region: {timeZoneData?.regionName}</p>
                </>
            )}
        </>
    );
};

export default ShowTimeZone;