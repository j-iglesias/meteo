process.emitWarning = () => {};

const fetch = require("node-fetch");

//const teisLatitud = 42.2576;
//const teisLongitud = -8.683;

const obtenInformacionMeteo = async (latitud, longitud) => {
  const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current_weather=true`;
  try {
    const respuestaAPI = await fetch(apiURL);

    const respuestaAPIenJSON = await respuestaAPI.json();
    return respuestaAPIenJSON;
  } catch (error) {
    console.error("Algo no funciona majete");
    return null;
  }
};

const descripcionTiempo = new Map([
  [0, "☀️ Cielo despejado"],
  [[1, 2, 3], "🌤 Principalmente despejado"],
  [[45, 48], "🌫 Niebla y escarcha"],
  [[51, 53, 55], "🌦 Llovizna"],
  [[56, 57], "❄️ Llovizna helada"],
  [[61, 63, 65], "🌧 Lluvia"],
  [[66, 67], "❄️ Lluvia helada"],
  [[71, 73, 75], "🌨 Nevadas"],
  [77, "🌨 Granos de nieve"],
  [[80, 81, 82], "🌧 Lluvias ligeras a violentas"],
  [[85, 86], "❄️ Chubascos de nieve"],
  [95, "⛈ Tormenta eléctrica"],
  [[96, 99], "⛈⚡ Tormenta eléctrica con granizo"],
]);

const obtenerDescripcion = (codigo) => {
  for (const [claves, descripcion] of descripcionTiempo) {
    if (Array.isArray(claves)) {
      if (claves.includes(codigo)) {
        return descripcion;
      }
    } else if (claves === codigo) {
      return descripcion;
    }
  }
  return "❓ Código desconocido";
};

const procesaDireccionViento = (direccionViento) => {
  if (direccionViento < 0 || direccionViento > 360) {
    return "❓ Valor fuera de rango";
  }

  if (direccionViento >= 337.5 || direccionViento < 22.5) return "Norte (N)";
  if (direccionViento >= 22.5 && direccionViento < 67.5) return "Noreste (NE)";
  if (direccionViento >= 67.5 && direccionViento < 112.5) return "Este (E)";
  if (direccionViento >= 112.5 && direccionViento < 157.5)
    return "Sureste (SE)";
  if (direccionViento >= 157.5 && direccionViento < 202.5) return "Sur (S)";
  if (direccionViento >= 202.5 && direccionViento < 247.5)
    return "Suroeste (SW)";
  if (direccionViento >= 247.5 && direccionViento < 292.5) return "Oeste (O)";
  if (direccionViento >= 292.5 && direccionViento < 337.5)
    return "Noroeste (NW)";
};

const procesaVelocidadViento = (velocidadViento) => {
  return velocidadViento < 8
    ? `🌬 ${velocidadViento} km/h - Frescachón`
    : `💨 ${velocidadViento} km/h - Temporal`;
};

const procesaTemperatura = (temperatura) => {
  if (temperatura === undefined || temperatura === null) {
    throw new Error("Error en la solicitud a la API");
  }
  return temperatura < 18
    ? `🥶 ${temperatura}º - Abrígate`
    : `😎 ${temperatura}º - Buen clima`;
};

//Exportar funciones para pruebas con Jest
module.exports = {
  obtenInformacionMeteo,
  obtenerDescripcion,
  procesaDireccionViento,
  procesaTemperatura,
  procesaVelocidadViento,
};
