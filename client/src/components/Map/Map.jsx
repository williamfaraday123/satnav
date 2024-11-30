import 'leaflet/dist/leaflet.css';
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer
} from 'react-leaflet';

import { useEffect, useState } from 'react';

import ShowTimeZone from '../PlaceDetails/ShowTimeZone';
import ClickHandler from './ClickHandler';
import { useUserLocation } from './Map.hooks';
import RoutingMachine from './RoutingMachine';

import '../../styles/PopupStyles.css';

const Map = ({ selectedSearchOption, profile }) => {
    if (!selectedSearchOption) {
        return <div>Choose destination first to render map</div>
    }

    const userLocation = useUserLocation();
    const [navigateButtonClicked, setNavigateButtonClicked] = useState(false);
    const [position, setPosition] = useState([selectedSearchOption?.geometry?.coordinates[1], selectedSearchOption?.geometry?.coordinates[0]]);
    const [droppedPin, setDroppedPin] = useState(false);

    const handleNavigate = () => {
        setNavigateButtonClicked((prevState) => !prevState);
    };

    useEffect(() => {
        if (selectedSearchOption) {
            setDroppedPin(false);
            const newPosition = [selectedSearchOption?.geometry?.coordinates[1], selectedSearchOption?.geometry?.coordinates[0]];
            setPosition(newPosition);
        }
    }, [selectedSearchOption]);

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
            <ClickHandler 
                setPosition = {setPosition} 
                setDroppedPin = {setDroppedPin}
            />
            <Marker position={position}>
                <Popup>
                    {droppedPin ? (
                        <p>droppedPin lat: {position[0]}, lng: {position[1]}</p>
                    ): (
                        <p>{selectedSearchOption?.properties?.country}, {selectedSearchOption?.properties?.name}</p>
                    )}
                    <ShowTimeZone lat = {position[0]} lng = {position[1]} />
                    <button onClick = {handleNavigate}>navigate</button>
                </Popup>
            </Marker>
            {userLocation && navigateButtonClicked && (
                <>
                    {profile && <RoutingMachine 
                        start = {userLocation} 
                        end = {position}
                        profile = {profile}
                    />}
                </>
            )}
        </MapContainer>
    );
};

export default Map;