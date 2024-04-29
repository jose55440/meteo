import React, { useEffect, useState } from "react";
import { fetchNames } from "../helpers/fetchNames";
import 'bootstrap/dist/js/bootstrap.bundle.min';


export const SelectCity = ({ handleCity }) => {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [finalData, setFinalData] = useState("");
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return; // Evita agregar una tarea vacía

    // Hace el fetch y te devulve un [] el cual es el que se muestra en la sublista
    const { data } = await fetchNames(input);

    setData(data);
  };
  useEffect(() => {
    // Verifica si finalData está definido
    if (finalData) {
      // Concatena el nombre y el estado si está disponible
      setInput(`${finalData.name}-${finalData.state ? finalData.state : ""}`);
    }
  }, [finalData]);
  // Con este metodo seleccionamos la ciudad de todas las que nos devuelve el fetch
  const selectFinalData = (city) => {
    // Lo guardamos como la seleccion final
    setFinalData(city);
    // Concatenamos las dos cosas para que se sobre escriba en el input
    setInput(
      finalData.name + "" + finalData.state ? "-" + finalData.state : ""
    );

    handleCity(city);
  };

  return (



    
    // Al escribir en el input busca en el handleSubmit
    <div className="container"> 
    <form onSubmit={handleSubmit}>
      <div className="input-group">

        <input
          type="text"
          className="form-control"
          name="text"
          id="text"
          placeholder="Ingrese una ciudad"
          value={input}
          onChange={handleInput}
        />
        <button type="submit" className="btn btn-outline-secondary" id="input-group-button-left">Buscar</button>
        {/* Muestra una sublista que al darle click en uno de ellos se pone en el input  */}
        
        {data &&
        <ul className="list-group p-0 dropdown-menu mt-5">
          {data.map((city) => (
            <li key={city.id} className="list-group-item dropdown-item" onClick={() => selectFinalData(city)}>
              {city.name}-{city.state}
            </li>

          ))}</ul>
        }
          
      </div>
    </form>
    </div>
    
  );
};
