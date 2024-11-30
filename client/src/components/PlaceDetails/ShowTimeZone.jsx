import { useEffect, useState } from "react";

import { getTimeZoneData } from "../../services/TimeZoneService";

const ShowTimeZone = ({ lat, lng }) => {
    const [showTimeZone, setShowTimeZone] = useState(false);
    const [timeZoneData, setTimeZoneData] = useState(null);

    useEffect(() => {
        setShowTimeZone(false);
    }, [lat, lng]);

    useEffect(() => {
        const fetchTimeZoneData = async () => {
            try {
                const data = await getTimeZoneData(lat, lng);
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
            }}>{showTimeZone ? "Hide timezone" : "Show timezone"}</button>
            {showTimeZone && (
                <>
                    <h3>Current Time</h3>
                    <p>{timeZoneData?.formattedTime} {timeZoneData?.abbreviation}</p>
                    <p>Time Zone: {timeZoneData?.zoneName}</p>
                    <p>GMT Offset: UTC/GMT {timeZoneData?.gmtOffset} hours</p>
                    <p>DST: {timeZoneData?.isDST}</p>
                    {/* <p>Country: {timeZoneData?.countryName}</p>
                    <p>City: {timeZoneData?.cityName}</p>
                    <p>Region: {timeZoneData?.regionName}</p> */}
                </>
            )}
        </>
    );
};

export default ShowTimeZone;