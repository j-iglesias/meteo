import fetch from "node-fetch";

const teisLatitud = 42.2576;
const teisLongitud = -8.683;
let respuestaAPIenJSON = "";

const obtenInformacionMeteo = async (latitud, longitud) => {
  const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current_weather=true`;
  let respuestaAPI = await fetch(apiURL);
  respuestaAPIenJSON = await respuestaAPI.json();
  console.log(respuestaAPI.OK);
};

const procesaCodigoTiempo = () => {
  let codigoTiempo = respuestaAPIenJSON.current_weather.weathercode;
  console.log(codigoTiempo);
};

switch (codigoTiempo) {
  case 0:
    console.log("Cielo despejado");
    break;
  case 1:
    console.log("Principalmente despejado");
    break;
  case 2:
    console.log("");
    break;
  case 3:
    console.log("");
    break;
  case 45:
    console.log("");
    break;
  case 48:
    console.log("Niebla y escarcha");
    break;
  case 51:
    console.log("");
    break;
  case 53:
    console.log("");
    break;
  case 55:
    console.log("Llovizna");
    break;
  case 56:
    console.log("");
    break;
  case 57:
    console.log("Llovizna helada");
    break;
  case 61:
    console.log("");
    break;
  case 63:
    console.log("Lluvia");
    break;
  case 65:
    console.log("");
    break;
  case 66:
    console.log("");
    break;
  case 67:
    console.log("Lluvia helada");
    break;
  case 71:
    console.log("Nevadas");
    break;
  case 73:
    console.log("");
    break;
  case 75:
    console.log("");
    break;
  case 77:
    console.log("Granos de nieve");
    break;
  case 80:
    console.log("");
    break;
  case 81:
    console.log("");
    break;
  case 82:
    console.log("Lluvias ligeras a violentas");
    break;
  case 85:
    console.log();
    break;
  case 86:
    console.log("Chubascos de nieve");
    break;
  case 95:
    console.log("Tormenta eléctrica");
    break;
  case 96:
    console.log("");
    break;
  case 99:
    console.log("Tormenta eléctrica con granizo");
    break;
}

const procesaDireccionViento = () => {
  let direccionViento = respuestaAPIenJSON.current.win_direction_10m;
  //console.log("direcionViento");

  //function obtenerSector(direccionViento) { //elimino funcion para no tener una funcion dentro de otra funcion.
  if (direccionViento >= 337.5 || direccionViento < 22.5) {
    return "Norte (N)";
  } else if (direccionViento >= 22.5 && direccionViento < 67.5) {
    return "Noreste (NE)";
  } else if (direccionViento >= 67.5 && direccionViento < 112.5) {
    return "Este (E)";
  } else if (direccionViento >= 112.5 && direccionViento < 157.5) {
    return "Sureste (SE)";
  } else if (direccionViento >= 157.5 && direccionViento < 202.5) {
    return "Sur (S)";
  } else if (direccionViento >= 202.5 && direccionViento < 247.5) {
    return "Suroeste (SW)";
  } else if (direccionViento >= 247.5 && direccionViento < 292.5) {
    return "Oeste (O)";
  } else if (direccionViento >= 292.5 && direccionViento < 337.5) {
    return "Noroeste (NW)";
  } else if (direccionViento > 360 || 0 > direccionViento) {
    return "Valor fuera de Rango. Debe ser entre 0 y 360";
  }
};

// Ejemplo de uso:
console.log(obtenerSector(1)); // "Norte (N)"
console.log(obtenerSector(45)); // "Noreste (NE)"
console.log(obtenerSector(180)); // "Sur (S)"
console.log(obtenerSector(270)); // "Oeste (O)"

const procesaVelocidadViento = () => {
  let velocidadViento = respuestaAPIenJSON.current.wind_speed_10m;
  console.log(velocidadViento);
  if (velocidadViento < 8) {
    console.log("Frescachón");
  } else {
    console.log("Temporal");
  }
};

const procesaTemperatura = () => {
  let codigoTemperatura = respuestaAPIenJSON.current.temperature_2m;
  console.log(codigoTemperatura);
  if (codigoTemperatura < 18) {
    console.log("Abrigate");
  } else {
    console.log("Buen clima");
  }
};

const main = async () => {
  await obtenInformacionMeteo(teisLatitud, teisLongitud);
  procesaCodigoTiempo();
  procesaDireccionViento();
  procesaTemperatura();
  procesaVelocidadViento();
};

main();
