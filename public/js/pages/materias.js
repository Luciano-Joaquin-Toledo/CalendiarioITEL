// --- Menú lateral igual que en tareas/calendario ---
document.addEventListener('DOMContentLoaded', function() {
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
    // Lista de materias
    let materias = [
        {
            nombre: 'Matemática',
            color: '#c7d2f7',
            tareas: [
                {
                    nombre: 'TP 1',
                    descripcion: 'Ejercicios 1-10',
                    completada: false,
                    fecha: '2025-06-03',
                    hora: '20:05',
                    color: '#b9a5e2',
                    subtareas: [
                        { nombre: 'Investigar como funciona un motor', completada: false },
                        { nombre: 'Investigar como es un motor por dentro', completada: false }
                    ]
                }
            ],
            notas: [
                { titulo: 'Clase sobre derivadas', contenido: 'Anotar ejemplos de la pizarra y repasar el método de la cadena.' }
            ]
        },
        { nombre: 'Historia', color: '#ffe7b3', tareas: [], notas: [] },
        { nombre: 'Lengua', color: '#b9a5e2', tareas: [], notas: [] }
    ];

    const materiasLista = document.getElementById('materiasLista');
    const agregarMateriaBtn = document.getElementById('agregarMateriaBtn');
    const materiaModal = document.getElementById('materiaModal');

    // Modal para mostrar tareas y notas de una materia
    let detalleModal = null;
    let detalleOverlay = null;

    function cerrarDetalleModal() {
        if (detalleModal) detalleModal.remove();
        if (detalleOverlay) detalleOverlay.remove();
        detalleModal = null;
        detalleOverlay = null;
    }

    function abrirDetalleMateria(materia) {
        cerrarDetalleModal();
        detalleOverlay = document.createElement('div');
        detalleOverlay.style.position = 'fixed';
        detalleOverlay.style.top = 0;
        detalleOverlay.style.left = 0;
        detalleOverlay.style.width = '100vw';
        detalleOverlay.style.height = '100vh';
        detalleOverlay.style.background = 'rgba(30,30,40,0.32)';
        detalleOverlay.style.zIndex = 2000;
        detalleOverlay.onclick = cerrarDetalleModal;

        detalleModal = document.createElement('div');
        detalleModal.className = 'materia-detalle-modal';
        detalleModal.style.position = 'fixed';
        detalleModal.style.top = '50%';
        detalleModal.style.left = '50%';
        detalleModal.style.transform = 'translate(-50%, -50%)';
        detalleModal.style.background = '#fff';
        detalleModal.style.borderRadius = '18px';
        detalleModal.style.boxShadow = '0 4px 32px rgba(66,68,76,0.18)';
        detalleModal.style.zIndex = 2010;
        detalleModal.style.width = '95vw';
        detalleModal.style.maxWidth = '420px';
        detalleModal.style.maxHeight = '90vh';
        detalleModal.style.overflowY = 'auto';
        detalleModal.style.padding = '22px 16px 18px 16px';

        detalleModal.innerHTML = `
            <button style="position:absolute;top:10px;right:12px;background:none;border:none;font-size:22px;color:#8e44ad;cursor:pointer;" id="cerrarDetalleMateriaBtn" aria-label="Cerrar">
                <i class="fa fa-times"></i>
            </button>
            <h2 style="margin-top:0;margin-bottom:12px;font-size:22px;color:#4e2e8e;text-align:center;">${materia.nombre}</h2>
            <div style="display:flex;gap:10px;margin-bottom:18px;">
                <button id="tabTareas" style="flex:1;padding:8px 0;border:none;border-radius:8px 8px 0 0;background:#b9a5e2;color:#4e2e8e;font-weight:600;cursor:pointer;">Tareas</button>
                <button id="tabNotas" style="flex:1;padding:8px 0;border:none;border-radius:8px 8px 0 0;background:#ededf6;color:#4e2e8e;font-weight:600;cursor:pointer;">Notas</button>
            </div>
            <div id="materiaTabContent"></div>
        `;

        document.body.appendChild(detalleOverlay);
        document.body.appendChild(detalleModal);

        document.getElementById('cerrarDetalleMateriaBtn').onclick = cerrarDetalleModal;
        detalleModal.onclick = function(e) {
            if (e.target === detalleModal) cerrarDetalleModal();
        };

        function renderTab(tab) {
            const tabTareas = detalleModal.querySelector('#tabTareas');
            const tabNotas = detalleModal.querySelector('#tabNotas');
            const content = detalleModal.querySelector('#materiaTabContent');
            if (tab === 'tareas') {
                tabTareas.style.background = '#b9a5e2';
                tabNotas.style.background = '#ededf6';
                content.innerHTML = '';
                if (materia.tareas && materia.tareas.length > 0) {
                    materia.tareas.forEach((tarea, idx) => {
                        const tareaDiv = document.createElement('div');
                        tareaDiv.className = 'materia-detalle-tarea-item';
                        tareaDiv.style.background = '#ededf6';
                        tareaDiv.style.borderRadius = '10px';
                        tareaDiv.style.padding = '8px 10px';
                        tareaDiv.style.marginBottom = '8px';
                        tareaDiv.style.cursor = 'pointer';
                        tareaDiv.style.fontWeight = '500';
                        tareaDiv.textContent = tarea.nombre;
                        tareaDiv.onclick = function(e) {
                            e.stopPropagation();
                            abrirDetalleTareaModal(tarea);
                        };
                        content.appendChild(tareaDiv);
                    });
                } else {
                    content.innerHTML = '<div style="color:#888;font-size:14px;">Sin tareas</div>';
                }
            } else {
                // NOTAS = ANOTACIONES
                tabTareas.style.background = '#ededf6';
                tabNotas.style.background = '#b9a5e2';
                content.innerHTML = '';
                if (materia.notas && materia.notas.length > 0) {
                    materia.notas.forEach((nota, idx) => {
                        const notaDiv = document.createElement('div');
                        notaDiv.className = 'materia-detalle-nota-item';
                        notaDiv.style.background = '#c4c7d4';
                        notaDiv.style.borderRadius = '10px';
                        notaDiv.style.padding = '8px 10px';
                        notaDiv.style.marginBottom = '8px';
                        notaDiv.style.cursor = 'pointer';
                        notaDiv.style.fontWeight = '500';
                        notaDiv.textContent = nota.titulo;
                        notaDiv.onclick = function(e) {
                            e.stopPropagation();
                            abrirDetalleNotaModal(nota);
                        };
                        content.appendChild(notaDiv);
                    });
                } else {
                    content.innerHTML = '<div style="color:#888;font-size:14px;">Sin anotaciones</div>';
                }
            }
        }

        detalleModal.querySelector('#tabTareas').onclick = () => renderTab('tareas');
        detalleModal.querySelector('#tabNotas').onclick = () => renderTab('notas');
        renderTab('tareas');
    }

    function abrirDetalleTareaModal(tarea) {
        cerrarDetalleModal();
        const overlay = document.createElement('div');
        overlay.className = 'materia-detalle-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.background = 'rgba(30,30,40,0.32)';
        overlay.style.zIndex = 2100;
        overlay.onclick = () => { modal.remove(); overlay.remove(); };

        const modal = document.createElement('div');
        modal.className = 'materia-tarea-modal';
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.background = '#fff';
        modal.style.borderRadius = '18px';
        modal.style.boxShadow = '0 4px 32px rgba(66,68,76,0.18)';
        modal.style.zIndex = 2110;
        modal.style.width = '90vw';
        modal.style.maxWidth = '340px';
        modal.style.padding = '22px 16px 18px 16px';

        // Modal de tarea con subtareas, fecha, hora y color
        modal.innerHTML = `
            <button style="position:absolute;top:10px;right:12px;background:none;border:none;font-size:22px;color:#8e44ad;cursor:pointer;" aria-label="Cerrar">
                <i class="fa fa-times"></i>
            </button>
            <h3 style="margin-top:0;margin-bottom:12px;font-size:20px;color:#4e2e8e;">${tarea.nombre}</h3>
            <div style="color:#666;margin-bottom:8px;">${tarea.descripcion || ''}</div>
            <div style="margin-bottom:8px;">
                <b>Fecha:</b> ${tarea.fecha || '-'}<br>
                <b>Hora:</b> ${tarea.hora || '-'}
            </div>
            <div style="margin-bottom:8px;">
                <b>Color:</b> <span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:${tarea.color||'#ccc'};border:1.5px solid #b9a5e2;vertical-align:middle;"></span>
            </div>
            <div style="margin-bottom:8px;">
                <b>Subtareas:</b>
                <div class="detalle-subtareas-lista"></div>
            </div>
        `;
        modal.querySelector('button').onclick = () => { modal.remove(); overlay.remove(); };
        modal.onclick = function(e) { if (e.target === modal) { modal.remove(); overlay.remove(); } };

        // Render subtareas como checkboxes
        const lista = modal.querySelector('.detalle-subtareas-lista');
        if (tarea.subtareas && tarea.subtareas.length > 0) {
            tarea.subtareas.forEach((st, i) => {
                const row = document.createElement('div');
                row.style.display = 'flex';
                row.style.alignItems = 'center';
                row.style.gap = '8px';
                const cb = document.createElement('input');
                cb.type = 'checkbox';
                cb.checked = !!st.completada;
                cb.disabled = true;
                const label = document.createElement('span');
                label.textContent = st.nombre;
                row.appendChild(cb);
                row.appendChild(label);
                lista.appendChild(row);
            });
        } else {
            lista.textContent = 'Sin subtareas';
        }

        document.body.appendChild(overlay);
        document.body.appendChild(modal);
    }

    function abrirDetalleNotaModal(nota) {
        cerrarDetalleModal();
        const overlay = document.createElement('div');
        overlay.className = 'materia-detalle-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.background = 'rgba(30,30,40,0.32)';
        overlay.style.zIndex = 2100;
        overlay.onclick = () => { modal.remove(); overlay.remove(); };

        const modal = document.createElement('div');
        modal.className = 'materia-nota-modal';
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.background = '#fff';
        modal.style.borderRadius = '18px';
        modal.style.boxShadow = '0 4px 32px rgba(66,68,76,0.18)';
        modal.style.zIndex = 2110;
        modal.style.width = '90vw';
        modal.style.maxWidth = '340px';
        modal.style.padding = '22px 16px 18px 16px';

        // Nota = anotación
        modal.innerHTML = `
            <button style="position:absolute;top:10px;right:12px;background:none;border:none;font-size:22px;color:#8e44ad;cursor:pointer;" aria-label="Cerrar">
                <i class="fa fa-times"></i>
            </button>
            <h3 style="margin-top:0;margin-bottom:12px;font-size:20px;color:#4e2e8e;">${nota.titulo}</h3>
            <div style="color:#666;margin-bottom:10px;">${nota.contenido || ''}</div>
        `;
        modal.querySelector('button').onclick = () => { modal.remove(); overlay.remove(); };
        modal.onclick = function(e) { if (e.target === modal) { modal.remove(); overlay.remove(); } };

        document.body.appendChild(overlay);
        document.body.appendChild(modal);
    }

    // --- NUEVO: Persistencia en localStorage ---
    function guardarMaterias() {
        localStorage.setItem('materias', JSON.stringify(materias));
    }
    function cargarMaterias() {
        const data = localStorage.getItem('materias');
        if (data) {
            try {
                materias = JSON.parse(data);
            } catch (e) {}
        }
    }
    cargarMaterias();

    // --- NUEVO: Buscador de materias ---
    let filtroBusqueda = '';
    function renderMaterias() {
        materiasLista.innerHTML = '';
        let lista = materias;
        if (filtroBusqueda.trim() !== '') {
            lista = materias.filter(m =>
                m.nombre.toLowerCase().includes(filtroBusqueda.trim().toLowerCase())
            );
        }
        lista.forEach((materia, idx) => {
            const card = document.createElement('div');
            card.className = 'materia-card';
            card.style.background = materia.color || '#ededf6';

            const nombre = document.createElement('div');
            nombre.className = 'materia-nombre';
            nombre.textContent = materia.nombre;

            // Editar
            const editar = document.createElement('button');
            editar.className = 'materia-editar';
            editar.innerHTML = '<i class="fa fa-pen"></i>';
            editar.onclick = (e) => {
                e.stopPropagation();
                abrirCrearMateriaModal(materia, idx);
            };

            // Eliminar
            const eliminar = document.createElement('button');
            eliminar.className = 'materia-eliminar';
            eliminar.innerHTML = '<i class="fa fa-trash"></i>';
            eliminar.onclick = (e) => {
                e.stopPropagation();
                mostrarModalEliminarMateria(materia.nombre, idx);
            };

            card.appendChild(nombre);
            card.appendChild(editar);
            card.appendChild(eliminar);

            // Al hacer click en la tarjeta, abrir detalle
            card.onclick = function() {
                abrirDetalleMateria(materia);
            };

            materiasLista.appendChild(card);
        });
    }

    // --- NUEVO: Buscador en la UI ---
    // Insertar buscador arriba de la lista
    const buscador = document.createElement('input');
    buscador.type = 'text';
    buscador.placeholder = 'Buscar materia...';
    buscador.style.width = '100%';
    buscador.style.margin = '10px 0 0 0';
    buscador.style.padding = '8px 12px';
    buscador.style.borderRadius = '12px';
    buscador.style.border = '1.5px solid #b9a5e2';
    buscador.style.fontSize = '16px';
    buscador.style.boxSizing = 'border-box';
    buscador.addEventListener('input', function() {
        filtroBusqueda = buscador.value;
        renderMaterias();
    });
    materiasLista.parentNode.insertBefore(buscador, materiasLista);

    // Mostrar modal para crear o editar materia with overlay oscuro
    function abrirCrearMateriaModal(materiaEditar = null, idxEditar = null) {
        // Elimina cualquier modal/overlay previo
        document.querySelectorAll('.materia-modal, #materiaModalOverlay').forEach(e => e.remove());
        document.body.style.overflow = 'hidden';

        // Overlay
        const overlay = document.createElement('div');
        overlay.id = 'materiaModalOverlay';
        overlay.style.position = 'fixed';
        overlay.style.left = 0;
        overlay.style.top = 0;
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.background = 'rgba(30,30,40,0.32)';
        overlay.style.zIndex = 2100;
        overlay.style.transition = 'opacity 0.18s';
        overlay.style.opacity = '0';

        // Modal
        const modal = document.createElement('div');
        modal.className = 'materia-modal';
        modal.id = 'materiaModal';
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%) scale(0.98)';
        modal.style.background = '#fff';
        modal.style.borderRadius = '18px';
        modal.style.boxShadow = '0 4px 32px rgba(66,68,76,0.18)';
        modal.style.zIndex = 2110;
        modal.style.width = '95vw';
        modal.style.maxWidth = '370px';
        modal.style.padding = '28px 22px 22px 22px';
        modal.style.display = 'block';
        modal.style.transition = 'transform 0.18s, opacity 0.18s';
        modal.style.opacity = '0';

        // Valores iniciales
        const nombreVal = materiaEditar ? materiaEditar.nombre.replace(/"/g,'&quot;') : '';
        const descVal = materiaEditar && materiaEditar.descripcion ? materiaEditar.descripcion : '';
        const colorVal = materiaEditar ? materiaEditar.color : '#c7d2f7';
        // Detecta tipo de color
        const frioColors = [
            "#c7d2f7","#9cc2f4","#86a8f0","#a480f0","#cf6bed","#ec4fe4","#6f80d8","#4f62e1","#51b7dd","#3bd87b","#7d6fcb","#5f49a8","#362f88","#547f8c","#3c6763"
        ];
        const calidoColors = [
            "#ffe7b3","#ffe07a","#ffcb2d","#ffc101","#f8a527","#f28500","#ff5e3a","#e63b2e","#c3221f","#911c1d","#ab4f33","#9c6236","#a4a93c","#718942","#7e9453"
        ];
        let tipoColor = '';
        if (frioColors.includes(colorVal)) tipoColor = 'frio';
        else if (calidoColors.includes(colorVal)) tipoColor = 'calido';

        modal.innerHTML = `
      <div class="materia-modal-content" style="padding:0;">
        <button
          class="materia-modal-close"
          id="materiaModalClose"
          aria-label="Cerrar"
          style="position:absolute;top:12px;right:14px;background:none;border:none;font-size:22px;color:#8e44ad;cursor:pointer;z-index:2;"
        >
          <i class="fa fa-times"></i>
        </button>
        <h2 class="materia-modal-title" style="margin:0 0 18px 0;text-align:center;font-size:22px;color:#4e2e8e;">
            ${materiaEditar ? 'Editar Materia' : 'Crear Materia'}
        </h2>
        <form class="materia-form" autocomplete="off" style="display:flex;flex-direction:column;gap:12px;">
          <input
            type="text"
            class="materia-input nombre-materia"
            placeholder="Nombre de Materia ..."
            required
            maxlength="32"
            value="${nombreVal}"
            style="font-size:17px;padding:10px 12px;border-radius:10px;border:1.5px solid #b9a5e2;"
          />
          <hr class="materia-divider" />
          <textarea
            class="materia-input materia-desc"
            placeholder="Descripción..."
            maxlength="120"
            style="font-size:15px;padding:10px 12px;border-radius:10px;border:1.5px solid #b9a5e2;min-height:48px;resize:vertical;"
          >${descVal}</textarea>
          <div class="materia-form-row" style="display:flex;align-items:center;gap:10px;">
            <label style="font-size:15px;">Imagen:</label>
            <button type="button" class="materia-btn materia-btn-sm" tabindex="-1" style="pointer-events:none;opacity:.5;">...</button>
          </div>
          <div class="materia-form-row" style="display:flex;align-items:center;gap:10px;">
            <label style="font-size:15px;">Ubicación:</label>
            <button type="button" class="materia-btn materia-btn-sm" tabindex="-1" style="pointer-events:none;opacity:.5;">...</button>
          </div>
          <div class="materia-form-row" style="display:flex;align-items:center;gap:10px;">
            <label style="font-size:15px;">Tipo de Color:</label>
            <select class="materia-input materia-color-type" id="materiaColorType" style="flex:1;">
              <option value="">Seleccionar...</option>
              <option value="frio" ${tipoColor==='frio'?'selected':''}>Frío</option>
              <option value="calido" ${tipoColor==='calido'?'selected':''}>Cálido</option>
            </select>
          </div>
          <div class="materia-form-row" style="flex-direction:column;align-items:flex-start;gap:6px;">
            <label style="font-size:15px;">Color de la Materia:</label>
            <input type="hidden" id="materiaColorPicker" name="materiaColor" value="${colorVal}" />
            <div class="color-palette-popup" id="colorPalettePopup" style="display:none;">
              <div class="palette-frio" style="display:${tipoColor==='frio'?'block':'none'};">
                <div class="color-palette-row">
                  <button type="button" class="color-palette-btn" data-color="#c7d2f7" style="background: #c7d2f7"></button>
                  <button type="button" class="color-palette-btn" data-color="#9cc2f4" style="background: #9cc2f4"></button>
                  <button type="button" class="color-palette-btn" data-color="#86a8f0" style="background: #86a8f0"></button>
                  <button type="button" class="color-palette-btn" data-color="#a480f0" style="background: #a480f0"></button>
                  <button type="button" class="color-palette-btn" data-color="#cf6bed" style="background: #cf6bed"></button>
                </div>
                <div class="color-palette-row">
                  <button type="button" class="color-palette-btn" data-color="#ec4fe4" style="background: #ec4fe4"></button>
                  <button type="button" class="color-palette-btn" data-color="#6f80d8" style="background: #6f80d8"></button>
                  <button type="button" class="color-palette-btn" data-color="#4f62e1" style="background: #4f62e1"></button>
                  <button type="button" class="color-palette-btn" data-color="#51b7dd" style="background: #51b7dd"></button>
                  <button type="button" class="color-palette-btn" data-color="#3bd87b" style="background: #3bd87b"></button>
                </div>
                <div class="color-palette-row">
                  <button type="button" class="color-palette-btn" data-color="#7d6fcb" style="background: #7d6fcb"></button>
                  <button type="button" class="color-palette-btn" data-color="#5f49a8" style="background: #5f49a8"></button>
                  <button type="button" class="color-palette-btn" data-color="#362f88" style="background: #362f88"></button>
                  <button type="button" class="color-palette-btn" data-color="#547f8c" style="background: #547f8c"></button>
                  <button type="button" class="color-palette-btn" data-color="#3c6763" style="background: #3c6763"></button>
                </div>
              </div>
              <div class="palette-calido" style="display:${tipoColor==='calido'?'block':'none'};">
                <div class="color-palette-row">
                  <button type="button" class="color-palette-btn" data-color="#ffe7b3" style="background: #ffe7b3"></button>
                  <button type="button" class="color-palette-btn" data-color="#ffe07a" style="background: #ffe07a"></button>
                  <button type="button" class="color-palette-btn" data-color="#ffcb2d" style="background: #ffcb2d"></button>
                  <button type="button" class="color-palette-btn" data-color="#ffc101" style="background: #ffc101"></button>
                  <button type="button" class="color-palette-btn" data-color="#f8a527" style="background: #f8a527"></button>
                </div>
                <div class="color-palette-row">
                  <button type="button" class="color-palette-btn" data-color="#f28500" style="background: #f28500"></button>
                  <button type="button" class="color-palette-btn" data-color="#ff5e3a" style="background: #ff5e3a"></button>
                  <button type="button" class="color-palette-btn" data-color="#e63b2e" style="background: #e63b2e"></button>
                  <button type="button" class="color-palette-btn" data-color="#c3221f" style="background: #c3221f"></button>
                  <button type="button" class="color-palette-btn" data-color="#911c1d" style="background: #911c1d"></button>
                </div>
                <div class="color-palette-row">
                  <button type="button" class="color-palette-btn" data-color="#ab4f33" style="background: #ab4f33"></button>
                  <button type="button" class="color-palette-btn" data-color="#9c6236" style="background: #9c6236"></button>
                  <button type="button" class="color-palette-btn" data-color="#a4a93c" style="background: #a4a93c"></button>
                  <button type="button" class="color-palette-btn" data-color="#718942" style="background: #718942"></button>
                  <button type="button" class="color-palette-btn" data-color="#7e9453" style="background: #7e9453"></button>
                </div>
              </div>
            </div>
            <button type="button" id="showPaletteBtn" class="color-preview-btn" style="background:${colorVal};width:36px;height:36px;border-radius:50%;border:2px solid #b9a5e2;box-shadow:0 1px 4px #b9a5e2;vertical-align:middle;margin-top:4px;"></button>
          </div>
          <div class="materia-form-actions" style="display:flex;gap:12px;margin-top:8px;">
            <button type="button" class="materia-btn materia-btn-cancel"
              style="flex:1;background:#ededf6;color:#42444c;border:none;border-radius:10px;padding:10px 0;font-size:16px;font-weight:600;cursor:pointer;transition:background 0.18s;">
              Cancelar
            </button>
            <button type="submit" class="materia-btn materia-btn-save"
              style="flex:1;background:#b9a5e2;color:#4e2e8e;border:none;border-radius:10px;padding:10px 0;font-size:16px;font-weight:600;cursor:pointer;transition:background 0.18s;">
              Guardar
            </button>
          </div>
          <div class="materia-form-error" style="color:#c3221f;font-size:14px;margin-top:2px;display:none;min-height:18px;transition:opacity 0.18s;"></div>
        </form>
      </div>
    `;

        // Inserta overlay y modal al DOM antes de asignar eventos
        document.body.appendChild(overlay);
        document.body.appendChild(modal);

        setTimeout(() => {
            overlay.style.opacity = '1';
            modal.style.transform = 'translate(-50%, -50%) scale(1)';
            modal.style.opacity = '1';
        }, 10);

        // Paleta de colores y eventos
        const colorType = modal.querySelector('#materiaColorType');
        const palettePopup = modal.querySelector('#colorPalettePopup');
        const btnShowPalette = modal.querySelector('#showPaletteBtn');
        const colorInput = modal.querySelector('#materiaColorPicker');
        const btnsFrio = modal.querySelector('.palette-frio');
        const btnsCalido = modal.querySelector('.palette-calido');

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

        modal.querySelectorAll('.color-palette-btn').forEach(btn => {
            btn.onclick = function() {
                const color = btn.getAttribute('data-color');
                colorInput.value = color;
                btnShowPalette.style.background = color;
                palettePopup.style.display = 'none';
            };
        });

        // Cierre modal y overlay
        function cerrarModalAnimado() {
            modal.style.opacity = '0';
            modal.style.transform = 'translate(-50%, -50%) scale(0.98)';
            overlay.style.opacity = '0';
            setTimeout(() => {
                modal.remove();
                overlay.remove();
                document.body.style.overflow = '';
            }, 180);
        }
        modal.querySelector('#materiaModalClose').onclick = cerrarModalAnimado;
        modal.querySelector('.materia-btn-cancel').onclick = cerrarModalAnimado;
        overlay.onclick = function(e) { if (e.target === overlay) cerrarModalAnimado(); };
        modal.onclick = function(e) { if (e.target === modal) cerrarModalAnimado(); };

        // Cerrar con Escape
        function escListener(ev) {
            if (ev.key === 'Escape') cerrarModalAnimado();
        }
        setTimeout(() => document.addEventListener('keydown', escListener), 50);

        // Limpieza de eventos al cerrar
        overlay.addEventListener('transitionend', function limpiar() {
            document.removeEventListener('keydown', escListener);
            overlay.removeEventListener('transitionend', limpiar);
        });

        // Guardar materia
        modal.querySelector('.materia-form').onsubmit = function(e) {
            e.preventDefault();
            const nombre = modal.querySelector('.nombre-materia').value.trim();
            const descripcion = modal.querySelector('.materia-desc').value.trim();
            const color = colorInput.value;
            const errorDiv = modal.querySelector('.materia-form-error');
            // Validación: nombre vacío
            if (!nombre) {
                errorDiv.textContent = 'El nombre es obligatorio.';
                errorDiv.style.display = 'block';
                errorDiv.style.opacity = '1';
                return;
            }
            // Validación: nombre duplicado
            const existe = materias.some((m, i) =>
                m.nombre.toLowerCase() === nombre.toLowerCase() &&
                (materiaEditar ? i !== idxEditar : true)
            );
            if (existe) {
                errorDiv.textContent = 'Ya existe una materia con ese nombre.';
                errorDiv.style.display = 'block';
                errorDiv.style.opacity = '1';
                return;
            }
            errorDiv.style.opacity = '0';
            setTimeout(() => { errorDiv.style.display = 'none'; }, 180);
            if (materiaEditar) {
                materias[idxEditar].nombre = nombre;
                materias[idxEditar].color = color;
                materias[idxEditar].descripcion = descripcion;
                mostrarMensaje('Materia editada con éxito');
            } else {
                materias.push({
                    nombre,
                    color,
                    descripcion,
                    tareas: [],
                    notas: []
                });
                mostrarMensaje('Materia creada con éxito');
            }
            guardarMaterias();
            cerrarModalAnimado();
            renderMaterias();
        };

        // Enfoque automático en nombre
        setTimeout(() => {
            const input = modal.querySelector('.nombre-materia');
            if (input) input.focus();
        }, 100);
    }

    // --- NUEVO: Mensaje de éxito ---
    function mostrarMensaje(msg) {
        const div = document.createElement('div');
        div.textContent = msg;
        div.style.position = 'fixed';
        div.style.bottom = '32px';
        div.style.left = '50%';
        div.style.transform = 'translateX(-50%)';
        div.style.background = '#8e44ad';
        div.style.color = '#fff';
        div.style.padding = '12px 28px';
        div.style.borderRadius = '16px';
        div.style.fontSize = '16px';
        div.style.fontWeight = '600';
        div.style.zIndex = 9999;
        div.style.boxShadow = '0 2px 12px rgba(66,68,76,0.10)';
        document.body.appendChild(div);
        setTimeout(() => { div.remove(); }, 1800);
    }

    if (agregarMateriaBtn) {
        agregarMateriaBtn.onclick = function() {
            abrirCrearMateriaModal();
        };
    }

    renderMaterias();
    // ...existing code...

    function mostrarModalEliminarMateria(nombre, idx) {
        // Elimina cualquier modal previo
        const prev = document.getElementById('modalEliminarMateria');
        if (prev) prev.remove();

        // Overlay
        const overlay = document.createElement('div');
        overlay.id = 'modalEliminarMateria';
        overlay.style.position = 'fixed';
        overlay.style.left = 0;
        overlay.style.top = 0;
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.background = 'rgba(30,30,40,0.32)';
        overlay.style.zIndex = 3000;
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';

        // Modal
        const modal = document.createElement('div');
        modal.style.background = '#fff';
        modal.style.borderRadius = '18px';
        modal.style.boxShadow = '0 4px 32px rgba(66,68,76,0.18)';
        modal.style.padding = '28px 18px 18px 18px';
        modal.style.textAlign = 'center';
        modal.style.maxWidth = '320px';
        modal.style.width = '90vw';
        modal.style.fontFamily = 'inherit';

        // Mensaje
        const msg = document.createElement('div');
        msg.style.fontSize = '18px';
        msg.style.color = '#222';
        msg.style.marginBottom = '22px';
        msg.style.fontWeight = '500';
        msg.textContent = `¿Desea eliminar "${nombre}" permanentemente?`;

        // Botones
        const btns = document.createElement('div');
        btns.style.display = 'flex';
        btns.style.gap = '18px';
        btns.style.justifyContent = 'center';

        const btnCancelar = document.createElement('button');
        btnCancelar.textContent = 'Cancelar';
        btnCancelar.style.flex = '1';
        btnCancelar.style.background = '#ededf6';
        btnCancelar.style.color = '#42444c';
        btnCancelar.style.border = 'none';
        btnCancelar.style.borderRadius = '10px';
        btnCancelar.style.padding = '10px 0';
        btnCancelar.style.fontSize = '16px';
        btnCancelar.style.fontWeight = '600';
        btnCancelar.style.cursor = 'pointer';
        btnCancelar.style.transition = 'background 0.18s, color 0.18s';
        btnCancelar.onmouseover = btnCancelar.onfocus = function() {
            btnCancelar.style.background = '#b9a5e2';
            btnCancelar.style.color = '#fff';
        };
        btnCancelar.onmouseout = btnCancelar.onblur = function() {
            btnCancelar.style.background = '#ededf6';
            btnCancelar.style.color = '#42444c';
        };
        btnCancelar.onclick = () => overlay.remove();

        const btnAceptar = document.createElement('button');
        btnAceptar.textContent = 'Aceptar';
        btnAceptar.style.flex = '1';
        btnAceptar.style.background = '#b9a5e2';
        btnAceptar.style.color = '#42444c';
        btnAceptar.style.border = 'none';
        btnAceptar.style.borderRadius = '10px';
        btnAceptar.style.padding = '10px 0';
        btnAceptar.style.fontSize = '16px';
        btnAceptar.style.fontWeight = '600';
        btnAceptar.style.cursor = 'pointer';
        btnAceptar.style.transition = 'background 0.18s, color 0.18s';
        btnAceptar.onmouseover = btnAceptar.onfocus = function() {
            btnAceptar.style.background = '#8e44ad';
            btnAceptar.style.color = '#fff';
        };
        btnAceptar.onmouseout = btnAceptar.onblur = function() {
            btnAceptar.style.background = '#b9a5e2';
            btnAceptar.style.color = '#42444c';
        };
        btnAceptar.onclick = function() {
            materias.splice(idx, 1);
            guardarMaterias();
            renderMaterias();
            overlay.remove();
            mostrarMensaje('Materia eliminada');
        };

        btns.appendChild(btnCancelar);
        btns.appendChild(btnAceptar);

        modal.appendChild(msg);
        modal.appendChild(btns);
        overlay.appendChild(modal);

        overlay.onclick = function(e) {
            if (e.target === overlay) overlay.remove();
        };

        document.body.appendChild(overlay);
    }
});
