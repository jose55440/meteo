import React from 'react'

export const fetchWeatherData = async (location) => {
    // Verificar si hay una ubicación
    if (location) {
      const apiKey = import.meta.env.VITE_API_KEY;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=metric&lang=sp`;

      try {
        // Realizar la solicitud a la API y obtener la respuesta
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error("Error al obtener los datos meteorológicos");
        }

        // Convertir la respuesta a formato JSON
        const data = await response.json();
        
        // Establecer los datos meteorológicos en el estado
        return {data}
      } catch (error) {
        // Manejar errores
        console.error("Error al obtener los datos meteorológicos:", error);
      }
    }
  };
