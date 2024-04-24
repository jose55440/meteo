import React from 'react'

export const fetchNames = city => {
    async function peticion() {
        const apiKey = 'b14a38bd4b1d38a3fc6d998bf6bbb5c2';
        const url=`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`
        const datatype= await fetch(url);
        const response= await datatype.json()
         return{response}
      
      }
   peticion()
}
