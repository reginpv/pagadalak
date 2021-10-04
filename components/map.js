import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'

export default function Map({ latlon = [0, 0], school }) {
  return(
    <MapContainer 
      center={[latlon[0], latlon[1]]} 
      zoom={17} 
      scrollWheelZoom={false}
    >

      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker 
        position={[latlon[0], latlon[1]]} 
      >
        <Popup>
          {school.name}
        </Popup>
      </Marker>
    </MapContainer>
  )
}

//geo:15.6903218263424,120.410171853981?z=18