document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menu-icon');
    const navMenu = document.getElementById('menu');

    menuIcon.addEventListener('click', function () {
      navMenu.classList.toggle('hidden');
    });
  });