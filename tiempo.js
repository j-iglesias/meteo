import fetch from "node-fetch";

const teisLatitud = 42.2576;
const teisLongitud = -8.683;
let respuestaAPIenJSON = "";

const obtenInformacionMeteo = async (latitud, longitud) => {
  const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current_weather=true`;
  let respuestaAPI = await fetch(apiURL);
  respuestaAPIenJSON = await respuestaAPI.json();
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
  case 45:
  case 48:
    console.log("Niebla y escarcha");
    break;
  case 51:
  case 53:
  case 55:
    console.log("Llovizna");
    break;
  case 56:
  case 57:
    console.log("Llovizna helada");
    break;
  case (61, 63, 65):
    console.log("Lluvia");
    break;
  case (66, 67):
    console.log("Lluvia helada");
    break;
  case (71, 73, 75):
    console.log("Nevadas");
    break;
  case 77:
    console.log("Granos de nieve");
    break;
  case (80, 81, 82):
    console.log("Lluvias ligeras a violentas");
    break;
  case (85, 86):
    console.log("Chubascos de nieve");
    break;
  case 95:
    console.log("Tormenta eléctrica");
    break;
  case (96, 99):
    console.log("Tormenta eléctrica con granizo");
    break;
}

const procesaDirecionViento = () => {
  let direcionViento;
  console.log("direcionViento");
};

// case (respuestaAPIenJSON.winddirection)
// console.log("");
// break;

const main = async () => {
  await obtenInformacionMeteo(teisLatitud, teisLongitud);
  procesaCodigoTiempo();
};

main();

/*
const procesaDirecionViento = () => {

}

//obtenInformacionMeteo(teisLatitud, teisLongitud);

*/

/*
procesaInformacionMeteo()
procsaCodigoFuente()
procesaDirecionViento()
muestraInformacionMeteo()
*/
