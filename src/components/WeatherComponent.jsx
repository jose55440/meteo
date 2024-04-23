import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent';

// Importar las imágenes
import soleado from '../assets/Sunny.png';
import nublado from '../assets/nublado.png';
import scatteredClouds from '../assets/muy nublado.png';
import nubesyclaros from '../assets/Nubes y claros.png';
import showerRain from '../assets/lluvioso.png';
import rain from '../assets/lluvioso.png';
import thunderstorm from '../assets/tormenta.png';
import snow from '../assets/tormenta.png'; 
import mist from '../assets/lluvioso.png';
import { SelectCity } from './SelectCity';


// Objeto que mapea los códigos de tiempo meteorológico a las imágenes
const weatherIconMap = {
  '01d': soleado,
  '02d': nublado,
  '03d': scatteredClouds,
  '04d': nubesyclaros,
  '09d': showerRain,
  '10d': rain,
  '11d': thunderstorm,
  '13d': snow,
  '50d': mist,
  // Agregar más códigos y sus imágenes correspondientes si es necesario
};

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

  const handleCity=city=>{
    const apiKey = 'b14a38bd4b1d38a3fc6d998bf6bbb5c2';
    console.log(city)
    async function peticion() {
      const url=`http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${apiKey}`
      const datatype= await fetch(url);
      const response= await datatype.json()
       console.log(response);
    
    }
    
    peticion();
  }

  useEffect(() => {
    // Hacer la llamada a la API de OpenWeatherMap si se tiene la ubicación
    if (location) {
      const apiKey = 'b14a38bd4b1d38a3fc6d998bf6bbb5c2';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=metric&lang=sp`;
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
          <SelectCity handleCity={handleCity} />

          <img
            src={weatherIconMap[weatherData.weather[0].icon]}
            alt={weatherData.weather[0].description}
            width="100"
            height="100"
          />
          <p>
            {weatherData.weather[0].description.charAt(0).toUpperCase() +
              weatherData.weather[0].description.slice(1)}{' '}
            en {weatherData.name}
          </p>
        </div>
      )}
      {location && <MapComponent location={location} />}
    </div>
  );
};

export default WeatherComponent;