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

    // Ejemplo de tareas iniciales
    let tareas = [
        { nombre: 'Tarea', completada: false, subtareas: [] },
        { nombre: 'Tarea', completada: false, subtareas: [] },
        { nombre: 'Tarea', completada: false, subtareas: [] },
        { nombre: 'Tarea', completada: false, subtareas: [] },
        { nombre: 'Tarea', completada: false, subtareas: [] },
        { nombre: 'Tarea', completada: false, subtareas: [] }
    ];

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
                renderTareas();
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

    function renderTareas() {
        tareasLista.innerHTML = '';
        tareas.forEach((tarea, idx) => {
            const item = document.createElement('div');
            item.className = 'tarea-item';

            // Solo el card tiene color, el modal no
            if (tarea.color) {
                item.style.background = tarea.color;
            } else {
                item.style.background = '#ededf6';
            }

            const check = document.createElement('div');
            check.className = 'tarea-check' + (tarea.completada ? ' checked' : '');
            check.setAttribute('aria-checked', tarea.completada ? 'true' : 'false');

            const nombre = document.createElement('div');
            nombre.className = 'tarea-nombre';
            nombre.textContent = tarea.nombre;
            nombre.style.cursor = 'pointer';
            nombre.onclick = () => abrirDetalleTareaModal(idx);

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
            tareasLista.appendChild(item);
        });
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
            tareaModalClose();
            renderTareas();
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

    // --- Modal de detalle de tarea ---
    function abrirDetalleTareaModal(idx) {
        const tarea = tareas[idx];
        // El modal siempre fondo blanco
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
                    <b>Color:</b> <span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:${tarea.color||'#ccc'};border:1.5px solid #b9a5e2;vertical-align:middle;"></span>
                </div>
                <div style="margin-bottom:10px;">
                    <b>Subtareas:</b>
                    <div class="detalle-subtareas-lista"></div>
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
            renderTareas();
        }

        tareaModal.querySelector('#tareaModalClose').onclick = tareaModalClose;
        tareaModal.onclick = function(e) {
            if (e.target === tareaModal) tareaModalClose();
        };
    }

    renderTareas();
});
