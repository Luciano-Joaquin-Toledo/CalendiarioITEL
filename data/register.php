<?php
require("../config/config.php");

$nombre_usuario = $_POST['nombre_usuario'];
$contrasena = password_hash($_POST['contrasena'], PASSWORD_DEFAULT);
$telefono = $_POST['telefono'];
$email = $_POST['email'];
$imagen = empty($_POST['imagen']) ? null : $_POST['imagen'];
$fecha_ingreso = date('Y-m-d');

$stmt = $conexion->prepare("INSERT INTO Usuario 
    (Nombre_usuario, Contraseña, Numero_telefono, Email, Imagen, Fecha_ingreso) 
    VALUES (?, ?, ?, ?, ?, ?)");

$stmt->bind_param("ssisss", $nombre_usuario, $contrasena, $telefono, $email, $imagen, $fecha_ingreso);

$stmt->execute();

$stmt->close();
$conexion->close();
?>