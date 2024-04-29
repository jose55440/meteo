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
    
    
    setLocation({
      lat: city.lat,
      lon: city.lon,
    })
   
    
  }

  useEffect(() => {
    // Definir una función asíncrona para hacer la solicitud a la API de OpenWeatherMap
    const fetchWeatherData = async () => {
      // Verificar si hay una ubicación
      if (location) {
        const apiKey = 'b14a38bd4b1d38a3fc6d998bf6bbb5c2';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=metric&lang=sp`;
        
        try {
          // Realizar la solicitud a la API y obtener la respuesta
          const response = await fetch(apiUrl);
          
          if (!response.ok) {
            throw new Error('Error al obtener los datos meteorológicos');
          }
          
          // Convertir la respuesta a formato JSON
          const data = await response.json();
          
          // Establecer los datos meteorológicos en el estado
          setWeatherData(data);
          
        } catch (error) {
          // Manejar errores
          console.error('Error al obtener los datos meteorológicos:', error);
        }
      }
    };
  
    // Llamar a la función asíncrona
    fetchWeatherData();
  }, [location]);

  return (
    <div>
      
      {!location && <p>Obteniendo ubicación...</p>}
      
      {location && !weatherData && <p>Cargando datos meteorológicos...</p>}
      {weatherData && (
        <div>
          
          <SelectCity handleCity={handleCity} />
          <div className="card">
            <div className="row g-0">
              <div className="col-5 col-sm-4">
              {location && <MapComponent location={location} />}
              </div>
              <div className="col-7 col-sm-8">
                <div className="card-body m-5">
                <img
                  src={weatherIconMap[weatherData.weather[0].icon]}
                  className="img-fluid card-title"
                  alt={weatherData.weather[0].description}
                  width="250"
                  height="100"
                />
                  <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                  <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                </div>
              </div>
            </div>
          </div>
         
          <p>
            {weatherData.weather[0].description.charAt(0).toUpperCase() +
              weatherData.weather[0].description.slice(1)}{' '}
            en {weatherData.name}
          </p>
        </div>
      )}


      <span>By: <a href="https://github.com/ZarpAgent47">ZarpAgent</a>, <a href="https://github.com/N3BUL0S4">N3BUL0S4</a>, <a href="https://github.com/jose55440">jose55440</a></span>
    </div>
  );
};

export default WeatherComponent;