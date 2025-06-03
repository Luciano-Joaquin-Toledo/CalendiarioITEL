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

            // Puedes agregar aquí lógica para eventos, tareas, etc.
            // if (tieneEvento(dia, mes, anio)) cell.classList.add('event');

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

    // --- Notas por día ---
    // Estructura simple en memoria: { 'YYYY-MM-DD': [ {titulo, contenido} ] }
    const notasPorDia = {};

    // Referencias para el panel de notas y modal de nota
    let panelNotas = null;
    let notaModal = null;
    let notaModalOverlay = null;
    let notaModalTitle = null;
    let notaModalBody = null;

    // Crear panel de notas si no existe
    function crearPanelNotas() {
        if (document.getElementById('panelNotasDia')) return;
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
        document.getElementById('cerrarPanelNotasDia').onclick = function() {
            panelNotas.style.display = 'none';
        };
        // Agregar nota
        document.getElementById('agregarNotaDiaBtn').onclick = function() {
            mostrarFormularioNota();
        };
    }

    // Crear modal de nota si no existe
    function crearNotaModal() {
        if (document.getElementById('notaDiaModal')) return;
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
                <div id="notaDiaModalBody"></div>
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
        notaModal.style.display = 'none';
        notaModalOverlay.style.display = 'none';
    }

    // Mostrar modal con el contenido de la nota
    function mostrarNotaModal(titulo, contenido) {
        crearNotaModal();
        notaModalTitle.textContent = titulo;
        notaModalBody.textContent = contenido;
        notaModal.style.display = 'block';
        notaModalOverlay.style.display = 'block';
    }

    // Mostrar formulario para agregar nota
    function mostrarFormularioNota(fechaStr) {
        const fecha = document.getElementById('panelNotasDiaFecha').textContent;
        const form = document.createElement('form');
        form.className = 'form-agregar-nota-dia';
        form.innerHTML = `
            <input type="text" class="input-nota-titulo" placeholder="Título..." required style="margin-bottom:8px;">
            <textarea class="input-nota-contenido" placeholder="Contenido..." required style="margin-bottom:8px;"></textarea>
            <div style="display:flex;gap:8px;">
                <button type="submit" class="btn-guardar-nota-dia">Guardar</button>
                <button type="button" class="btn-cancelar-nota-dia">Cancelar</button>
            </div>
        `;
        const lista = document.getElementById('panelNotasDiaLista');
        lista.insertBefore(form, lista.firstChild);

        form.querySelector('.btn-cancelar-nota-dia').onclick = function() {
            form.remove();
        };
        form.onsubmit = function(e) {
            e.preventDefault();
            const titulo = form.querySelector('.input-nota-titulo').value.trim() || 'Sin título';
            const contenido = form.querySelector('.input-nota-contenido').value.trim() || 'Sin contenido';
            const fechaKey = panelNotas.dataset.fecha;
            if (!notasPorDia[fechaKey]) notasPorDia[fechaKey] = [];
            notasPorDia[fechaKey].push({ titulo, contenido });
            form.remove();
            renderNotasDia(fechaKey);
        };
    }

    // Renderizar las notas del día seleccionado
    function renderNotasDia(fechaKey) {
        crearPanelNotas();
        panelNotas.style.display = 'block';
        panelNotas.dataset.fecha = fechaKey;
        document.getElementById('panelNotasDiaFecha').textContent = fechaKey;
        const lista = document.getElementById('panelNotasDiaLista');
        lista.innerHTML = '';
        const notas = notasPorDia[fechaKey] || [];
        if (notas.length === 0) {
            const vacio = document.createElement('div');
            vacio.className = 'nota-dia-vacia';
            vacio.textContent = 'No hay notas para este día.';
            lista.appendChild(vacio);
        } else {
            notas.forEach((nota, idx) => {
                const div = document.createElement('div');
                div.className = 'nota-dia-item';
                div.textContent = nota.titulo;
                div.onclick = function() {
                    mostrarNotaModal(nota.titulo, nota.contenido);
                };
                lista.appendChild(div);
            });
        }
    }

    // Al tocar un día del calendario
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('cal-cell') && !e.target.classList.contains('empty')) {
            // Obtener fecha seleccionada
            const dia = parseInt(e.target.textContent, 10);
            const mes = mesActual + 1;
            const anio = anioActual;
            const fechaKey = `${anio}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
            renderNotasDia(fechaKey);
        }
    });

    renderCalendario(mesActual, anioActual);
});
