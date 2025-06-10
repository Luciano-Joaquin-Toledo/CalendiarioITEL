<?php
Require ("../config/config.php");
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./css/registro.css">
</head>
<body>
    <div class="register-container">
        <!-- Logo -->
        <img src="./img/Logo.png" alt="Logo" class="register-logo img-fluid mx-auto d-block">
        <!-- Título -->
        <div class="register-title mb-2">Registrarse</div>
        <div class="register-subtitle mb-3">Ingresa tus datos para registrarte</div>
        <!-- Formulario -->
        <form action="..\data\register.php" method="post">
            <input type="text" name="nombre_usuario" class="form-control" placeholder="Nombre" required>
            <input type="email" name="email" class="form-control" placeholder="Correo electrónico" required>
            <input type="tel" name="telefono" class="form-control" placeholder="Número de teléfono" required>
            <input type="password" name="contrasena" class="form-control" placeholder="Contraseña" required>
            <input type="password" class="form-control" placeholder="Confirmar contraseña" required>
            <div class="form-check text-start mb-3">
                <input class="form-check-input" type="checkbox" id="terms" required>
                <label class="form-check-label" for="terms">
                    Acepto los <a href="#">términos y condiciones</a>
                </label>
            </div>
            <button type="submit" class="register-btn">Siguiente</button>
        </form>
        <div class="extra-links mt-3">
            ¿Necesitas ayuda? Visita nuestro
            <a href="#" class="help-link">centro de ayuda</a>
        </div>
    </div>
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
