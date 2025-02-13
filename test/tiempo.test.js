process.emitWarning = () => {};

const {
  obtenInformacionMeteo,
  obtenerDescripcion,
  procesaDireccionViento,
  procesaTemperatura,
  procesaVelocidadViento,
} = require("../src/tiempo.js");

jest.mock("node-fetch");
const fetch = require("node-fetch");

describe("test infoMeteo ", () => {
  it("debería obtener datos del clima correctamente", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        current_weather: {
          temperature: 25,
          weathercode: 1,
          windspeed: 10,
          winddirection: 100,
        },
      }),
    };
    fetch.mockResolvedValue(mockResponse);

    const data = await obtenInformacionMeteo(19.4326, -99.1332);
    expect(data.current_weather.temperature).toBe(25);
    expect(data.current_weather.weathercode).toBe(1);
    expect(data.current_weather.windspeed).toBe(10);
    expect(data.current_weather.winddirection).toBe(100);
  });
});

describe("Funciones auxiliares", () => {
  test("obtenerDescripcion devuelve la descripción correcta", () => {
    expect(obtenerDescripcion(0)).toBe("☀️ Cielo despejado");
    expect(obtenerDescripcion(1)).toBe("🌤 Principalmente despejado");
    expect(obtenerDescripcion(99)).toBe("⛈⚡ Tormenta eléctrica con granizo");
    expect(obtenerDescripcion(7136484)).toBe("❓ Código desconocido");
  });

  test("procesaDireccionViento devuelve la dirección correcta", () => {
    expect(procesaDireccionViento(0)).toBe("Norte (N)");
    expect(procesaDireccionViento(45)).toBe("Noreste (NE)");
    expect(procesaDireccionViento(90)).toBe("Este (E)");
    expect(procesaDireccionViento(135)).toBe("Sureste (SE)");
    expect(procesaDireccionViento(180)).toBe("Sur (S)");
    expect(procesaDireccionViento(225)).toBe("Suroeste (SW)");
    expect(procesaDireccionViento(270)).toBe("Oeste (O)");
    expect(procesaDireccionViento(315)).toBe("Noroeste (NW)");
    expect(procesaDireccionViento(-100)).toBe("❓ Valor fuera de rango");
  });

  test("procesaTemperatura devuelve el mensaje adecuado", () => {
    // // Test para procesar temperaturas
    expect(procesaTemperatura(10)).toBe("🥶 10º - Abrígate");
    expect(procesaTemperatura(25)).toBe("😎 25º - Buen clima");
    expect(procesaTemperatura(null)).toThrow("Error en la solicitud a la API");
  });

  test("procesaVelocidadViento clasifica correctamente la velocidad", () => {
    expect(procesaVelocidadViento(5)).toBe("🌬 5 km/h - Frescachón");
    expect(procesaVelocidadViento(20)).toBe("💨 20 km/h - Temporal");
  });
});
