document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Login enviado (demo)');
    });

    document.getElementById('forgot-username').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Recuperar usuario (demo)');
    });

    document.getElementById('forgot-password').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Recuperar contraseña (demo)');
    });

    document.querySelector('.google-btn').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Login con Google (demo)');
    });
});