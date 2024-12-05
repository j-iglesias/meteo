import fetch from "node-fetch";

const teisLatitud = 42.2576;
const teisLongitud = -8.683;

const obtenInformacionMeteo = async (latitud, longitud) => {
  const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current_weather=true`;
  const respuestaAPI = await fetch(apiURL);
  const respuestaAPIenJSON = await respuestaAPI.json();
  console.log(respuestaAPIenJSON);
};

obtenInformacionMeteo(teisLatitud, teisLongitud);
