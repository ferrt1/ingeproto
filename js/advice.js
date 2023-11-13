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
  

//   const getSimilarProductsClousure = async (searchedProduct) => {
//     const baseUrl = 'https://api.mercadolibre.com/sites/MLA/search?q=';
//     const similarProductsApi = baseUrl + searchedProduct;
//     const similarProductsResponse = (await (await fetch(similarProductsApi)).json()).results;
//     let iterator = 4;
  
//     return () => {
//       const similarProducts = [];
//       for (let i = 0; i < iterator; i++) {
//         const product = similarProductsResponse[i];
//         const data = { nombre: product.title, vendedor: product.seller.nickname, precio: product.price };
//         similarProducts.push(data);
//       }
//       iterator += 4;
//       return similarProducts;
//     };
//   };

//   const [productName, setProductName] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   const handleSearch = async () => {
//     const getSimilarProducts = await getSimilarProductsClousure(productName);
//     const results = getSimilarProducts();
//     setSearchResults(results);
//   };

//   useEffect(() => {
//     if (productName) {
//       handleSearch();
//     }
//   }, [productName]);


//   return (
//     <div className="max-w-md mx-auto mt-12 p-6 bg-gray-100 rounded-md">
//       <h2 className='p-2'>Consulta productos similares:</h2>
//       <input
//         type="text"
//         value={productName}
//         onChange={(e) => setProductName(e.target.value)}
//         placeholder="Nombre del producto"
//         className="w-full p-2 mb-4 border rounded-md"
//       />
//       <button onClick={handleSearch} className="w-full p-2 bg-blue-500 text-white rounded-md">
//         Buscar
//       </button>
//       {searchResults.map((product, index) => (
//         <div key={index} className="my-4 p-4 bg-white rounded-md shadow-md">
//           <p className="text-lg font-semibold">Nombre: {product.nombre}</p>
//           <p>Vendedor: {product.vendedor}</p>
//           <p>Precio: {product.precio}</p>
//         </div>
//       ))}
//     </div>
//   );
// };