<?PHP
<?php
require("../config/config.php");

function loginUsuario($conexion, $nombre_usuario, $contrasena_plana) {
    // Validar campos vacíos
    if (empty($nombre_usuario) || empty($contrasena_plana)) {
        return "Todos los campos son obligatorios";
    }

    // Buscar usuario en la base de datos
    $stmt = $conexion->prepare("SELECT ID_usuario, Nombre_usuario, Contraseña FROM Usuario WHERE Nombre_usuario = ?");
    $stmt->bind_param("s", $nombre_usuario);
    $stmt->execute();
    
    $resultado = $stmt->get_result();
    
    if ($resultado->num_rows === 0) {
        return "Usuario no encontrado";
    }

    $usuario = $resultado->fetch_assoc();

    // Verificar contraseña hasheada
    if (password_verify($contrasena_plana, $usuario['Contraseña'])) {
        // Iniciar sesión
        session_start();
        $_SESSION['user_id'] = $usuario['ID_usuario'];
        $_SESSION['nombre_usuario'] = $usuario['Nombre_usuario'];
        return true;
    } else {
        return "Contraseña incorrecta";
    }
}

// Ejemplo de uso cuando se envía el formulario
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $resultado = loginUsuario($conexion, $_POST['nombre_usuario'], $_POST['contrasena']);
    
    if ($resultado === true) {
        header("Location: dashboard.php");
        exit();
    } else {
        $error_login = $resultado;
    }
}
?>
?>