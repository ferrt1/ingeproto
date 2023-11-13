document.getElementById('agregarAvisos').addEventListener('click', function () {
    document.getElementById('agregarAvisos').style.display = 'none';
    document.getElementById('botonesAccion').style.display = 'flex';
    document.getElementById('formServicio').style.display = 'none';
    document.getElementById('formProducto').style.display = 'none';
  });

  document.getElementById('agregarServicio').addEventListener('click', function () {
    document.getElementById('formServicio').style.display = 'block';
    document.getElementById('formProducto').style.display = 'none';
    const checkboxPrecioAviso = document.getElementById('precioAviso');
    const campoPrecioAviso = document.getElementById('campoPrecioAviso');
  
    checkboxPrecioAviso.addEventListener('change', function () {
      campoPrecioAviso.classList.toggle('hidden', !checkboxPrecioAviso.checked);
    });
  });

  document.getElementById('agregarProducto').addEventListener('click', function () {
    document.getElementById('formServicio').style.display = 'none';
    document.getElementById('formProducto').style.display = 'block';

      const checkboxPrecio = document.getElementById('precioProducto');
  const campoPrecio = document.getElementById('campoPrecio');

  checkboxPrecio.addEventListener('change', function () {
    campoPrecio.classList.toggle('hidden', !checkboxPrecio.checked);
  });
  });
  

  const getSimilarProductsClousure = async (searchedProduct) => {
    const baseUrl = 'https://api.mercadolibre.com/sites/MLA/search?q=';
    const similarProductsApi = baseUrl + searchedProduct;
    const similarProductsResponse = (await (await fetch(similarProductsApi)).json()).results;
    
    let iterator = 4;

    console.log(similarProductsResponse); // Puedes imprimir la respuesta para verificar en la consola

    return () => {
      const similarProducts = [];
      for (let i = 0; i < iterator; i++) {
        const product = similarProductsResponse[i];
        const data = { nombre: product.title, vendedor: product.seller.nickname, precio: product.price };
        similarProducts.push(data);
      }
      iterator += 4;
      return similarProducts;
    };
  };

  async function searchSimilarProducts() {
    const nombreProducto = document.getElementById('nombreProducto').value;
    const checkboxPrecioProducto = document.getElementById('precioProducto');

    // Verificar si se ingresó un nombre y se marcó el checkbox
    if (nombreProducto && checkboxPrecioProducto.checked) {
      // Obtener la función de productos similares
      const getSimilarProducts = await getSimilarProductsClousure(nombreProducto);
      // Obtener y mostrar los resultados
      const results = getSimilarProducts();
      displaySimilarProducts(results);
    } else {
      alert('Por favor, ingrese un nombre y marque el checkbox "Agregar Precio" antes de consultar productos similares.');
    }
  }

  // Función para mostrar los resultados de productos similares
  function displaySimilarProducts(products) {
    const resultsContainer = document.getElementById('searchResultsContainer');
    resultsContainer.innerHTML = '';

    products.slice(0, 4).forEach(product => {
      const productContainer = document.createElement('div');
      productContainer.className = 'product my-4 p-4 bg-white rounded-md shadow-md';
      productContainer.innerHTML = `
        <p class="product-name text-lg font-semibold">${product.nombre}</p>
        <p class="product-price text-black">$${product.precio}</p>
        <p class="product-seller text-black">Vendedor: ${product.vendedor}</p>
      `;
      resultsContainer.appendChild(productContainer);
    });
    // Muestra la sección de resultados
    document.getElementById('searchResults').classList.remove('hidden');
  }