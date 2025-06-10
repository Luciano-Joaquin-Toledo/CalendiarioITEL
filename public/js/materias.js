
    // Paletas de colores
    const PALETTE_FRIO = [
      "#c7d6fa", "#a7c7f7", "#7eb6f6", "#b39ddb", "#d180e8",
      "#f062c2", "#7986cb", "#5c6bc0", "#64b5f6", "#4caf50",
      "#7e57c2", "#5e35b1", "#304ffe", "#4f868e", "#39796b"
    ];
    const PALETTE_CALIDO = [
      "#ffe082", "#ffe066", "#ffd54f", "#ffc300", "#ffb347",
      "#ff9800", "#ff7043", "#ff5252", "#e53935", "#b71c1c",
      "#a0522d", "#a67c52", "#bdb76b", "#8bc34a", "#789262"
    ];
    let currentPalette = PALETTE_FRIO;

    // Color popover para materia
    const colorPalettePopover = document.getElementById('colorPalettePopover');
    const colorPaletteGrid = document.getElementById('colorPaletteGrid');
    const subjectColorCarte = document.getElementById('subjectColorCarte');
    const subjectColor = document.getElementById('subjectColor');
    const subjectColorType = document.getElementById('subjectColorType');

    function renderColorPalettePopover(palette, selectedColor) {
      colorPaletteGrid.innerHTML = '';
      palette.forEach(color => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'color-btn' + (color === selectedColor ? ' selected' : '');
        btn.dataset.color = color;
        btn.style.background = color;
        btn.style.width = '1.8rem';
        btn.style.height = '1.8rem';
        btn.style.borderRadius = '50%';
        btn.style.border = color === selectedColor ? '3px solid #74408c' : '2px solid #b393c8';
        btn.onclick = function(e) {
          selectSubjectColor(color);
          hidePalettePopover();
          e.stopPropagation();
        };
        colorPaletteGrid.appendChild(btn);
      });
    }

    function selectSubjectColor(color) {
      subjectColor.value = color;
      subjectColorCarte.style.background = color;
    }

    function showPalettePopover() {
      renderColorPalettePopover(currentPalette, subjectColor.value);
      const rect = subjectColorCarte.getBoundingClientRect();
      colorPalettePopover.style.display = 'block';
      colorPalettePopover.style.left = (rect.right + window.scrollX + 10) + 'px';
      colorPalettePopover.style.top = (rect.top + window.scrollY - 10) + 'px';
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutsidePalette, { once: true });
      }, 0);
    }

    function hidePalettePopover() {
      colorPalettePopover.style.display = 'none';
    }

    function handleClickOutsidePalette(e) {
      if (!colorPalettePopover.contains(e.target) && e.target !== subjectColorCarte) {
        hidePalettePopover();
      }
    }

    subjectColorCarte.addEventListener('click', function(e) {
      showPalettePopover();
      e.stopPropagation();
    });

    subjectColorType.addEventListener('change', function() {
      if (subjectColorType.value === 'calido') {
        currentPalette = PALETTE_CALIDO;
        selectSubjectColor(PALETTE_CALIDO[0]);
      } else {
        currentPalette = PALETTE_FRIO;
        selectSubjectColor(PALETTE_FRIO[0]);
      }
    });

    // --- Materias en localStorage ---
    function getMaterias() {
        try {
            const data = JSON.parse(localStorage.getItem('materias_list_v1'));
            if (!Array.isArray(data)) return [];
            return data;
        } catch {
            return [];
        }
    }
    function saveMaterias(arr) {
        localStorage.setItem('materias_list_v1', JSON.stringify(arr));
    }
    let materias = getMaterias();

    const materiasListContainer = document.getElementById('materiasListContainer');
    const mainSearch = document.getElementById('mainSearch');

    function renderMateriasList() {
        let q = mainSearch.value.trim().toLowerCase();
        let filtered = q
            ? materias.filter(m => (m.name || '').toLowerCase().includes(q) || (m.desc || '').toLowerCase().includes(q))
            : materias;
        if (filtered.length === 0) {
            materiasListContainer.innerHTML = '<div style="text-align:center;color:#b393c8;font-size:1.1em;margin-top:2em;">No hay materias</div>';
            return;
        }
        materiasListContainer.innerHTML = '';
        filtered.forEach((m, idx) => {
            const div = document.createElement('div');
            div.className = 'materia-item';
            div.innerHTML = `
                <div class="materia-label" style="background:${m.color||'#cfd0db'}">${escapeHtml(m.name||'')}</div>
                <button class="materia-delete-btn" aria-label="Eliminar materia" data-del="${idx}">
                    <span class="material-icons">delete</span>
                </button>
            `;
            materiasListContainer.appendChild(div);
        });
    }
    function escapeHtml(str) {
        return String(str).replace(/[<>&"]/g, function(c) {
            return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];
        });
    }

    // Eliminar materia
    materiasListContainer.onclick = function(e) {
        const del = e.target.closest('.materia-delete-btn');
        if (del) {
            const idx = +del.getAttribute('data-del');
            if (confirm('¿Eliminar esta materia?')) {
                materias.splice(idx, 1);
                saveMaterias(materias);
                renderMateriasList();
                showToast('Materia eliminada', 'success');
            }
        }
    };

    // Buscar materias
    mainSearch.addEventListener('input', renderMateriasList);

    // Añadir materia usando el nuevo modal y color
    const addMateriaBtn = document.getElementById('addMateriaBtn');
    const modalCreateSubject = document.getElementById('modalCreateSubject');
    const bsModalCreateSubject = new bootstrap.Modal(modalCreateSubject);
    const subjectName = document.getElementById('subjectName');
    const subjectDesc = document.getElementById('subjectDesc');
    const modalSubjectSaveBtn = document.getElementById('modalSubjectSaveBtn');

    addMateriaBtn.onclick = function() {
        subjectName.value = '';
        subjectDesc.value = '';
        subjectColorType.value = '';
        currentPalette = PALETTE_FRIO;
        selectSubjectColor(PALETTE_FRIO[0]);
        bsModalCreateSubject.show();
    };

    modalSubjectSaveBtn.onclick = function() {
        const name = subjectName.value.trim();
        const desc = subjectDesc.value.trim();
        const color = subjectColor.value;
        if (!name) {
            subjectName.focus();
            return;
        }
        const idx = materias.findIndex(m => m.name === name);
        if (idx !== -1) {
            // Editar materia existente
            materias[idx] = { name, desc, color };
            showToast('Materia editada', 'info');
        } else {
            // Nueva materia
            materias.push({ name, desc, color });
            showToast('Materia creada', 'success');
        }
        saveMaterias(materias);
        renderMateriasList();
        bsModalCreateSubject.hide();
    };

    // --- Notas en localStorage (para mostrar en modal de materia) ---
    function getNotas() {
        try {
            const data = JSON.parse(localStorage.getItem('notas'));
            if (!Array.isArray(data)) return [];
            return data;
        } catch {
            return [];
        }
    }

    // Mostrar modal con notas de la materia
    const modalViewSubjectNotes = document.getElementById('modalViewSubjectNotes');
    const modalViewSubjectNotesTitle = document.getElementById('modalViewSubjectNotesTitle');
    const modalViewSubjectNotesBody = document.getElementById('modalViewSubjectNotesBody');

    function showSubjectNotesModal(materia) {
        modalViewSubjectNotesTitle.textContent = `Notas de "${materia.name}"`;
        const notas = getNotas().filter(n => (n.materia || '').toLowerCase() === (materia.name || '').toLowerCase());
        if (notas.length === 0) {
            modalViewSubjectNotesBody.innerHTML = `<div class="text-muted text-center py-2">No hay notas para esta materia</div>`;
        } else {
            modalViewSubjectNotesBody.innerHTML = '<ul class="list-group mb-0">' +
                notas.map(n =>
                    `<li class="list-group-item">
                        <div style="font-weight:600;">${escapeHtml(n.titulo)}</div>
                        <div style="font-size:0.97em;color:#74408c;">${escapeHtml(n.fecha || '')}</div>
                        <div style="font-size:0.98em;color:#222;">${escapeHtml(n.nota || '')}</div>
                    </li>`
                ).join('') +
                '</ul>';
        }
        const bsModal = bootstrap.Modal.getOrCreateInstance(modalViewSubjectNotes);
        bsModal.show();
    }

    // Al hacer click en una materia, mostrar sus notas
    materiasListContainer.onclick = function(e) {
        const del = e.target.closest('.materia-delete-btn');
        if (del) {
            const idx = +del.getAttribute('data-del');
            if (confirm('¿Eliminar esta materia?')) {
                materias.splice(idx, 1);
                saveMaterias(materias);
                renderMateriasList();
                showToast('Materia eliminada', 'success');
            }
            return;
        }
        const item = e.target.closest('.materia-item');
        if (item) {
            const idx = Array.from(materiasListContainer.children).indexOf(item);
            if (idx >= 0 && materias[idx]) {
                showSubjectNotesModal(materias[idx]);
            }
        }
    };

    // Sincroniza entre pestañas
    window.addEventListener('storage', function(e) {
        if (e.key === 'materias_list_v1') {
            materias = getMaterias();
            renderMateriasList();
        }
    });

    // Toasts
    function showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toastContainer') || createToastContainer();
        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-bg-${type} border-0`;
        toast.role = 'alert';
        toast.style = 'position:fixed;top:20px;right:20px;min-width:200px;z-index:1050;';
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `;
        toastContainer.appendChild(toast);
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    function createToastContainer() {
        const container = document.createElement('div');
        container.id = 'toastContainer';
        container.ariaLive = 'polite';
        container.ariaAtomic = 'true';
        container.style = 'position:fixed;top:20px;right:20px;pointer-events:none;';
        document.body.appendChild(container);
        return container;
    }

    // --- Menú Lateral ---
    const sideMenu = document.getElementById('sideMenu');
    const sideMenuOverlay = document.getElementById('sideMenuOverlay');
    const openSideMenuBtn = document.getElementById('openSideMenuBtn');
    const closeSideMenuBtn = document.getElementById('closeSideMenu');

    // Asegura que el menú y overlay estén cerrados al cargar
    sideMenu.style.display = 'none';
    sideMenuOverlay.style.display = 'none';
    sideMenu.classList.remove('open');

    openSideMenuBtn.onclick = function() {
        sideMenu.style.display = 'block';
        setTimeout(() => {
            sideMenu.classList.add('open');
            sideMenuOverlay.style.display = 'block';
        }, 10);
    };

    closeSideMenuBtn.onclick = function() {
        sideMenu.classList.remove('open');
        sideMenuOverlay.style.display = 'none';
        setTimeout(() => {
            sideMenu.style.display = 'none';
        }, 300);
    };

    sideMenuOverlay.onclick = closeSideMenuBtn.onclick;

    // Inicialización
    renderMateriasList();
