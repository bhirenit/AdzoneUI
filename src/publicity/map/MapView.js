import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
// import * as parkData from "./data/skateboard-parks.json";
import mapStyles from "./mapStyles";

function Map(props) {
  const [selectedProd, setSelectedProd] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedProd(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);
  if(!props.center){
    return ( <div></div>);
  }
  else{
  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: props.center.lat, lng: props.center.lng }} 
      // defaultOptions={{ styles: mapStyles }}
    >
      {props.data.map(prod => (
        <Marker
          key={prod.placeName}
          position={{
            lat: prod.LatLng[0].lat,
            lng: prod.LatLng[0].lng
          }}
          onClick={() => {
            setSelectedProd(prod);
          }}
          // icon={{
          //   url: `/skateboarding.svg`,
          //   scaledSize: new window.google.maps.Size(25, 25)
          // }}
        />
      ))}

      {selectedProd && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedProd(null);
          }}
          position={{
            lat: selectedProd.lat,
            lng: selectedProd.lng
          }}
        >
          <div>
        <h2>{selectedProd.placeName}  {props.test}</h2>
            <p>abc</p>

          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
        }
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function MapView(props) {
  return (
    <div>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAeWwZ3gDRU13z6jiQRTuhFkA3ugQG_Q7Q`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        {...props}
      />
    </div>
  );
}
