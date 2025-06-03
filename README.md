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
├── api/                            # Backend PHP expuesto como endpoints
│   ├── auth/                       # Autenticación (Google, sesiones)
│   ├── tasks/                      # Endpoints de tareas (GET, POST, PUT, DELETE)
│   ├── notes/                      # Endpoints de notas
│   ├── calendar/                   # Endpoints de calendario/eventos
│   ├── utils/                      # Funciones auxiliares PHP
│   └── db.php                      # Conexión a base de datos SQL (modo producción)
│
├── data/                           # JSONs simulando datos (modo desarrollo)
│   ├── tasks.json
│   ├── notes.json
│   ├── calendar.json
│   └── users.json
│
├── public/                         # Carpeta servida públicamente
│   ├── index.html                  # Página principal (dashboard o redirección)
│   ├── login.html                  # Página de login
│   ├── panel.html                  # Panel de usuario
│   ├── estadisticas.html          # Vista de estadísticas
│   ├── perfil.html                # Perfil del usuario
│
│   ├── css/                        # Estilos por componente/página
│   │   ├── base.css                # Estilos globales, variables, resets
│   │   ├── layout.css              # Grid, flexbox, layout general
│   │   ├── animations.css          # Animaciones generales
│   │   ├── login.css               # Estilos para login y registro
│   │   ├── panel.css               # Estilos para la vista del panel
│   │   ├── estadisticas.css        # Estilos para estadísticas
│   │   ├── perfil.css              # Estilos para el perfil de usuario
│   │   ├── tasks.css               # Estilos para tareas
│   │   ├── notes.css               # Estilos para notas
│   │   └── calendar.css            # Estilos para calendario
│
│   ├── js/                         # Lógica del frontend modular
│   │   ├── app.js                  # Inicializador general / lógica común
│   │   ├── auth.js                 # Manejo de Google Auth
│   │   ├── ui/                     # Componentes de UI (modales, animaciones)
│   │   │   ├── navbar.js
│   │   │   └── modal.js
│   │   ├── api/                    # Requests a `/api`
│   │   │   ├── tasksApi.js
│   │   │   ├── notesApi.js
│   │   │   └── calendarApi.js
│   │   ├── pages/                  # JS específicos por vista/página
│   │   │   ├── login.js
│   │   │   ├── panel.js
│   │   │   ├── estadisticas.js
│   │   │   ├── perfil.js
│   │   │   └── principal.js
│
│   └── assets/                     # Imágenes, íconos, fuentes
│       ├── img/
│       ├── icons/
│       └── fonts/
│
├── config/                         # Configuración general del proyecto
│   ├── config.php                  # Constantes globales (paths, flags, etc.)
│   └── .env                        # Variables de entorno (Google API Key, DB)
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
