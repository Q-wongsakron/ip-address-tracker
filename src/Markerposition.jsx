import React from "react";
import { Marker, Popup } from "react-leaflet";

const Markerposition = () => {
  return (
    <div>
      <Marker position={[51.505, -0.09]}>
        <Popup>
          {address.location.city}, {address.location.region}
        </Popup>
      </Marker>
    </div>
  );
};
export default Markerposition;
