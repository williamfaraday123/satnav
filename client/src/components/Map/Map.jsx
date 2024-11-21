import 'leaflet/dist/leaflet.css';
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer
} from 'react-leaflet';

import { useEffect, useState } from 'react';

import { getUserLocation } from './Map.hooks';
import RoutingMachine from './RoutingMachine';

const Map = ({ selectedSearchOption }) => {
    const [userLocation, setUserLocation] = useState(null);
    const [navigateButtonClicked, setNavigateButtonClicked] = useState(false);

    const handleNavigate = () => {
        setNavigateButtonClicked((prevState) => !prevState);
    };

    useEffect(() => {
        getUserLocation()
            .then((coords) => {
                setUserLocation(coords);
            })
            .catch((err) => {
                alert('Cannot get user location', err);
            });
    });

    const position = [selectedSearchOption?.geometry?.coordinates[1], selectedSearchOption?.geometry?.coordinates[0]];

    if (!selectedSearchOption) {
        return <div>Choose destination first to render map</div>
    }
    return(
        <MapContainer 
            center={position} 
            zoom={13} 
            style = {{
                height: "100vh",
                width: "100vw"
            }}
        >
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    {selectedSearchOption?.properties?.country}, {selectedSearchOption?.properties?.name}
                    <button onClick = {handleNavigate}>navigate</button>
                </Popup>
            </Marker>
            {userLocation && navigateButtonClicked && (
                <RoutingMachine 
                    start = {userLocation} 
                    end = {position}
                />
            )}
        </MapContainer>
    );
};

export default Map;