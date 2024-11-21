import L from 'leaflet';
import 'leaflet-routing-machine';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const RoutingMachine = ({ start, end }) => {
    const map = useMap();

    useEffect(() => {
        if (!start || !end) {
            return;
        }

        const routingControl = L.Routing.control({
            waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
            routeWhileDragging: true
        }).addTo(map);
    
        return () => map.removeControl(routingControl);
    }, [map, start, end]);

    return null;
}

export default RoutingMachine;