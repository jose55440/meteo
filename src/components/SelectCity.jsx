import React, { useState } from "react";
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
     const { data } =    await fetchNames(input);
    console.log(data)
    setData(data);
  };

  const selectFinalData = (city) => {
    setFinalData(city)
    setInput(finalData.name+'-'+finalData.state)
    console.log(finalData)
};

  return (
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
      {data &&
  data.map((city) => (
    <li key={city.id} onClick={() => selectFinalData(city)}>
      {city.name}-{city.state}
    </li>
  ))}
    </form>
  );
};