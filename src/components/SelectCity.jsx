import React, { useEffect, useState } from "react";
import { fetchNames } from "../helpers/fetchNames";

export const SelectCity = ({ handleCity }) => {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [finalData, setFinalData] = useState('');
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!input.trim()) return; // Evita agregar una tarea vacía
    console.log(input)
    // Hace el fetch y te devulve un [] el cual es el que se muestra en la sublista 
     const { data } =    await fetchNames(input);
    console.log(data)
    setData(data);
  };
  useEffect(() => {
    // Verifica si finalData está definido
    if (finalData) {
      // Concatena el nombre y el estado si está disponible
      setInput(`${finalData.name}-${finalData.state ? finalData.state : ''}`);
    }
    console.log(finalData);
  }, [finalData]);
  // Con este metodo seleccionamos la ciudad de todas las que nos devuelve el fetch
  const selectFinalData = (city) => {
    // Lo guardamos como la seleccion final 
    setFinalData(city)
    // Concatenamos las dos cosas para que se sobre escriba en el input  
    setInput(finalData.name+'-'+finalData.state?finalData.state:'')
    console.log(finalData)
};

  return (
    // Al escribir en el input busca en el handleSubmit
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="text"
        id="text"
        value={input}
        onChange={handleInput}
        placeholder="Ingrese una nueva tarea"
      />
      <button type="submit">Buscar</button>
      {/* Muestra una sublista que al darle click en uno de ellos se pone en el input  */}
      {data &&
  data.map((city) => (
    <li key={city.id} onClick={() => selectFinalData(city)}>
      {city.name}-{city.state}
    </li>
  ))}
    </form>
  );
};