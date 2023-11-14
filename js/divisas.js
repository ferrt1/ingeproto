const fetchEndpoint = async url => (await (await fetch(url)).json());
const getDivisas = async () => {
  return fetchEndpoint('https://api.bluelytics.com.ar/v2/latest')
  .catch(error => console.error(error))
}
// {
//   oficial: { value_avg: 358, value_sell: 368, value_buy: 348 },
//   blue: { value_avg: 935, value_sell: 960, value_buy: 910 },
//   oficial_euro: { value_avg: 389, value_sell: 400, value_buy: 378 },
//   blue_euro: { value_avg: 1016, value_sell: 1043, value_buy: 989 },
//   last_update: '2023-11-10T19:55:31.571765-03:00'
// };
let conversionRatesNow = getDivisas();
setInterval(async () => {
  conversionRatesNow = await getDivisas();
  console.log(conversionRatesNow);
}, 1000 * 60 * 60 * 24); // cada 1 dia se actualizan los precios



// ustedes llaman a estas funciones
async function convertirPesosADolares(pesos) {
  let dolares = pesos / (await conversionRatesNow).oficial.value_avg;
  return dolares;
}
async function convertirPesosAEuros(pesos) {
  let euros = pesos / (await conversionRatesNow).oficial_euro.value_avg;
  return euros;
}


// esto seria la forma de llamarlas, un main de ejemplo
/* (async () => {
  const precioEnDolares = await convertirPesosADolares(1000);
  const precioEnEuros = await convertirPesosAEuros(1000)

  console.log(precioEnDolares);
  console.log(precioEnEuros);
})() */