// --- Menú lateral igual que en panel.js ---
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

    // --- Lógica de tareas ---
    const tareasLista = document.querySelector('.tareas-lista');
    const agregarTareaBtn = document.getElementById('agregarTareaBtn');

    // Persistencia en localStorage
    function cargarTareas() {
        try {
            const data = localStorage.getItem('tareas');
            if (data) return JSON.parse(data);
        } catch {}
        // Si no hay, ejemplo inicial realista y variado
        return [
            {
                nombre: 'Presentar informe de Biología',
                descripcion: 'Entregar el informe sobre células eucariotas en clase.',
                fecha: '2024-06-17',
                hora: '10:00',
                ubicacion: 'Aula 203',
                color: '#9cc2f4',
                completada: false,
                subtareas: [
                    { nombre: 'Imprimir informe', completada: false },
                    { nombre: 'Revisar conclusiones', completada: true }
                ]
            },
            {
                nombre: 'Examen de Inglés',
                descripcion: 'Estudiar los temas de la unidad 4 y 5.',
                fecha: '2024-06-18',
                hora: '08:30',
                ubicacion: 'Aula 101',
                color: '#ffcb2d',
                completada: false,
                subtareas: [
                    { nombre: 'Repasar vocabulario', completada: false },
                    { nombre: 'Practicar listening', completada: false }
                ]
            },
            {
                nombre: 'Ir al dentista',
                descripcion: 'Control anual de ortodoncia.',
                fecha: '2024-06-19',
                hora: '15:00',
                ubicacion: 'Consultorio Dr. Pérez',
                color: '#7e9453',
                completada: false,
                subtareas: [
                    { nombre: 'Llevar carnet de obra social', completada: true }
                ]
            },
            {
                nombre: 'Cumpleaños de Ana',
                descripcion: 'Comprar regalo y asistir a la fiesta.',
                fecha: '2024-06-20',
                hora: '21:00',
                ubicacion: 'Salón Los Robles',
                color: '#ec4fe4',
                completada: false,
                subtareas: [
                    { nombre: 'Comprar regalo', completada: false },
                    { nombre: 'Confirmar asistencia', completada: true }
                ]
            },
            {
                nombre: 'Práctica de laboratorio',
                descripcion: 'Llevar bata y guantes para la práctica de química.',
                fecha: '2024-06-21',
                hora: '14:00',
                ubicacion: 'Laboratorio',
                color: '#51b7dd',
                completada: false,
                subtareas: [
                    { nombre: 'Preparar materiales', completada: false }
                ]
            },
            {
                nombre: 'Pasear al perro',
                descripcion: 'Sacar a pasear a Rocky por el parque.',
                fecha: '2024-06-22',
                hora: '18:30',
                ubicacion: 'Parque Central',
                color: '#ab4f33',
                completada: false,
                subtareas: [
                    { nombre: 'Llevar bolsas', completada: false },
                    { nombre: 'Llevar correa', completada: true }
                ]
            }
        ];
    }
    function guardarTareas() {
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }
    let tareas = cargarTareas();

    // Referencias al modal de confirmación
    const modalEliminar = document.getElementById('modalEliminarTarea');
    const modalEliminarMsg = document.getElementById('modalEliminarTareaMsg');
    const modalEliminarCancelar = document.getElementById('modalEliminarCancelar');
    const modalEliminarAceptar = document.getElementById('modalEliminarAceptar');
    let tareaAEliminarIdx = null;

    function mostrarModalEliminar(nombre, idx) {
        modalEliminarMsg.textContent = `¿Desea eliminar "${nombre}" permanentemente?`;
        modalEliminar.style.display = 'flex';
        modalEliminar.classList.add('show');
        tareaAEliminarIdx = idx;
    }
    function cerrarModalEliminar() {
        modalEliminar.style.display = 'none';
        modalEliminar.classList.remove('show');
        tareaAEliminarIdx = null;
    }
    if (modalEliminarCancelar) {
        modalEliminarCancelar.onclick = cerrarModalEliminar;
    }
    if (modalEliminarAceptar) {
        modalEliminarAceptar.onclick = function() {
            if (tareaAEliminarIdx !== null) {
                tareas.splice(tareaAEliminarIdx, 1);
                guardarTareas();
                renderTareas();
                mostrarMensaje('Tarea eliminada', true);
            }
            cerrarModalEliminar();
        };
    }
    // Cerrar modal al hacer click fuera del contenido
    if (modalEliminar) {
        modalEliminar.onclick = function(e) {
            if (e.target === modalEliminar) cerrarModalEliminar();
        };
    }

    // Mensaje visual de feedback
    function mostrarMensaje(msg, exito) {
        let div = document.getElementById('mensajeTarea');
        if (!div) {
            div = document.createElement('div');
            div.id = 'mensajeTarea';
            document.body.appendChild(div);
        }
        div.textContent = msg;
        div.className = exito ? 'exito' : 'error';
        div.style.display = 'block';
        setTimeout(() => { div.style.display = 'none'; }, 1800);
    }

    // --- NUEVO: Búsqueda y orden ---
    // Campo de búsqueda y select de orden
    function crearBarraBusquedaYOrden() {
        if (document.getElementById('tareasBarraBusqueda')) return;
        const barra = document.createElement('div');
        barra.id = 'tareasBarraBusqueda';
        barra.style.display = 'flex';
        barra.style.gap = '10px';
        barra.style.margin = '0 0 12px 0';
        barra.style.alignItems = 'center';

        const input = document.createElement('input');
        input.type = 'search';
        input.placeholder = 'Buscar tarea...';
        input.id = 'tareasBuscarInput';
        input.style.flex = '1';
        input.style.padding = '7px 12px';
        input.style.borderRadius = '8px';
        input.style.border = '1.5px solid #b9a5e2';
        input.setAttribute('aria-label', 'Buscar tarea');

        const select = document.createElement('select');
        select.id = 'tareasOrdenSelect';
        select.style.padding = '7px 8px';
        select.style.borderRadius = '8px';
        select.style.border = '1.5px solid #b9a5e2';
        select.innerHTML = `
            <option value="fecha">Ordenar por fecha</option>
            <option value="nombre">Ordenar por nombre</option>
            <option value="estado">Ordenar por estado</option>
        `;

        barra.appendChild(input);
        barra.appendChild(select);
        tareasLista.parentNode.insertBefore(barra, tareasLista);

        input.addEventListener('input', renderTareas);
        select.addEventListener('change', renderTareas);
    }
    crearBarraBusquedaYOrden();

    function renderTareas() {
        // --- NUEVO: Filtrado y orden ---
        let filtro = '';
        let orden = 'fecha';
        const inputBuscar = document.getElementById('tareasBuscarInput');
        const selectOrden = document.getElementById('tareasOrdenSelect');
        if (inputBuscar) filtro = inputBuscar.value.trim().toLowerCase();
        if (selectOrden) orden = selectOrden.value;

        let tareasFiltradas = tareas.filter(t =>
            t.nombre.toLowerCase().includes(filtro)
        );

        // Ordenar
        if (orden === 'fecha') {
            tareasFiltradas.sort((a, b) => (a.fecha || '').localeCompare(b.fecha || ''));
        } else if (orden === 'nombre') {
            tareasFiltradas.sort((a, b) => a.nombre.localeCompare(b.nombre));
        } else if (orden === 'estado') {
            tareasFiltradas.sort((a, b) => Number(a.completada) - Number(b.completada));
        }

        // Loader si hay muchas tareas
        if (tareasFiltradas.length > 20) {
            tareasLista.innerHTML = '<div class="tareas-loader"><span class="spinner"></span></div>';
        } else {
            tareasLista.innerHTML = '';
        }

        // Renderizado por lotes para evitar bloqueos
        const batchSize = 15;
        let i = 0;
        function renderBatch() {
            const fragment = document.createDocumentFragment();
            for (let count = 0; i < tareasFiltradas.length && count < batchSize; i++, count++) {
                const tarea = tareasFiltradas[i];
                const idx = tareas.indexOf(tarea);

                const item = document.createElement('div');
                item.className = 'tarea-item' + (tarea.completada ? ' completada' : '');

                if (tarea.color && !tarea.completada) {
                    item.style.background = tarea.color;
                } else if (!tarea.completada) {
                    item.style.background = '#ededf6';
                }

                const check = document.createElement('div');
                check.className = 'tarea-check' + (tarea.completada ? ' checked' : '');
                check.setAttribute('aria-checked', tarea.completada ? 'true' : 'false');
                check.tabIndex = 0;
                check.title = tarea.completada ? 'Marcar como pendiente' : 'Marcar como completada';
                check.style.cursor = 'pointer';
                check.onclick = () => {
                    tarea.completada = !tarea.completada;
                    if (tarea.subtareas && tarea.subtareas.length > 0) {
                        tarea.subtareas.forEach(s => s.completada = tarea.completada);
                    }
                    guardarTareas();
                    renderTareas();
                    if (tarea.completada) mostrarMensaje('¡Tarea completada!', true);
                };
                check.onkeydown = (e) => {
                    if (e.key === 'Enter' || e.key === ' ') check.onclick();
                };

                const nombre = document.createElement('div');
                nombre.className = 'tarea-nombre' + (tarea.completada ? ' completada' : '');
                nombre.textContent = tarea.nombre;
                nombre.style.cursor = 'pointer';
                nombre.tabIndex = 0;
                nombre.setAttribute('role', 'button');
                nombre.setAttribute('aria-label', 'Ver detalle de ' + tarea.nombre);
                nombre.onclick = () => abrirDetalleTareaModal(idx);
                nombre.onkeydown = (e) => {
                    if (e.key === 'Enter' || e.key === ' ') nombre.onclick();
                };

                // Indicador de subtareas
                if (tarea.subtareas && tarea.subtareas.length > 0) {
                    const hechas = tarea.subtareas.filter(s => s.completada).length;
                    const total = tarea.subtareas.length;
                    const indicador = document.createElement('span');
                    indicador.className = 'subtareas-indicador';
                    indicador.textContent = `${hechas}/${total}`;
                    nombre.appendChild(indicador);
                }

                const eliminar = document.createElement('button');
                eliminar.className = 'tarea-eliminar';
                eliminar.innerHTML = '<i class="fa fa-trash"></i>';
                eliminar.onclick = () => {
                    mostrarModalEliminar(tarea.nombre, idx);
                };

                item.appendChild(check);
                item.appendChild(nombre);
                item.appendChild(eliminar);
                fragment.appendChild(item);
            }
            tareasLista.appendChild(fragment);

            if (i < tareasFiltradas.length) {
                requestAnimationFrame(renderBatch);
            }
        }
        renderBatch();
    }

    // --- Modal Nueva Tarea con subtareas ---
    const tareaModal = document.getElementById('tareaModal');
    const tareaModalClose = () => {
        tareaModal.style.display = 'none';
        tareaModal.classList.remove('show');
    };

    function abrirTareaModal() {
        // SIEMPRE reescribe el contenido del modal para que sea el de crear tarea
        tareaModal.innerHTML = `
            <div class="tarea-modal-content">
              <button
                class="tarea-modal-close"
                id="tareaModalClose"
                aria-label="Cerrar"
              >
                <i class="fa fa-times"></i>
              </button>
              <h2 class="tarea-modal-title">Crear Tarea</h2>
              <form class="tarea-form">
                <input
                  type="text"
                  class="tarea-input nombre-tarea"
                  placeholder="Nombre de tarea..."
                />
                <button type="button" class="tarea-btn tarea-btn-sub">
                  + Sub Tarea
                </button>
                <textarea
                  class="tarea-input tarea-desc"
                  placeholder="Descripción..."
                ></textarea>
                <div class="tarea-form-row">
                  <label>Fecha:</label>
                  <i class="fa-regular fa-calendar"></i>
                  <input type="date" class="tarea-input tarea-fecha" />
                </div>
                <div class="tarea-form-row">
                  <label>Hora:</label>
                  <i class="fa-regular fa-clock"></i>
                  <input type="time" class="tarea-input tarea-hora" />
                </div>
                <div class="tarea-form-row">
                  <label>Ubicación:</label>
                  <button type="button" class="tarea-btn tarea-btn-ubicacion">
                    ...
                  </button>
                </div>
                <div class="tarea-form-row">
                  <label>Tipo de Color:</label>
                  <select class="tarea-input tarea-color-type" id="tareaColorType">
                    <option value="">Seleccionar...</option>
                    <option value="frio">Frío</option>
                    <option value="calido">Cálido</option>
                  </select>
                </div>
                <div class="tarea-form-row">
                  <label>Color de la Tarea:</label>
                  <input
                    type="hidden"
                    id="tareaColorPicker"
                    name="tareaColor"
                    value="#cccccc"
                  />
                  <div
                    class="tarea-color-palette-popup"
                    id="tareaColorPalettePopup"
                    style="display: none"
                  >
                    <div class="tarea-palette-frio">
                      <div class="tarea-color-palette-row">
                        <button type="button" class="tarea-color-palette-btn" data-color="#c7d2f7" style="background: #c7d2f7"></button>
                        <button type="button" class="tarea-color-palette-btn" data-color="#9cc2f4" style="background: #9cc2f4"></button>
                        <button type="button" class="tarea-color-palette-btn" data-color="#86a8f0" style="background: #86a8f0"></button>
                        <button type="button" class="tarea-color-palette-btn" data-color="#a480f0" style="background: #a480f0"></button>
                        <button type="button" class="tarea-color-palette-btn" data-color="#cf6bed" style="background: #cf6bed"></button>
                      </div>
                      <div class="tarea-color-palette-row">
                        <button type="button" class="tarea-color-palette-btn" data-color="#ec4fe4" style="background: #ec4fe4"></button>
                        <button type="button" class="tarea-color-palette-btn" data-color="#6f80d8" style="background: #6f80d8"></button>
                        <button type="button" class="tarea-color-palette-btn" data-color="#4f62e1" style="background: #4f62e1"></button>
                        <button type="button" class="tarea-color-palette-btn" data-color="#51b7dd" style="background: #51b7dd"></button>
                        <button type="button" class="tarea-color-palette-btn" data-color="#3bd87b" style="background: #3bd87b"></button>
                      </div>
                      <div class="tarea-color-palette-row">
                        <button type="button" class="tarea-color-palette-btn" data-color="#7d6fcb" style="background: #7d6fcb"></button>
                        <button type="button" class="tarea-color-palette-btn" data-color="#5f49a8" style="background: #5f49a8"></button>
                        <button type="button" class="tarea-color-palette-btn" data-color="#362f88" style="background: #362f88"></button>
                        <button type="button" class="tarea-color-palette-btn" data-color="#547f8c" style="background: #547f8c"></button>
                        <button type="button" class="tarea-color-palette-btn" data-color="#3c6763" style="background: #3c6763"></button>
                      </div>
                    </div>
                    <div class="tarea-palette-calido" style="display: none">
                      <div class="tarea-color-palette-row">
                        <button type="button" class="tarea-color-palette-btn" data-color="#ffe7b3" style="background: #ffe7b3"></button>
                        <button type="button" class="tarea-color-palette-btn" data-color="#ffe07a" style="background: #ffe07a"></button>
                        <button type="button" class="tarea-color-palette-btn" data-color="#ffcb2d" style="background: #ffcb2d"></button>
                        <button type="button" class="tarea-color-palette-btn" data-color="#ffc101" style="background: #ffc101"></button>
                        <button type="button" class="tarea-color-palette-btn" data-color="#f8a527" style="background: #f8a527"></button>
                      </div>
                      <div class="tarea-color-palette-row">
                        <button type="button" class="tarea-color-palette-btn" data-color="#f28500" style="background: #f28500"></button>
                        <button type="button" class="tarea-color-palette-btn" data-color="#ff5e3a" style="background: #ff5e3a"></button>
                        <button type="button" class="tarea-color-palette-btn" data-color="#e63b2e" style="background: #e63b2e"></button>
                        <button type="button" class="tarea-color-palette-btn" data-color="#c3221f" style="background: #c3221f"></button>
                        <button type="button" class="tarea-color-palette-btn" data-color="#911c1d" style="background: #911c1d"></button>
                      </div>
                      <div class="tarea-color-palette-row">
                        <button type="button" class="tarea-color-palette-btn" data-color="#ab4f33" style="background: #ab4f33"></button>
                        <button type="button" class="tarea-color-palette-btn" data-color="#9c6236" style="background: #9c6236"></button>
                        <button type="button" class="tarea-color-palette-btn" data-color="#a4a93c" style="background: #a4a93c"></button>
                        <button type="button" class="tarea-color-palette-btn" data-color="#718942" style="background: #718942"></button>
                        <button type="button" class="tarea-color-palette-btn" data-color="#7e9453" style="background: #7e9453"></button>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    id="showTareaPaletteBtn"
                    class="tarea-color-preview-btn"
                    style="background: #cccccc"
                  ></button>
                </div>
                <div class="tarea-form-actions">
                  <button type="button" class="tarea-btn tarea-btn-cancel">
                    Cancelar
                  </button>
                  <button type="submit" class="tarea-btn tarea-btn-save">
                    Guardar
                  </button>
                </div>
              </form>
            </div>
        `;
        tareaModal.style.display = 'flex';
        tareaModal.classList.add('show');

        // Subtareas dinámicas
        const form = tareaModal.querySelector('.tarea-form');
        let subtareas = [];

        // Contenedor para subtareas
        let subtareasContainer = document.createElement('div');
        subtareasContainer.className = 'tarea-subtareas-container';
        form.insertBefore(subtareasContainer, form.querySelector('.tarea-desc'));

        // Botón para agregar subtarea
        const btnSub = form.querySelector('.tarea-btn-sub');
        btnSub.onclick = function(e) {
            e.preventDefault();
            const subDiv = document.createElement('div');
            subDiv.className = 'tarea-subtarea-row';
            subDiv.style.display = 'flex';
            subDiv.style.alignItems = 'center';
            subDiv.style.gap = '8px';
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'tarea-input tarea-subtarea-input';
            input.placeholder = 'Subtarea...';
            input.required = true;
            const btnDel = document.createElement('button');
            btnDel.type = 'button';
            btnDel.className = 'tarea-btn tarea-btn-del-sub';
            btnDel.textContent = '×';
            btnDel.style.width = '28px';
            btnDel.style.padding = '0';
            btnDel.onclick = function() {
                subDiv.remove();
            };
            subDiv.appendChild(input);
            subDiv.appendChild(btnDel);
            subtareasContainer.appendChild(subDiv);
        };

        // Paleta de colores
        const colorType = tareaModal.querySelector('#tareaColorType');
        const palettePopup = tareaModal.querySelector('#tareaColorPalettePopup');
        const btnShowPalette = tareaModal.querySelector('#showTareaPaletteBtn');
        const colorInput = tareaModal.querySelector('#tareaColorPicker');
        const btnsFrio = tareaModal.querySelector('.tarea-palette-frio');
        const btnsCalido = tareaModal.querySelector('.tarea-palette-calido');

        // Mostrar el color inicial en el círculo
        btnShowPalette.style.background = colorInput.value;

        colorType.addEventListener('change', function() {
            if (colorType.value === 'frio') {
                btnsFrio.style.display = 'block';
                btnsCalido.style.display = 'none';
                palettePopup.style.display = 'block';
            } else if (colorType.value === 'calido') {
                btnsFrio.style.display = 'none';
                btnsCalido.style.display = 'block';
                palettePopup.style.display = 'block';
            } else {
                palettePopup.style.display = 'none';
            }
        });

        btnShowPalette.onclick = function(e) {
            e.preventDefault();
            if (colorType.value === 'frio' || colorType.value === 'calido') {
                palettePopup.style.display = palettePopup.style.display === 'block' ? 'none' : 'block';
            }
        };

        tareaModal.querySelectorAll('.tarea-color-palette-btn').forEach(btn => {
            btn.onclick = function() {
                const color = btn.getAttribute('data-color');
                colorInput.value = color;
                btnShowPalette.style.background = color;
                palettePopup.style.display = 'none';
            };
        });

        tareaModal.querySelector('#tareaModalClose').onclick = tareaModalClose;
        tareaModal.querySelector('.tarea-btn-cancel').onclick = tareaModalClose;

        // Guardar tarea
        tareaModal.querySelector('.tarea-form').onsubmit = function(e) {
            e.preventDefault();
            const nombre = form.querySelector('.nombre-tarea').value.trim();
            if (!nombre) {
                mostrarMensaje('El nombre de la tarea es obligatorio', false);
                form.querySelector('.nombre-tarea').focus();
                return;
            }
            const descripcion = form.querySelector('.tarea-desc').value.trim();
            const fecha = form.querySelector('.tarea-fecha').value;
            const hora = form.querySelector('.tarea-hora').value;
            const ubicacion = ""; // puedes agregar lógica para ubicación
            const color = colorInput.value;
            // Subtareas
            const subtareasInputs = form.querySelectorAll('.tarea-subtarea-input');
            const subtareasArr = Array.from(subtareasInputs).map(input => ({
                nombre: input.value.trim(),
                completada: false
            }));
            tareas.push({
                nombre,
                descripcion,
                fecha,
                hora,
                ubicacion,
                color,
                completada: false,
                subtareas: subtareasArr
            });
            guardarTareas();
            tareaModalClose();
            renderTareas();
            mostrarMensaje('Tarea creada correctamente', true);
        };

        tareaModal.onclick = function(e) {
            if (e.target === tareaModal) tareaModalClose();
        };
    }

    if (agregarTareaBtn) {
        agregarTareaBtn.addEventListener('click', function() {
            abrirTareaModal();
        });
    }

    // --- Edición de tareas ---
    function abrirDetalleTareaModal(idx) {
        const tarea = tareas[idx];
        tareaModal.innerHTML = `
            <div class="tarea-modal-content" style="background:#fff;">
                <button class="tarea-modal-close" id="tareaModalClose" aria-label="Cerrar">
                    <i class="fa fa-times"></i>
                </button>
                <h2 class="tarea-modal-title">${tarea.nombre}</h2>
                <div style="margin-bottom:10px;color:#666;">${tarea.descripcion || ''}</div>
                <div style="margin-bottom:10px;">
                    <b>Fecha:</b> ${tarea.fecha || '-'}<br>
                    <b>Hora:</b> ${tarea.hora || '-'}
                </div>
                <div style="margin-bottom:10px;">
                    <b>Ubicación:</b> ${tarea.ubicacion || '-'}
                </div>
                <div style="margin-bottom:10px;">
                    <b>Color:</b> <span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:${tarea.color||'#ccc'};border:1.5px solid #b9a5e2;vertical-align:middle;"></span>
                </div>
                <div style="margin-bottom:10px;">
                    <b>Subtareas:</b>
                    <div class="detalle-subtareas-lista"></div>
                </div>
                <div style="display:flex;gap:12px;justify-content:center;margin-top:18px;">
                    <button class="tarea-btn tarea-btn-editar" id="btnEditarTarea" style="flex:1;">Editar</button>
                </div>
            </div>
        `;
        tareaModal.style.display = 'flex';
        tareaModal.classList.add('show');

        // Render subtareas como checkboxes
        const lista = tareaModal.querySelector('.detalle-subtareas-lista');
        if (tarea.subtareas && tarea.subtareas.length > 0) {
            tarea.subtareas.forEach((st, i) => {
                const row = document.createElement('div');
                row.style.display = 'flex';
                row.style.alignItems = 'center';
                row.style.gap = '8px';
                const cb = document.createElement('input');
                cb.type = 'checkbox';
                cb.checked = !!st.completada;
                cb.onchange = function() {
                    st.completada = cb.checked;
                    // Si todas las subtareas están completas, marca la tarea como completa
                    tarea.completada = tarea.subtareas.length > 0 && tarea.subtareas.every(s => s.completada);
                    guardarTareas();
                    renderTareas();
                };
                const label = document.createElement('span');
                label.textContent = st.nombre;
                row.appendChild(cb);
                row.appendChild(label);
                lista.appendChild(row);
            });
        } else {
            lista.textContent = 'Sin subtareas';
            // Si no hay subtareas, la tarea nunca se marca como completada
            tarea.completada = false;
            guardarTareas();
            renderTareas();
        }

        tareaModal.querySelector('#tareaModalClose').onclick = tareaModalClose;
        tareaModal.onclick = function(e) {
            if (e.target === tareaModal) tareaModalClose();
        };

        // Botón editar
        tareaModal.querySelector('#btnEditarTarea').onclick = function() {
            abrirEditarTareaModal(idx);
        };
    }

    // Modal para editar tarea
    function abrirEditarTareaModal(idx) {
        const tarea = tareas[idx];
        tareaModal.innerHTML = `
            <div class="tarea-modal-content">
              <button class="tarea-modal-close" id="tareaModalClose" aria-label="Cerrar">
                <i class="fa fa-times"></i>
              </button>
              <h2 class="tarea-modal-title">Editar Tarea</h2>
              <form class="tarea-form">
                <input type="text" class="tarea-input nombre-tarea" placeholder="Nombre de tarea..." value="${tarea.nombre || ''}" />
                <button type="button" class="tarea-btn tarea-btn-sub">+ Sub Tarea</button>
                <textarea class="tarea-input tarea-desc" placeholder="Descripción...">${tarea.descripcion || ''}</textarea>
                <div class="tarea-form-row">
                  <label>Fecha:</label>
                  <i class="fa-regular fa-calendar"></i>
                  <input type="date" class="tarea-input tarea-fecha" value="${tarea.fecha || ''}" />
                </div>
                <div class="tarea-form-row">
                  <label>Hora:</label>
                  <i class="fa-regular fa-clock"></i>
                  <input type="time" class="tarea-input tarea-hora" value="${tarea.hora || ''}" />
                </div>
                <div class="tarea-form-row">
                  <label>Ubicación:</label>
                  <input type="text" class="tarea-input tarea-ubicacion" value="${tarea.ubicacion || ''}" placeholder="Ubicación..." />
                </div>
                <div class="tarea-form-row">
                  <label>Color:</label>
                  <input type="color" class="tarea-input tarea-color" value="${tarea.color || '#cccccc'}" />
                </div>
                <div class="tarea-subtareas-container"></div>
                <div class="tarea-form-actions">
                  <button type="button" class="tarea-btn tarea-btn-cancel">Cancelar</button>
                  <button type="submit" class="tarea-btn tarea-btn-save">Guardar</button>
                </div>
              </form>
            </div>
        `;
        tareaModal.style.display = 'flex';
        tareaModal.classList.add('show');

        // Subtareas dinámicas (edición)
        const form = tareaModal.querySelector('.tarea-form');
        const subtareasContainer = form.querySelector('.tarea-subtareas-container');
        (tarea.subtareas || []).forEach((st, i) => {
            const subDiv = document.createElement('div');
            subDiv.className = 'tarea-subtarea-row';
            subDiv.style.display = 'flex';
            subDiv.style.alignItems = 'center';
            subDiv.style.gap = '8px';
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'tarea-input tarea-subtarea-input';
            input.placeholder = 'Subtarea...';
            input.value = st.nombre;
            input.required = true;
            const cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.checked = !!st.completada;
            cb.title = 'Completada';
            cb.style.marginLeft = '8px';
            const btnDel = document.createElement('button');
            btnDel.type = 'button';
            btnDel.className = 'tarea-btn tarea-btn-del-sub';
            btnDel.textContent = '×';
            btnDel.style.width = '28px';
            btnDel.style.padding = '0';
            btnDel.onclick = function() {
                subDiv.remove();
            };
            subDiv.appendChild(input);
            subDiv.appendChild(cb);
            subDiv.appendChild(btnDel);
            subtareasContainer.appendChild(subDiv);
        });

        // Botón para agregar subtarea
        const btnSub = form.querySelector('.tarea-btn-sub');
        btnSub.onclick = function(e) {
            e.preventDefault();
            const subDiv = document.createElement('div');
            subDiv.className = 'tarea-subtarea-row';
            subDiv.style.display = 'flex';
            subDiv.style.alignItems = 'center';
            subDiv.style.gap = '8px';
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'tarea-input tarea-subtarea-input';
            input.placeholder = 'Subtarea...';
            input.required = true;
            const cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.title = 'Completada';
            cb.style.marginLeft = '8px';
            const btnDel = document.createElement('button');
            btnDel.type = 'button';
            btnDel.className = 'tarea-btn tarea-btn-del-sub';
            btnDel.textContent = '×';
            btnDel.style.width = '28px';
            btnDel.style.padding = '0';
            btnDel.onclick = function() {
                subDiv.remove();
            };
            subDiv.appendChild(input);
            subDiv.appendChild(cb);
            subDiv.appendChild(btnDel);
            subtareasContainer.appendChild(subDiv);
        };

        tareaModal.querySelector('#tareaModalClose').onclick = tareaModalClose;
        tareaModal.querySelector('.tarea-btn-cancel').onclick = tareaModalClose;

        // Guardar edición
        form.onsubmit = function(e) {
            e.preventDefault();
            const nombre = form.querySelector('.nombre-tarea').value.trim();
            if (!nombre) {
                mostrarMensaje('El nombre de la tarea es obligatorio', false);
                form.querySelector('.nombre-tarea').focus();
                return;
            }
            tarea.nombre = nombre;
            tarea.descripcion = form.querySelector('.tarea-desc').value.trim();
            tarea.fecha = form.querySelector('.tarea-fecha').value;
            tarea.hora = form.querySelector('.tarea-hora').value;
            tarea.ubicacion = form.querySelector('.tarea-ubicacion').value.trim();
            tarea.color = form.querySelector('.tarea-color').value;
            // Subtareas
            const subtareasInputs = subtareasContainer.querySelectorAll('.tarea-subtarea-row');
            tarea.subtareas = Array.from(subtareasInputs).map(row => ({
                nombre: row.querySelector('.tarea-subtarea-input').value.trim(),
                completada: row.querySelector('input[type="checkbox"]').checked
            }));
            // Sincronización visual de subtareas
            tarea.completada = tarea.subtareas.length > 0 && tarea.subtareas.every(s => s.completada);
            guardarTareas();
            tareaModalClose();
            renderTareas();
            mostrarMensaje('Tarea editada correctamente', true);
        };
        tareaModal.onclick = function(e) {
            if (e.target === tareaModal) tareaModalClose();
        };
    }

    renderTareas();
    // Para forzar los datos de ejemplo, puedes limpiar el localStorage manualmente en la consola:
    // localStorage.removeItem('tareas');
    // O agrega temporalmente esta línea al inicio del script (luego bórrala):
    // localStorage.removeItem('tareas');
});
