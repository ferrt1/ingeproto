document.addEventListener('DOMContentLoaded', function () {
    const positionInitial = [-41.1395909, -71.3045325]
    const centroMedico1 = [ -41.136126191854494, -71.30022234459359 ]
    const centroMedico2 = [ -41.138296255634586, -71.3125589557101 ]

    const centroMovil1 = [-41.13930127399054, -71.30650102885919]
    const centroMovil2 = [-41.13495347993787, -71.30711268383433]

    const map = L.map('map').setView(positionInitial, 14.5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '<a href="https://www.openstreetmap.org/copyright"></a>'
    }).addTo(map);
  
    map.scrollWheelZoom.disable();
  
    function handleCenterClick(position) {
      console.log("Centro clicado:", position);
      map.setView(position, 20);
    }
  
    const centroContainers = document.querySelectorAll('.centro-container');
    centroContainers.forEach((container) => {
      container.addEventListener('click', function () {
        const positionString = container.getAttribute('data-position');
        const position = positionString.split(',').map(parseFloat);
        handleCenterClick(position);
      });
    });

    L.marker(centroMedico1).addTo(map).on('click', function () {
        handleCenterClick(centroMedico1);
      });

    L.marker(centroMedico2).addTo(map).on('click', function () {
        handleCenterClick(centroMedico2);
      });

    L.marker(centroMovil1).addTo(map).on('click', function () {
        handleCenterClick(centroMovil1);
    });

    L.marker(centroMovil2).addTo(map).on('click', function () {
        handleCenterClick(centroMovil2);
    });

  });