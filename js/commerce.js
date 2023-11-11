document.addEventListener('DOMContentLoaded', function () {
    const positionInitial = [-41.1395909, -71.3045325];
    const map = L.map('map').setView(positionInitial, 14.5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '<a href="https://www.openstreetmap.org/copyright"></a>'
    }).addTo(map);

    // Función para manejar clics en productos
    function handleProductClick(product) {
        const position = product.position;
        console.log(`Producto clicado: ${product.title}`, position);
        map.setView(position, 20);
    }

    // Lista de productos (puedes agregar más productos)
    const allProducts = [
        { title: 'Chocolates', price: '$5.00', position: [-41.143171230438206, -71.28930529140682] },
        { title: 'Chocolates1', price: '$5.00', position: [-41.140268733884774, -71.29094621166738] },
        { title: 'Recuerdos', price: '$10.00', position: [-41.145032, -71.308914] },
    ];

      // Renderizar productos
      function renderProducts(products) {
        const productList = document.getElementById('productList');
        productList.innerHTML = '';

        products.forEach((product) => {
            const productContainer = document.createElement('div');
            productContainer.classList.add('cursor-pointer', 'border', 'border-gray-300', 'rounded', 'p-4', 'hover:shadow-md');
            productContainer.innerHTML = `
                <h2 class="text-xl font-bold mb-2">${product.title}</h2>
                <p class="text-gray-700">${product.price}</p>
            `;
            productContainer.addEventListener('click', function () {
                handleProductClick(product);
            });
            productList.appendChild(productContainer);
        });
    }

     // Mostrar todos los productos inicialmente


     renderProducts(allProducts); // Mostrar todos los productos inicialmente

     const searchInput = document.getElementById('searchInput');
     const searchButton = document.getElementById('searchButton');
 
     searchButton.addEventListener('click', function () {
         const searchTerm = searchInput.value.toLowerCase();
         const filteredProducts = allProducts.filter((product) =>
             product.title.toLowerCase().includes(searchTerm)
         );
         renderProducts(filteredProducts);
     });


    L.marker([-41.143171230438206, -71.28930529140682]).addTo(map).on('click', function () {
        handleCenterClick([-41.143171230438206, -71.28930529140682]);
    });

    L.marker([-41.145032, -71.308914]).addTo(map).on('click', function () {
        handleCenterClick([-41.145032, -71.308914]);
    });
    L.marker([-41.140268733884774, -71.29094621166738]).addTo(map).on('click', function () {
        handleCenterClick([-41.145032, -71.308914]);
    });
});