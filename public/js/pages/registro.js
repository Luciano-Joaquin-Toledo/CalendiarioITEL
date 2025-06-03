document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        if (!document.getElementById('terms').checked) {
            alert('Debes aceptar los términos y condiciones.');
            return;
        }
        alert('Registro enviado (demo)');
    });
});