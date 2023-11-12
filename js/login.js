function handleLogin() {
    const username = document.getElementById('loginusername').value;
    const password = document.getElementById('loginpassword').value;

    // Verificar las credenciales
    const comercianteCredentials = { username: "comerciante123", password: "comerciante123" };

    if (username === comercianteCredentials.username && password === comercianteCredentials.password) {
        // Redirigir al área de comerciante
        window.location.href = "/html/comerciante.html";
    } else {
        alert("El email o la contraseña son incorrectos");
    }
}