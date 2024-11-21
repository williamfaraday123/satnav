
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