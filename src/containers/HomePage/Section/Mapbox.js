import React from "react"
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps"

const Mapbox = () => {
  return (
    <div>
      <GoogleMap
        defaultZoom={17}
        defaultCenter={{ lat: 20.799771, lng: 106.352603 }}
      >
        <Marker
          icon={{
            url: "https://insulationpads.co.uk/wp-content/uploads/2017/10/Home.png",
            scaledSize: new window.google.maps.Size(40, 40),
          }}
          position={{ lat: 20.799771, lng: 106.352603 }}
        />
      </GoogleMap>
    </div>
  );
}

export default withScriptjs(withGoogleMap(Mapbox));

