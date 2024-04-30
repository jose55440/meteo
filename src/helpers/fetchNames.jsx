import React from 'react'

export const fetchNames = async (city) => {
  // Le pasamos el nombre de la ciudad o pueblo y te devuelve un array 
    try {
      
      const apiKey = import.meta.env.VITE_API_KEY;
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error al obtener los datos de la ciudad');
      }
      const data = await response.json();
      // Devolvemos los datos, en este caso un [] y lo pasamos fragmentado
      return {data};
    } catch (error) {
      console.error('Error al obtener los datos de la ciudad:', error);
      throw error; // Re-lanzar el error para que pueda ser manejado por quien llame a la función
    }
  };
  