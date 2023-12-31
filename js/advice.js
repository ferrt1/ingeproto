document.getElementById('agregarAvisos').addEventListener('click', function () {
    document.getElementById('agregarAvisos').style.display = 'none';
    document.getElementById('botonesAccion').style.display = 'flex';
    document.getElementById('formServicio').style.display = 'none';

  });

  document.getElementById('agregarServicio').addEventListener('click', function () {
    document.getElementById('formServicio').style.display = 'block';
    document.getElementById('formProducto').style.display = 'none';
    const checkboxPrecioAviso = document.getElementById('precioAviso');
    const campoPrecioAviso = document.getElementById('campoPrecioAviso');
  
    checkboxPrecioAviso.addEventListener('change', function () {
      campoPrecioAviso.classList.toggle('hidden', !checkboxPrecioAviso.checked);
    });
    document.getElementById('searchResults').classList.add('hidden');
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

  
// PRECIOS SIMILARES

  const getSimilarProductsClousure = async (searchedProduct) => {
    const baseUrl = 'https://api.mercadolibre.com/sites/MLA/search?q=';
    const similarProductsApi = baseUrl + searchedProduct;
    const similarProductsResponse = (await (await fetch(similarProductsApi)).json()).results;
    
    let iterator = 4;

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


    if (nombreProducto && checkboxPrecioProducto.checked) {
      const getSimilarProducts = await getSimilarProductsClousure(nombreProducto);
      const results = getSimilarProducts();
      displaySimilarProducts(results);
    } else {
      alert('Por favor, ingrese un nombre y marque el checkbox "Agregar Precio" antes de consultar productos similares.');
    }
  }

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
    document.getElementById('searchResults').classList.remove('hidden');
  }




// Alerta agregar


document.getElementById('btnAgregarServicio').addEventListener('click', function () {
  const nombreServicio = document.getElementById('nombreServicio').value.trim();
  const detalleServicio = document.getElementById('detalleServicio').value.trim();
  const fotoServicio = document.getElementById('fotoServicio').value.trim();
  const categoriaServicio = document.getElementById('categoriaServicio').value.trim();
  const restriccionesServicio = document.getElementById('restriccionesServicio').value.trim();
  const precioAvisoCheckbox = document.getElementById('precioAviso');
  const precioAvisoInput = document.getElementById('precioAviso');

  if (nombreServicio === '' || detalleServicio === '' || restriccionesServicio === '' || fotoServicio === '' || categoriaServicio === '') {
    alert('Por favor, complete todos los campos.');
  } else if (precioAvisoCheckbox.checked && precioAvisoInput.value.trim() === '') {
    alert('Por favor, complete el campo de precio del aviso.');
  } else if (precioAvisoCheckbox.checked && parseFloat(precioAvisoInput.value.trim()) < 0) {
    alert('El precio del servicio debe ser positivo.');
  } else {
    alert('Servicio guardado con éxito.');
    document.getElementById('formServicio').reset();
  }
});

document.getElementById('btnAgregarProducto').addEventListener('click', function () {
  const nombreProducto = document.getElementById('nombreProducto').value.trim();
  const detalleProducto = document.getElementById('detalleProducto').value.trim();
  const fotoProducto = document.getElementById('fotoProducto').value.trim(); 
  const categoriaProducto = document.getElementById('categoriaProducto').value.trim();
  const caracteristicaProducto = document.getElementById('caracteristicaProducto').value.trim();
  const precioProductoCheckbox = document.getElementById('precioProducto');
  const precioProductoInput = document.getElementById('precio');

  document.getElementById('searchResults').classList.add('hidden');
  
  if (nombreProducto === '' || detalleProducto === '' || fotoProducto === '' || categoriaProducto === '' || caracteristicaProducto==='') {
      alert('Por favor, complete todos los campos.');
  } else if (precioProductoCheckbox.checked && precioProductoInput.value.trim() === '') {
      alert('Por favor, complete el campo de precio del producto.');
  } else if(precioProductoCheckbox.checked && parseFloat(precioProductoInput.value.trim()) < 0){
    alert('El precio del producto debe ser positivo.');
  }
  else {
      alert('Producto guardado con éxito.');
      document.getElementById('formProducto').reset();
  }
});

