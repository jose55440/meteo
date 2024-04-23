import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent';

const WeatherComponent = () => {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Solicitar permiso para acceder a la ubicación del usuario
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error al obtener la ubicación:', error);
      }
    );
  }, []);

  useEffect(() => {
    // Hacer la llamada a la API de OpenWeatherMap si se tiene la ubicación
    if (location) {
      const apiKey = 'b14a38bd4b1d38a3fc6d998bf6bbb5c2';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=metric`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
        })
        .catch((error) => {
          console.error('Error al obtener los datos meteorológicos:', error);
        });
    }
  }, [location]);

  return (
    <div>
      {!location && <p>Obteniendo ubicación...</p>}
      {location && !weatherData && <p>Cargando datos meteorológicos...</p>}
      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperatura: {weatherData.main.temp}°C</p>
          <p>Descripción: {weatherData.weather[0].description}</p>
        </div>
      )}
      {location && <MapComponent location={location} />}
    </div>
  );
};

export default WeatherComponent;