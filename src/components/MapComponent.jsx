import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const MapComponent = ({ location }) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  const defaultCenter = {
    lat: location.lat,
    lng: location.lon,
  };

  const containerStyle = {
    width: '100vw',
    height: '100vh',
  };

  useEffect(() => {
    // Simular una operación asíncrona, como cargar datos adicionales basados en la ubicación
    const fetchData = async () => {
      // Realizar la operación asíncrona aquí
      // Por ejemplo, puedes hacer una solicitud a una API
      // O cargar datos de un servicio externo
      // Aquí puedes agregar tu lógica asíncrona
      // Este es solo un ejemplo
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulación de espera de 2 segundos
      setMapLoaded(true); // Marcar que los datos han sido cargados
    };

    fetchData();
  }, [location]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyDAMSAe-ZYyaF2yolrxIBZgCjZ72hhlH1I">
      {mapLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={12}
          center={defaultCenter}
        />
      )}
    </LoadScript>
  );
};

export default MapComponent;
