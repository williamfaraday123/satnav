import { useMap, useMapEvents } from "react-leaflet";

const ClickHandler = ({ setPosition, setDroppedPin }) => {
    const map = useMap();
    const onMapClick = (latlng) => {
        map.setView([latlng.lat, latlng.lng], map.getZoom()); //adjust centre of map
        setPosition([latlng.lat, latlng.lng]); //adjust marker
        setDroppedPin(true);
    };

    useMapEvents({
        click(e) {
            onMapClick(e.latlng);
        },
    });
    return null;
};
export default ClickHandler;