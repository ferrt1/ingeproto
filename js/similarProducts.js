const fetchEndpoint = async url => (await (await fetch(url)).json());
const createSimilarProductsClousure = async searchedProduct => {
  let iterator = 4;
  let offset = 0;
  const baseUrl = 'https://api.mercadolibre.com/sites/MLA/search?q=';
  let similarProductsApi = baseUrl + searchedProduct;
  let similarProductsResponse = (await fetchEndpoint(similarProductsApi)).results;

  return async () => {
    const similarProducts = [];
    console.log('iterator' + iterator);
    if (iterator > 46) {
      iterator = 0;
      offset++;
      console.log('offset' + offset);
      console.log('new peticion');
      similarProductsResponse = (await fetchEndpoint(similarProductsApi + '&offset=' + offset)).results;
    }
    for (let i = 0; i < 4; i++) {
      const product = similarProductsResponse[i + iterator];
      const data = { nombre: product.title, vendedor: product.seller.nickname, precio: product.price }
      similarProducts.push(data);
    }
    iterator += 4;
    return similarProducts;
  };
}

let getNewSimilarProducts;

// ustedes usan estas 2 funciones

// clickSearchButtonHandler la llamas pasandole el nombre del producto a buscar. la llamas cuando toca el boton de buscar
async function clickSearchButtonHandler(searchedProduct) {
  getNewSimilarProducts = await createSimilarProductsClousure(searchedProduct);
}

// clickMoreProductsButtonHandler la llamas para obtener 4 productos del producto que le pasaste por parametro a la otra funcion. La podes llamar tantas veces como quieras, obtenes resultados nuevos. Esta pensado para un boton de "mostrar más" del mismo producto
async function clickMoreProductsButtonHandler() {
  return await getNewSimilarProducts();
}


// un main de ejemplo
/* (async () => {
  await clickSearchButtonHandler('Nintendo Switch');

  for (const similarProduct of await clickMoreProductsButtonHandler()) {
    console.log(similarProduct.nombre);
    console.log(similarProduct.vendedor);
    console.log(similarProduct.precio);
  }

  for (const similarProduct of await clickMoreProductsButtonHandler()) {
    console.log(similarProduct.nombre);
    console.log(similarProduct.vendedor);
    console.log(similarProduct.precio);
  }


  await clickSearchButtonHandler('Playstation');
  console.log('playyyy\n\n\n\n\n');

  for (const similarProduct of await clickMoreProductsButtonHandler()) {
    console.log(similarProduct.nombre);
    console.log(similarProduct.vendedor);
    console.log(similarProduct.precio);
  }

  for (const similarProduct of await clickMoreProductsButtonHandler()) {
    console.log(similarProduct.nombre);
    console.log(similarProduct.vendedor);
    console.log(similarProduct.precio);
  }
})() */