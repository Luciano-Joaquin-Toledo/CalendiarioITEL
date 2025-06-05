document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            if (!username || !password) {
                alert('Completa usuario y contraseña');
                return;
            }
            // Aquí iría la lógica real de login
            // Simulación de login exitoso
            window.location.href = 'panel.html';
        });
    }

    // Ejemplo de enlaces de ayuda
    document.getElementById('forgot-username')?.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Funcionalidad para recuperar usuario próximamente.');
    });
    document.getElementById('forgot-password')?.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Funcionalidad para recuperar contraseña próximamente.');
    });
    document.querySelector('.register-link')?.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Funcionalidad de registro próximamente.');
    });
    document.querySelector('.help-link')?.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Centro de ayuda próximamente.');
    });
});
