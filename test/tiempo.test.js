const {
  obtenInformacionMeteo,
  procesaCodigoTiempo,
  obtenerDescripcion,
  procesaDireccionViento,
  procesaTemperatura,
  procesaVelocidadViento,
} = require("../src/tiempo.js");

//jest.mock("node-fetch");
//const fetch = require("node-fetch");
beforeAll(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true, // Simula una respuesta exitosa
    json: jest.fn().mockResolvedValue({ clima: "Principalmente despejado" }), // Respuesta simulada
  });
});

afterAll(() => {
  jest.restoreAllMocks(); // Limpia los mocks después de los tests
});
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
          time: "2023-10-01t12:00:00z",
        },
      }),
    };
    fetch.mockResolvedValue(mockResponse);

    const data = await obtenInformacionMeteo(19.4326, -99.1332);
    expect(data.current_weather.temperature).toBe(25);
    expect(data.current_weather.weathercode).toBe(1);
    expect(data.current_weather.windspeed).toBe(10);
    expect(data.current_weather.winddirection).toBe(100);
    expect(data.current_weather.time).toBe("2023-10-01t12:00:00z");
  });

  it("debería lanzar un error si la respuesta no es correcta", async () => {
    const mockResponse = {
      ok: false,
      status: 500,
    };
    fetch.mockResolvedValue(mockResponse);

    await expect(obtenInformacionMeteo(19.4326, -99.1332)).rejects.toThrow(
      "Error en la solicitud."
    );
  });
});
