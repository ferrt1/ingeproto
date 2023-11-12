let markers = [];
document.addEventListener('DOMContentLoaded', function () {
    const positionInitial = [-41.1395909, -71.3045325];
    const map = L.map('map').setView(positionInitial, 14.5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '<a href="https://www.openstreetmap.org/copyright"></a>'
    }).addTo(map);
    // Función para manejar clics en productos
    function handleProductClick(product) {
        const position = product.comercio.position;
        console.log(`Producto clicado: ${product.title}`, position);
        map.setView(position, 20);
    }

    const comercios = [
        {
            name: 'Paradise Chocolates',
            position: [-41.143171230438206, -71.28930529140682]
        },
        {
            name: 'Chocolateria',
            position: [-41.140268733884774, -71.29094621166738]
        },
        {
            name: 'Recuerdos Juancito',
            position: [-41.139897659283825, -71.31086340025574]
        },
        {
            name: 'La Peninsula chocolateria',
            position: [-41.134400696158814, -71.30123616038883]
        },
        {
            name: 'Malgari Helados',
            position: [-41.135152821146754, -71.29523224662391]
        },
        {
            name: 'Las Brujas regaleria',
            position: [-41.13421035618051, -71.31204064996929]
        },
        {
            name: 'Los duendes del Bosque',
            position: [-41.133715427280244, -71.3089203182679]
        }
    ]

    // Lista de productos (puedes agregar más productos)
    const allProducts = [
        { title: 'Chocolates', price: '$4500.00', comercio: comercios[0] },
        { title: 'Chocolates', price: '$4000.00', comercio: comercios[1] },
        { title: 'Recuerdos', price: '$2500.00', comercio: comercios[2] },
        { title: 'Helados', price: '$3000.00', comercio: comercios[3] },
        { title: 'Recuerdos', price: '$2300.00', comercio: comercios[4] },
        { title: 'Recuerdos', price: '$2150.00', comercio: comercios[5] },

    ];

    // Renderizar productos
    function renderProducts(products) {
        for (const marker of markers) {
            marker.remove();
        }
        markers = [];
        const productList = document.getElementById('productList');
        productList.innerHTML = '';

        products.forEach((product) => {
            const productContainer = document.createElement('div');
            productContainer.classList.add('cursor-pointer', 'border','h-content' , 'border-gray-300', 'w-[25vw]', 'rounded', 'p-4', 'hover:shadow-md');
            productContainer.innerHTML = `
                <h2 class="text-xl font-bold mb-2">${product.title}</h2>
                <p class="text-gray-700">${product.price}</p>
            `;
            productContainer.addEventListener('click', function () {
                handleProductClick(product);
            });
            productList.appendChild(productContainer);

            const nombreSinEspacioYMayusculas = product.comercio.name.toLowerCase().replace(/\s+/g, '');
            const marker = L.marker(product.comercio.position).addTo(map);
            marker.bindPopup(`<a href="/html/commerces/${nombreSinEspacioYMayusculas}.html" target="_blank">${product.comercio.name}</a>`);
            markers.push(marker);
        });
    }


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
});