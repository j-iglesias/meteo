const fetch = require("node-fetch");

const teisLatitud = 42.2576;
const teisLongitud = -8.683;
let respuestaAPIenJSON = "";
//https://api.open-meteo.com/v1/forecast?latitude=42.2576&longitude=-8.683&current_weather=true

const obtenInformacionMeteo = async (latitud, longitud) => {
  const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current_weather=true`;
  let respuestaAPI = await fetch(apiURL);
  respuestaAPIenJSON = await respuestaAPI.json();
  //console.log(respuestaAPI.OK);
  //console.log(respuestaAPI);
};
//console.log(obtenInformacionMeteo(42.2576, -8.683));
const procesaCodigoTiempo = () => {
  let codigoTiempo = respuestaAPIenJSON.current_weather.weathercode;
  //console.log(codigoTiempo);
};

// Mapa de códigos de tiempo y  descripciones
const descripcionTiempo = new Map([
  [0, "Cielo despejado"],
  [[1, 2, 3], "Principalmente despejado"],
  [[45, 48], "Niebla y escarcha"],
  [[51, 53, 55], "Llovizna"],
  [[56, 57], "Llovizna helada"],
  [[61, 63, 65], "Lluvia"],
  [[66, 67], "Lluvia helada"],
  [[71, 73, 75], "Nevadas"],
  [77, "Granos de nieve"],
  [[80, 81, 82], "Lluvias ligeras a violentas"],
  [[85, 86], "Chubascos de nieve"],
  [95, "Tormenta eléctrica"],
  [[96, 99], "Tormenta eléctrica con granizo"],
]);

// Para obtener la descripción
function obtenerDescripcion(codigo) {
  for (const [claves, descripcion] of descripcionTiempo) {
    if (Array.isArray(claves)) {
      if (claves.includes(codigo)) {
        return descripcion;
      }
    } else if (claves === codigo) {
      return descripcion;
    }
  }
  return "Código desconocido";
}

// Ejemplo de uso
console.log(obtenerDescripcion(3)); // "Principalmente despejado"

const procesaDireccionViento = () => {
  let direccionViento = respuestaAPIenJSON.current_weather.winddirection;
  //console.log("direcionViento");

  //function obtenerSector(direccionViento) { //elimino funcion para no tener una funcion dentro de otra funcion.
  if (direccionViento >= 337.5 || direccionViento < 22.5) {
    console.log("Norte (N)");
  } else if (direccionViento >= 22.5 && direccionViento < 67.5) {
    console.log("Noreste (NE)");
  } else if (direccionViento >= 67.5 && direccionViento < 112.5) {
    console.log("Este (E)");
  } else if (direccionViento >= 112.5 && direccionViento < 157.5) {
    console.log("Sureste (SE)");
  } else if (direccionViento >= 157.5 && direccionViento < 202.5) {
    console.log("Sur (S)");
  } else if (direccionViento >= 202.5 && direccionViento < 247.5) {
    console.log("Suroeste (SW)");
  } else if (direccionViento >= 247.5 && direccionViento < 292.5) {
    console.log("Oeste (O)");
  } else if (direccionViento >= 292.5 && direccionViento < 337.5) {
    console.log("Noroeste (NW)");
  } else if (direccionViento > 360 || 0 > direccionViento) {
    console.log("Valor fuera de Rango. Debe ser entre 0 y 360");
  }
};

// Ejemplo de uso:
// console.log(procesaDireccionViento(1)); // "Norte (N)"
// console.log(procesaDireccionViento(45)); // "Noreste (NE)"
// console.log(procesaDireccionViento(180)); // "Sur (S)"
// console.log(procesaDireccionViento(270)); // "Oeste (O)"

const procesaVelocidadViento = () => {
  let velocidadViento = respuestaAPIenJSON.current_weather.windspeed;
  console.log(velocidadViento);
  if (velocidadViento < 8) {
    console.log(`Velocidad viento: ${velocidadViento} km/h, Frescachón`);
  } else {
    console.log(`Velocidad viento: ${velocidadViento} km/h, Temporal`);
  }
};

const procesaTemperatura = () => {
  let codigoTemperatura = respuestaAPIenJSON.current_weather.temperature;

  if (codigoTemperatura < 18) {
    console.log(`Temperatura: ${codigoTemperatura}º, Abrigate`);
  } else {
    console.log(`Temperatura: ${codigoTemperatura}º, Buen clima`);
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

module.exports = {
  obtenInformacionMeteo,
  procesaCodigoTiempo,
  obtenerDescripcion,
  procesaDireccionViento,
  procesaTemperatura,
  procesaVelocidadViento,
};
