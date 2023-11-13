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
            name: 'Benroth Chocolates',
            position: [-41.13746678605862, -71.30353999998938]
        },
        {
            name: 'El Bosque Bariloche Artesanías',
            position: [-41.133716507285925, -71.30504264982974]
        },
        {
            name: 'La Peninsula Chocolateria',
            position: [-41.134400696158814, -71.30123616038883]
        },
        {
            name: 'Malgari Helados',
            position: [-41.135152821146754, -71.29523224662391]
        },
        {
            name: 'Las Brujas Regaleria',
            position: [-41.13421035618051, -71.31204064996929]
        },
        {
            name: 'La Casita Restaurante Bariloche',
            position: [-41.13451695128048, -71.30860310621514]
        }
    ]

    const allProducts = [
        {tipo:'Producto', title: 'Chocolates', price: '$4500.00', comercio: comercios[0], comercianteLink: 'commerces/paradisechocolates.html', detalleLink: 'avisos/chocolates1.html' },
        {tipo:'Producto', title: 'Chocolates', price: '$4000.00', comercio: comercios[1], comercianteLink: 'commerces/benrothchocolates.html', detalleLink: 'avisos/chocolates2.html' },
        {tipo:'Producto', title: 'Recuerdos', price: '$2500.00', comercio: comercios[2], comercianteLink: 'commerces/elbosquebarilocheartesanías.html', detalleLink: 'avisos/recuerdos1.html' },
        {tipo:'Producto', title: 'Chocolates', price: '$3000.00', comercio: comercios[3], comercianteLink: 'commerces/lapeninsulachocolateria.html', detalleLink: 'avisos/chocolates3.html' },
        {tipo:'Producto', title: 'Helados', price: '$2300.00', comercio: comercios[4], comercianteLink: 'commerces/malgarihelados.html', detalleLink: 'avisos/helados.html' },
        {tipo:'Producto', title: 'Recuerdos', price: '$2150.00', comercio: comercios[5], comercianteLink: 'commerces/lasbrujasregaleria.html', detalleLink: 'avisos/recuerdos2.html' },
        {tipo:'Servicio', title: 'Restaurant', price: '$', comercio: comercios[6], comercianteLink: 'commerces/lacasitarestaurantebariloche.html', detalleLink: 'avisos/restaurant.html' }
        // ... otros productos
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
        const nombreSinEspacioYMayusculas = product.comercio.name.toLowerCase().replace(/\s+/g, '');
        const nombreSinEspacioYMayusculas2 = product.title.toLowerCase().replace(/\s+/g, '');
        const productContainer = document.createElement('div');
        productContainer.classList.add('cursor-pointer', 'border', 'h-content', 'border-gray-300', 'lg:w-[30vw]', 'rounded', 'p-4', 'hover:shadow-md');
        productContainer.innerHTML = `
            <h2 class="text-xl font-bold mb-2">${product.title}</h2>
            <p class="text-gray-700">${product.price}</p>
            <p class="text-gray-700">${product.comercio.name}</p>
            <p class="text-gray-700">${product.tipo}</p>

            <button class="bg-blue-500 text-white px-4 py-2 mt-2 rounded" data-lat="${product.comercio.position[0]}" data-lng="${product.comercio.position[1]}">Ir al mapa</button>
            <a href="${product.comercianteLink}" target="_blank"> <button class="bg-purple-500 text-white px-4 py-2 mt-2 rounded">Página Comerciante</button></a>
            <a href="${product.detalleLink}" target="_blank"> <button class="bg-yellow-500 text-white px-4 py-2 mt-2 rounded">Ver producto</button></a>

         
        `;
        productContainer.addEventListener('click', function () {
            handleProductClick(product);
        });
        productList.appendChild(productContainer);

        const marker = L.marker(product.comercio.position).addTo(map);
        marker.bindPopup(`<a href="/html/commerces/${nombreSinEspacioYMayusculas}.html" target="_blank">${product.comercio.name}</a>`);
        markers.push(marker);
    });

    // Agregar eventos click para los botones adicionales
    const productButtons = document.querySelectorAll('#productList button');
    productButtons.forEach((button) => {
        button.addEventListener('click', function () {
            if (this.getAttribute('data-lat') && this.getAttribute('data-lng')) {
                const lat = parseFloat(this.getAttribute('data-lat'));
                const lng = parseFloat(this.getAttribute('data-lng'));
                map.setView([lat, lng], 20);
            } else if (this.getAttribute('data-product')) {
                const productName = this.getAttribute('data-product');
                alert(`Aviso del Producto: ${productName}`);
            } else if (this.getAttribute('data-commerce')) {
                const commerceName = this.getAttribute('data-commerce');
                alert(`Ir al Comercio: ${commerceName}`);
            }
        });
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