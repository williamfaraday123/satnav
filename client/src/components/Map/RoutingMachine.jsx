import L from 'leaflet';
import 'leaflet-routing-machine';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const RoutingMachine = ({ start, end, profile }) => {
    const map = useMap();

    useEffect(() => {
        if (!start || !end) {
            return;
        }

        console.log(profile);
        const serviceUrl = `http://router.project-osrm.org/route/v1/${profile}`;
        const router = L.Routing.osrmv1({
            serviceUrl,
        });
        const routingControl = L.Routing.control({
            waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
            routeWhileDragging: true,
            router
        }).addTo(map);
    
        return () => map.removeControl(routingControl);
    }, [map, start, end, profile]);

    return null;
}

export default RoutingMachine;