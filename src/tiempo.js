const fetch = require("node-fetch");

const teisLatitud = 42.2576;
const teisLongitud = -8.683;

// Función para obtener la información meteorológica
const obtenInformacionMeteo = async (latitud, longitud) => {
  try {
    const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current_weather=true`;
    const respuestaAPI = await fetch(apiURL);
    if (!respuestaAPI.ok) {
      throw new Error("Error en la solicitud a la API");
    }
    return await respuestaAPI.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Mapa de códigos de tiempo y descripciones con emojis
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
  return "❓ Valor fuera de rango";
};

const procesaVelocidadViento = (velocidadViento) => {
  return velocidadViento < 8
    ? `🌬 ${velocidadViento} km/h - Frescachón`
    : `💨 ${velocidadViento} km/h - Temporal`;
};

const procesaTemperatura = (temperatura) => {
  return temperatura < 18
    ? `🥶 ${temperatura}º - Abrígate`
    : `😎 ${temperatura}º - Buen clima`;
};

const main = async () => {
  const datosMeteo = await obtenInformacionMeteo(teisLatitud, teisLongitud);
  if (!datosMeteo) return;
  console.log(obtenerDescripcion(datosMeteo.current_weather.weathercode));
  console.log(procesaDireccionViento(datosMeteo.current_weather.winddirection));
  console.log(procesaTemperatura(datosMeteo.current_weather.temperature));
  console.log(procesaVelocidadViento(datosMeteo.current_weather.windspeed));
};

// Ejecutar
//main();

// Exportar funciones para pruebas con Jest
module.exports = {
  obtenInformacionMeteo,
  obtenerDescripcion,
  procesaDireccionViento,
  procesaTemperatura,
  procesaVelocidadViento,
};

/* // Pruebas con Jest
if (require.main === module) {
  const { test, expect } = require("@jest/globals");

  test("obtenerDescripcion devuelve la descripción correcta", () => {
    expect(obtenerDescripcion(0)).toBe("☀️ Cielo despejado");
    expect(obtenerDescripcion(1)).toBe("🌤 Principalmente despejado");
    expect(obtenerDescripcion(99)).toBe("⛈⚡ Tormenta eléctrica con granizo");
  });

  test("procesaDireccionViento devuelve la dirección correcta", () => {
    expect(procesaDireccionViento(0)).toBe("Norte (N)");
    expect(procesaDireccionViento(45)).toBe("Noreste (NE)");
    expect(procesaDireccionViento(180)).toBe("Sur (S)");
  });

  test("procesaTemperatura devuelve el mensaje adecuado", () => {
    expect(procesaTemperatura(10)).toBe("🥶 10º - Abrígate");
    expect(procesaTemperatura(25)).toBe("😎 25º - Buen clima");
  });

  test("procesaVelocidadViento clasifica correctamente la velocidad", () => {
    expect(procesaVelocidadViento(5)).toBe("🌬 5 km/h - Frescachón");
    expect(procesaVelocidadViento(20)).toBe("💨 20 km/h - Temporal");
  });
}
 */
