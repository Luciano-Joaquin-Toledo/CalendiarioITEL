# 📅 Calendiario – Gestión Personal de Tareas, Notas y Calendario

> Aplicación web en desarrollo para la organización personal diaria, que permite gestionar tareas, notas y visualizar eventos en un calendario.

<p align="center">
  <img src="https://img.shields.io/badge/Estado-En%20Desarrollo-yellow" alt="Estado" />
  <img src="https://img.shields.io/badge/PHP-%3E=7.4-blue" alt="PHP" />
  <img src="https://img.shields.io/badge/Bootstrap-5-purple" alt="Bootstrap 5" />
  <img src="https://img.shields.io/badge/JavaScript-vanilla-yellowgreen" alt="JavaScript" />
</p>

---

## 🚀 Características principales

- 🗓️ Gestión completa de tareas diarias con fechas y prioridades  
- 📝 Notas rápidas para organización personal  
- 📅 Vista calendario para visualización intuitiva de eventos  
- 🔄 Sincronización y actualización dinámica en tiempo real  
- 📱 Diseño responsive adaptado a móviles y tablets  
- 🔐 Autenticación segura para múltiples usuarios  

---

## 🛠️ Tecnologías utilizadas

| **Categoría**    | **Tecnología**           |
| ---------------- | ------------------------ |
| 🖥️ Backend       | PHP (sin frameworks)     |
| 🗄️ Base de datos  | MySQL / MariaDB          |
| 🌐 Frontend      | HTML5, CSS3, Bootstrap 5 |
| ⚙️ Interactividad | JavaScript (vanilla)     |

---

## 📁 Estructura del Proyecto

```bash
calendiario/
├── api/                            # Backend PHP (modo producción)
│   └── db.php                      # Conexión a base de datos
│
├── config/                         # Configuración general
│   └── config.php                  # Constantes globales
│
├── data/                           # Datos simulados en modo desarrollo (JSON)
│   ├── calendar.json
│   ├── notes.json
│   ├── tasks.json
│   └── users.json
│
├── public/                         # Archivos servidos públicamente
│   ├── login.html                  # Inicio de sesión
│   ├── registro.html               # Registro de usuario
│   ├── panel.html                  # Panel de control principal
│   ├── tareas.html                 # Gestión de tareas
│   ├── calendario.html             # Gestión de eventos/calendario
│   ├── estadisticas.html          # Análisis y estadísticas
│   ├── perfil.html                # Perfil del usuario
│   ├── materias.html              # Gestión de materias
│
│   ├── css/                        # Estilos CSS por página
│   │   ├── login.css               # Estilos para login y registro
│   │   ├── registro.css            
│   │   ├── panel.css               # Estilos para la vista del panel
│   │   ├── tareas.css              # Estilos para tareas
│   │   ├── calendario.css          # Estilos para calendario
│   │   ├── estadisticas.css        # Estilos para estadísticas
│   │   ├── perfil.css              # Estilos para el perfil de usuario
│   │   └── materias.css
│
│   ├── js/                         # Lógica frontend modular
│   │   └── pages/                  # Scripts por vista
│   │       ├── login.js
│   │       ├── registro.js
│   │       ├── panel.js
│   │       ├── tareas.js
│   │       ├── calendario.js
│   │       ├── estadisticas.js
│   │       ├── perfil.js
│   │       └── materias.js
│
├── Documentation/                 # Documentación técnica
│   └── Integracion_Login_Google_Web.docx
│
├── .gitignore
├── README.md
└── LICENSE

```


## 🤝 Equipo

| Rol              | Miembros                                                                                                    |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| Programadores    | Luciano Joaquín **TOLEDO**, Tobías **SOTELO**, Demian Alejandro **GOMEZ SAUCEDO**, Agustín Nahuel **LUQUE** |
| Diseñadores      | Martina **QUIROZ**, Micaela Lujan **BOGADO MERELES**, Leylen Abril Alanis **ARGUELLO COLOMBRES**            |
| Project Managers | Valentín **SOVERON ISELLE**, Santiago Nicolas **LLAMOSAS**                                                  |

---

## 📄 Licencia

Este proyecto está bajo la **[Licencia MIT](LICENSE)**.  
Uso libre con atribución para proyectos personales y comerciales.
