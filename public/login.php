<?php
Require ("../config/config.php");
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar sesión</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./css/login.css">
</head>
<body>
    <div class="login-container">
        <!-- Logo -->
        <img src="./img/Logo.png" alt="Logo" class="login-logo img-fluid mx-auto d-block">
        <!-- Título -->
        <div class="login-title mb-2">Iniciar sesión</div>
        <div class="login-subtitle mb-3">Ingresa tu usuario y contraseña para acceder</div>
        <!-- Formulario -->
        <form action="..\data\log.php" method="post">
            <div class="input-group">
                <span class="input-group-text">
                    <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M16 16c0-2.2-2.7-4-6-4s-6 1.8-6 4"/></svg>
                </span>
                <input type="text" class="form-control" placeholder="Usuario" required aria-label="Usuario">
            </div>
            <div class="input-group mb-1">
                <span class="input-group-text">
                    <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </span>
                <input type="password" class="form-control" placeholder="Contraseña" required aria-label="Contraseña">
            </div>
            <a href="#" class="forgot-link">¿Olvidaste tu contraseña?</a>
            <button type="submit" class="login-btn">Entrar</button>
        </form>
        <div class="divider">O ingresa con</div>
        <!-- Solo Google -->
        <button class="google-btn mb-2" type="button">
            <svg width="22" height="22" viewBox="0 0 48 48">
                <g>
                    <path fill="#4285F4" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.3-5.7 7-11.3 7-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 3l6.1-6.1C34.5 5.5 29.6 3.5 24 3.5 12.7 3.5 3.5 12.7 3.5 24S12.7 44.5 24 44.5c11 0 20.5-8.5 20.5-20.5 0-1.4-.1-2.7-.3-4z"/>
                    <path fill="#34A853" d="M6.3 14.1l6.6 4.8C14.5 16.1 18.9 13.5 24 13.5c3.1 0 5.9 1.1 8.1 3l6.1-6.1C34.5 5.5 29.6 3.5 24 3.5c-7.2 0-13.4 4.1-16.7 10.6z"/>
                    <path fill="#FBBC05" d="M24 44.5c5.6 0 10.5-1.9 14.3-5.1l-6.6-5.4c-2 1.4-4.5 2.2-7.7 2.2-5.6 0-10.3-3.8-12-8.9l-6.5 5c3.3 6.5 10.5 11.2 18.5 11.2z"/>
                    <path fill="#EA4335" d="M43.6 20.5h-1.9V20H24v8h11.3c-0.7 2-2.1 3.7-4.1 4.9l6.6 5.4c3.8-3.5 6.2-8.7 6.2-14.8 0-1.4-.1-2.7-.3-4z"/>
                </g>
            </svg>
            Iniciar sesión con Google
        </button>
        <div class="extra-links mb-2">
            ¿No tienes una cuenta?
            <a href="#" class="register-link">Regístrate</a>
        </div>
        <div class="extra-links">
            ¿Necesitas ayuda? Visita nuestro
            <a href="#" class="help-link">centro de ayuda</a>
        </div>
    </div>
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>