import React, { useState, useEffect } from "react";
import MapComponent from "./MapComponent";

// Importar las imágenes
import soleado from "../assets/Sunny.png";
import nublado from "../assets/nublado.png";
import scatteredClouds from "../assets/muy-nublado.png";
import nubesyclaros from "../assets/Nubes-y-claros.png";
import showerRain from "../assets/lluvioso.png";
import rain from "../assets/lluvioso.png";
import thunderstorm from "../assets/tormenta.png";
import snow from "../assets/tormenta.png";
import mist from "../assets/lluvioso.png";
import { SelectCity } from "./SelectCity";
import { fetchWeatherData } from "../helpers/fetchWeatherData";

// Objeto que mapea los códigos de tiempo meteorológico a las imágenes
const weatherIconMap = {
  "01d": soleado,
  "02d": nublado,
  "03d": scatteredClouds,
  "04d": nubesyclaros,
  "09d": showerRain,
  "10d": rain,
  "11d": thunderstorm,
  "13d": snow,
  "50d": mist,
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
        console.error("Error al obtener la ubicación:", error);
      }
    );
  }, []);

  const handleCity = (city) => {
    setLocation({
      lat: city.lat,
      lon: city.lon,
    });
  };

   useEffect(  () => {
    
    
    const fetchData = async () => {
      try {
        // Llamar a la función asíncrona y esperar la respuesta
        const { data } = await fetchWeatherData(location);
        
        // Establecer los datos meteorológicos en el estado
        setWeatherData(data);
        
        // Registrar los datos en la consola
        console.log(data);
      } catch (error) {
        // Manejar errores
        console.error("Error al obtener los datos meteorológicos:", error);
      }
    };
  
    // Llamar a la función fetchData cuando cambie la ubicación
    fetchData();
  }, [location]);

  return (
    <div>
      {!location && <p>Obteniendo ubicación...</p>}

      {location && !weatherData && <p>Cargando datos meteorológicos...</p>}
      {weatherData && (
          <div className="row">
            <div className="col-xxl-4"><SelectCity handleCity={handleCity} /></div>
            <div className="col-xxl-4">
              <img
                  src={weatherIconMap[weatherData.weather[0].icon]}
                  className="img-fluid"
                  alt={weatherData.weather[0].description}
                  width="250"
                  height="100"
                />
                <p>
                  {weatherData.weather[0].description.charAt(0).toUpperCase() +
                    weatherData.weather[0].description.slice(1)}{" "}
                  en {weatherData.name} a {weatherData.main.temp}°C con una maxima de {weatherData.main.temp_max}°C y una minima de {weatherData.main.temp_min}°C 
                </p></div>
            <div className="col-xxl-4">{location && <MapComponent location={location} />}</div>
          </div>
      )}

      <span>
        By: <a href="https://github.com/ZarpAgent47">ZarpAgent</a>,{" "}
        <a href="https://github.com/N3BUL0S4">N3BUL0S4</a>,{" "}
        <a href="https://github.com/jose55440">jose55440</a>
      </span>
    </div>
  );
};

export default WeatherComponent;
