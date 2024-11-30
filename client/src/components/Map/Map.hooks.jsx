import { useLayoutEffect, useState } from "react";

export const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        const success = (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            resolve([latitude, longitude]);
        };

        const error = (err) => {
            reject(err);
        };

        navigator.geolocation.watchPosition(success, error);
    });
};

export const useUserLocation = () => {
    const [userLocation, setUserLocation] = useState(null);

    useLayoutEffect(() => {
        getUserLocation()
            .then((coords) => {
                setUserLocation(coords);
            })
            .catch((err) => {
                alert('Cannot get user location', err);
            });
    }, []);

    return userLocation;
}