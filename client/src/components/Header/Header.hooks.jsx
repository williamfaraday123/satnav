export const getTemporaryUserLocation = () => {
    return new Promise((resolve, reject) => {
        const handleSuccess = (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            resolve([latitude, longitude]);
        }
        const handleError = (err) => {
            reject(err);
        }
        navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    });
};