import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const MapComponent = ({ location }) => {
  const defaultCenter = {
    lat: location.lat,
    lng: location.lon,
  };

  const containerStyle = {
    width: '100vw',
    height: '100vh',
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDs3x4GuPf11cXmCJmqAb6pIPHkz1v8pxs">
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={12}
        center={defaultCenter}
      />
    </LoadScript>
  );
};

export default MapComponent;