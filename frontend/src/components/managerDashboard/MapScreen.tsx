import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple } from "leaflet";
import { useEffect } from "react";
export default function MapScreen({
    selectedLocation
}:{
    selectedLocation: any
}) {

    const icon = L.icon({
        iconUrl: "/RedMapMarker.svg",
        iconSize: [40,40],
    });
    const position: LatLngTuple = [13.7365936, 100.5330593]; // faculty of engineering chulalongkorn university

    
    const locationSelection : LatLngTuple = [selectedLocation?.lat, selectedLocation?.lon];

    const ResetMapCenter = () => {
        const map = useMap();

        useEffect(() => {
            if(selectedLocation === null) return;
            map.setView(
                L.latLng(selectedLocation?.lat, selectedLocation?.lon),
                map.getZoom(),
                { animate: true }
            )
        }, [locationSelection])

        return null;
    }
    


    return (
        <div className="w-[60%] h-full border-gray-600 border-2 rounded-md">
            <MapContainer
                center={selectedLocation?locationSelection:position}
                zoom={15}
                style={{ height: "100%", width: "100%", borderRadius: "5px"}}
            >
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={selectedLocation?locationSelection:position} icon={icon}>
                <Popup>
                    {selectedLocation?.display_name}                    
                </Popup>
                </Marker>
                <ResetMapCenter />
            </MapContainer>
        </div>
    );
}
