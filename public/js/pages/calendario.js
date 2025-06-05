// --- Menú lateral y FAB menú igual que en panel.js ---

document.addEventListener('DOMContentLoaded', function() {
    // Menú lateral
    const openMenu = document.getElementById('open-menu');
    const sideMenu = document.getElementById('sideMenu');
    const overlay = document.getElementById('sideMenuOverlay');
    const closeBtn = document.getElementById('sideMenuClose');

    if (openMenu) {
        openMenu.addEventListener('click', function() {
            sideMenu.classList.add('active');
            overlay.classList.add('active');
        });
    }
    if (overlay) {
        overlay.addEventListener('click', function() {
            sideMenu.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            sideMenu.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // FAB menú flotante
    const fabBtn = document.getElementById('open-fab-menu');
    const fabMenu = document.getElementById('fabMenu');
    const fabOverlay = document.getElementById('fabMenuOverlay');
    const fabBtnIcon = fabBtn ? fabBtn.querySelector('i') : null;

    if (fabBtn) {
        fabBtn.addEventListener('click', function(e) {
            e.preventDefault();
            fabMenu.classList.add('active');
            fabOverlay.classList.add('active');
            if (fabBtnIcon) {
                fabBtnIcon.classList.remove('fa-plus');
                fabBtnIcon.classList.add('fa-times');
            }
        });
    }

    function closeFabMenu() {
        fabMenu.classList.remove('active');
        fabOverlay.classList.remove('active');
        if (fabBtnIcon) {
            fabBtnIcon.classList.remove('fa-times');
            fabBtnIcon.classList.add('fa-plus');
        }
    }

    if (fabOverlay) fabOverlay.addEventListener('click', closeFabMenu);

    // --- Calendario ---
    const calMes = document.getElementById('calMes');
    const calBody = document.getElementById('calBody');
    const prevMonthBtn = document.getElementById('prevMonthBtn');
    const nextMonthBtn = document.getElementById('nextMonthBtn');

    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    let fechaActual = new Date();
    let mesActual = fechaActual.getMonth();
    let anioActual = fechaActual.getFullYear();

    // --- Notas por día ---
    // Estructura simple en memoria: { 'YYYY-MM-DD': [ {titulo, contenido} ] }
    let notasPorDia = {};

    // Cargar notas desde localStorage
    function cargarNotas() {
        const data = localStorage.getItem('notasPorDia');
        if (data) {
            try {
                notasPorDia = JSON.parse(data);
            } catch (e) {
                notasPorDia = {};
            }
        }
    }
    // Guardar notas en localStorage
    function guardarNotas() {
        localStorage.setItem('notasPorDia', JSON.stringify(notasPorDia));
    }

    cargarNotas();

    // Referencias para el panel de notas y modal de nota
    let panelNotas = null;
    let panelNotasOverlay = null;
    let notaModal = null;
    let notaModalOverlay = null;
    let notaModalTitle = null;
    let notaModalBody = null;

    // Crear overlay para el panel de notas (ahora visible y animado)
    function crearPanelNotasOverlay() {
        if (document.getElementById('panelNotasDiaOverlay')) return;
        panelNotasOverlay = document.createElement('div');
        panelNotasOverlay.className = 'panel-notas-dia-overlay';
        panelNotasOverlay.id = 'panelNotasDiaOverlay';
        document.body.appendChild(panelNotasOverlay);
        panelNotasOverlay.onclick = function() {
            cerrarPanelNotas();
        };
    }

    // Crear panel de notas si no existe
    function crearPanelNotas() {
        if (document.getElementById('panelNotasDia')) return;
        crearPanelNotasOverlay();
        panelNotas = document.createElement('div');
        panelNotas.id = 'panelNotasDia';
        panelNotas.className = 'panel-notas-dia';
        panelNotas.innerHTML = `
            <div class="panel-notas-dia-header">
                <span id="panelNotasDiaFecha"></span>
                <button class="panel-notas-dia-cerrar" id="cerrarPanelNotasDia">&times;</button>
            </div>
            <div class="panel-notas-dia-lista" id="panelNotasDiaLista"></div>
            <button class="panel-notas-dia-agregar" id="agregarNotaDiaBtn">+ Añadir nota</button>
        `;
        document.body.appendChild(panelNotas);

        // Cerrar panel
        document.getElementById('cerrarPanelNotasDia').onclick = cerrarPanelNotas;
        // Agregar nota
        document.getElementById('agregarNotaDiaBtn').onclick = function() {
            mostrarFormularioNotaModal();
        };
    }

    // Cierra el panel de notas si está abierto
    function cerrarPanelNotas() {
        if (panelNotas) panelNotas.style.display = 'none';
        if (panelNotasOverlay) panelNotasOverlay.classList.remove('active');
        // Limpia posición para evitar residuos al cambiar de día
        if (panelNotas) {
            panelNotas.style.position = '';
            panelNotas.style.left = '';
            panelNotas.style.top = '';
            panelNotas.style.transform = '';
        }
    }

    // Crear modal de nota si no existe
    function crearNotaModal() {
        // Elimina cualquier modal previo para evitar duplicados y bugs visuales
        const prevModal = document.getElementById('notaDiaModal');
        const prevOverlay = document.getElementById('notaDiaModalOverlay');
        if (prevModal) prevModal.remove();
        if (prevOverlay) prevOverlay.remove();

        notaModalOverlay = document.createElement('div');
        notaModalOverlay.className = 'nota-dia-modal-overlay';
        notaModalOverlay.id = 'notaDiaModalOverlay';
        notaModal = document.createElement('div');
        notaModal.className = 'nota-dia-modal';
        notaModal.id = 'notaDiaModal';
        notaModal.innerHTML = `
            <div class="nota-dia-modal-content">
                <button class="nota-dia-modal-close" id="notaDiaModalClose" aria-label="Cerrar">&times;</button>
                <h3 id="notaDiaModalTitle"></h3>
                <div id="notaDiaModalBody" class="nota-dia-modal-body"></div>
            </div>
        `;
        document.body.appendChild(notaModalOverlay);
        document.body.appendChild(notaModal);

        notaModalOverlay.onclick = cerrarNotaModal;
        document.getElementById('notaDiaModalClose').onclick = cerrarNotaModal;
        notaModalTitle = document.getElementById('notaDiaModalTitle');
        notaModalBody = document.getElementById('notaDiaModalBody');
    }

    function cerrarNotaModal() {
        if (notaModal) notaModal.style.display = 'none';
        if (notaModalOverlay) notaModalOverlay.style.display = 'none';
    }

    // Mostrar modal con el contenido de la nota
    function mostrarNotaModal(titulo, contenido) {
        crearNotaModal();
        notaModalTitle.textContent = titulo;
        notaModalBody.textContent = contenido;
        notaModal.style.display = 'block';
        notaModalOverlay.style.display = 'block';
    }

    // Modal para formulario de nota
    let formNotaModal = null;
    let formNotaModalOverlay = null;

    function crearFormNotaModal() {
        // Elimina cualquier modal previo para evitar duplicados y bugs visuales
        const prevModal = document.getElementById('formNotaModal');
        const prevOverlay = document.getElementById('formNotaModalOverlay');
        if (prevModal) prevModal.remove();
        if (prevOverlay) prevOverlay.remove();

        formNotaModalOverlay = document.createElement('div');
        formNotaModalOverlay.className = 'form-nota-modal-overlay';
        formNotaModalOverlay.id = 'formNotaModalOverlay';
        formNotaModal = document.createElement('div');
        formNotaModal.className = 'form-nota-modal';
        formNotaModal.id = 'formNotaModal';
        formNotaModal.innerHTML = `
            <div class="form-nota-modal-content">
                <button class="form-nota-modal-close" id="formNotaModalClose" aria-label="Cerrar">&times;</button>
                <h3 id="formNotaModalTitle"></h3>
                <form id="formNotaForm">
                    <input type="text" class="input-nota-titulo" placeholder="Título..." required>
                    <textarea class="input-nota-contenido" placeholder="Contenido..." required></textarea>
                    <div style="display:flex;gap:8px;margin-top:12px;">
                        <button type="submit" class="btn-guardar-nota-dia"></button>
                        <button type="button" class="btn-cancelar-nota-dia">Cancelar</button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(formNotaModalOverlay);
        document.body.appendChild(formNotaModal);

        // --- Asegura que el modal tenga los estilos correctos al abrir ---
        formNotaModal.style.display = 'block';
        formNotaModalOverlay.style.display = 'block';
        formNotaModal.style.position = 'fixed';
        formNotaModal.style.top = '50%';
        formNotaModal.style.left = '50%';
        formNotaModal.style.transform = 'translate(-50%, -50%)';
        formNotaModal.style.zIndex = '510';

        formNotaModalOverlay.onclick = cerrarFormNotaModal;
        document.getElementById('formNotaModalClose').onclick = cerrarFormNotaModal;
        document.getElementById('formNotaForm').onsubmit = function(e) {
            e.preventDefault();
            // Se maneja dinámicamente en mostrarFormularioNotaModal
        };
        document.querySelector('.btn-cancelar-nota-dia').onclick = cerrarFormNotaModal;
    }

    // Minimizar/restaurar panel de notas del día
    function minimizarPanelNotas() {
        if (panelNotas) panelNotas.classList.add('minimized');
        if (panelNotasOverlay) panelNotasOverlay.classList.add('blurred');
    }
    function restaurarPanelNotas() {
        if (panelNotas) panelNotas.classList.remove('minimized');
        if (panelNotasOverlay) panelNotasOverlay.classList.remove('blurred');
    }

    function cerrarFormNotaModal() {
        if (formNotaModal) formNotaModal.style.display = 'none';
        if (formNotaModalOverlay) formNotaModalOverlay.style.display = 'none';
        restaurarPanelNotas();
        // Si no hay notas para el día actual, también cierra el panel de notas del día (si existe)
        const fechaKey = panelNotas ? panelNotas.dataset.fecha : null;
        if (fechaKey && (!notasPorDia[fechaKey] || notasPorDia[fechaKey].length === 0)) {
            cerrarPanelNotas();
        }
    }

    // Mostrar formulario para agregar o editar nota en modal
    function mostrarFormularioNotaModal(idxEditar = null) {
        crearFormNotaModal();
        // NO minimizar el panel de notas del día, así puedes seguir viendo y abriendo notas
        // minimizarPanelNotas(); // <-- Elimina o comenta esta línea
        const form = document.getElementById('formNotaForm');
        const tituloInput = form.querySelector('.input-nota-titulo');
        const contenidoInput = form.querySelector('.input-nota-contenido');
        const btnGuardar = form.querySelector('.btn-guardar-nota-dia');
        const btnCancelar = form.querySelector('.btn-cancelar-nota-dia');
        const modalTitle = document.getElementById('formNotaModalTitle');
        const fechaKey = (panelNotas && panelNotas.dataset.fecha) ? panelNotas.dataset.fecha : diaSeleccionado;

        if (idxEditar !== null) {
            tituloInput.value = notasPorDia[fechaKey][idxEditar].titulo;
            contenidoInput.value = notasPorDia[fechaKey][idxEditar].contenido;
            btnGuardar.textContent = 'Guardar';
            modalTitle.textContent = 'Editar nota';
        } else {
            tituloInput.value = '';
            contenidoInput.value = '';
            btnGuardar.textContent = 'Guardar';
            modalTitle.textContent = 'Nueva nota';
        }
        contenidoInput.placeholder = "Escribe aquí el contenido de tu nota...";

        form.onsubmit = function(e) {
            e.preventDefault();
            const titulo = tituloInput.value.trim() || 'Sin título';
            const contenido = contenidoInput.value.trim() || 'Sin contenido';
            if (!notasPorDia[fechaKey]) notasPorDia[fechaKey] = [];
            if (idxEditar !== null) {
                notasPorDia[fechaKey][idxEditar] = { titulo, contenido };
            } else {
                notasPorDia[fechaKey].push({ titulo, contenido });
            }
            guardarNotas();
            cerrarFormNotaModal();
            renderCalendario(mesActual, anioActual);
            // Si después de guardar hay notas, muestra el panel de notas del día
            if (notasPorDia[fechaKey] && notasPorDia[fechaKey].length > 0) {
                renderNotasDia(fechaKey);
            }
        };

        formNotaModal.style.display = 'block';
        formNotaModalOverlay.style.display = 'block';
        // No enfocar automáticamente el input
    }

    // Renderizar las notas del día seleccionado
    function renderNotasDia(fechaKey, triggerEvent) {
        // Si no hay notas, solo mostrar el modal de crear nota y salir
        const notas = notasPorDia[fechaKey] || [];
        if (notas.length === 0) {
            cerrarPanelNotas();
            mostrarFormularioNotaModal();
            return;
        }
        // Si hay notas, mostrar el panel de notas del día
        cerrarPanelNotas();
        crearPanelNotas();
        panelNotas.style.display = 'block';
        if (panelNotasOverlay) {
            panelNotasOverlay.classList.add('active');
            panelNotasOverlay.style.display = 'block';
        }
        panelNotas.dataset.fecha = fechaKey;
        document.getElementById('panelNotasDiaFecha').textContent = fechaKey;
        const lista = document.getElementById('panelNotasDiaLista');
        lista.innerHTML = '';
        notas.forEach((nota, idx) => {
            const div = document.createElement('div');
            div.className = 'nota-dia-item';
            div.textContent = nota.titulo;
            // Botones de editar y eliminar con iconos Font Awesome
            const btns = document.createElement('span');
            btns.style.float = 'right';
            btns.innerHTML = `
                <button class="btn-editar-nota" title="Editar" style="margin-left:8px;">
                    <i class="fa fa-pen"></i>
                </button>
                <button class="btn-eliminar-nota" title="Eliminar" style="margin-left:4px;">
                    <i class="fa fa-trash"></i>
                </button>
            `;
            btns.querySelector('.btn-editar-nota').onclick = (e) => {
                e.stopPropagation();
                mostrarFormularioNotaModal(idx);
            };
            btns.querySelector('.btn-eliminar-nota').onclick = (e) => {
                e.stopPropagation();
                if (confirm('¿Eliminar esta nota?')) {
                    notasPorDia[fechaKey].splice(idx, 1);
                    if (notasPorDia[fechaKey].length === 0) delete notasPorDia[fechaKey];
                    guardarNotas();
                    renderNotasDia(fechaKey);
                    renderCalendario(mesActual, anioActual);
                }
            };
            div.appendChild(btns);
            div.onclick = function(e) {
                // Solo muestra el contenido si NO se hizo click en un botón
                if (e.target.tagName === 'BUTTON' || e.target.tagName === 'I') return;
                mostrarNotaModal(nota.titulo, nota.contenido);
            };
            lista.appendChild(div);
        });
        // Botón para agregar nota solo visible si hay notas
        const btnAgregar = document.getElementById('agregarNotaDiaBtn');
        if (btnAgregar) {
            btnAgregar.style.display = '';
            btnAgregar.onclick = function() {
                mostrarFormularioNotaModal();
            };
        }

        // Centrar el modal respecto al día seleccionado (solo escritorio)
        if (triggerEvent && window.innerWidth > 600) {
            const cell = triggerEvent.target;
            const rect = cell.getBoundingClientRect();
            const modal = panelNotas;
            const modalWidth = modal.offsetWidth || 380;
            const modalHeight = modal.offsetHeight || 320;
            let left = rect.left + rect.width / 2 - modalWidth / 2;
            let top = rect.top + rect.height / 2 - modalHeight / 2;
            left = Math.max(16, Math.min(left, window.innerWidth - modalWidth - 16));
            top = Math.max(16, Math.min(top, window.innerHeight - modalHeight - 16));
            modal.style.position = 'fixed';
            modal.style.left = left + 'px';
            modal.style.top = top + 'px';
            modal.style.transform = 'none';
        } else if (panelNotas) {
            panelNotas.style.position = '';
            panelNotas.style.left = '';
            panelNotas.style.top = '';
            panelNotas.style.transform = '';
        }
    }

    // Día seleccionado
    let diaSeleccionado = null;

    // Al tocar un día del calendario
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('cal-cell') && !e.target.classList.contains('empty')) {
            const dia = parseInt(e.target.textContent, 10);
            const mes = mesActual + 1;
            const anio = anioActual;
            const fechaKey = `${anio}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
            diaSeleccionado = fechaKey;
            renderNotasDia(fechaKey, e);
            renderCalendario(mesActual, anioActual);
            if (panelNotasOverlay) {
                panelNotasOverlay.classList.add('active');
                panelNotasOverlay.style.display = 'block';
            }
        }
    });

    // Cambiar de mes y año
    function cambiarMes(delta) {
        mesActual += delta;
        if (mesActual < 0) {
            mesActual = 11;
            anioActual--;
        } else if (mesActual > 11) {
            mesActual = 0;
            anioActual++;
        }
        renderCalendario(mesActual, anioActual);
    }

    if (prevMonthBtn) prevMonthBtn.addEventListener('click', function() {
        cambiarMes(-1);
    });
    if (nextMonthBtn) nextMonthBtn.addEventListener('click', function() {
        cambiarMes(1);
    });

    // Modificar renderCalendario para marcar días con notas y resaltar seleccionado
    function renderCalendario(mes, anio) {
        calMes.textContent = `${meses[mes]} ${anio}`;
        calBody.innerHTML = "";

        const primerDia = new Date(anio, mes, 1);
        const primerDiaSemana = (primerDia.getDay() + 6) % 7; // Lunes=0, Domingo=6
        const diasEnMes = new Date(anio, mes + 1, 0).getDate();

        let row = document.createElement('div');
        row.className = 'cal-row';

        // Celdas vacías antes del primer día
        for (let i = 0; i < primerDiaSemana; i++) {
            let cell = document.createElement('div');
            cell.className = 'cal-cell empty';
            row.appendChild(cell);
        }

        for (let dia = 1; dia <= diasEnMes; dia++) {
            if ((primerDiaSemana + dia - 1) % 7 === 0 && dia !== 1) {
                calBody.appendChild(row);
                row = document.createElement('div');
                row.className = 'cal-row';
            }
            let cell = document.createElement('div');
            cell.className = 'cal-cell';
            cell.textContent = dia;

            // Hoy
            const hoy = new Date();
            if (
                dia === hoy.getDate() &&
                mes === hoy.getMonth() &&
                anio === hoy.getFullYear()
            ) {
                cell.classList.add('today');
            }

            // Marcar días con notas
            const fechaKey = `${anio}-${(mes+1).toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
            if (notasPorDia[fechaKey] && notasPorDia[fechaKey].length > 0) {
                cell.classList.add('has-notes');
            }

            // Resaltar día seleccionado
            if (diaSeleccionado === fechaKey) {
                cell.classList.add('selected');
            }

            row.appendChild(cell);
        }

        // Celdas vacías al final
        while (row.children.length < 7) {
            let cell = document.createElement('div');
            cell.className = 'cal-cell empty';
            row.appendChild(cell);
        }
        calBody.appendChild(row);
    }

    renderCalendario(mesActual, anioActual);
});
