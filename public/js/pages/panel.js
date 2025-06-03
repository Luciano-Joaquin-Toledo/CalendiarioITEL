document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.btn-fab').addEventListener('click', function() {
        // Se quita el alert como indica el requerimiento
    });

    // Menú lateral
    const openMenu = document.getElementById('open-menu');
    const sideMenu = document.getElementById('sideMenu');
    const overlay = document.getElementById('sideMenuOverlay');

    openMenu.addEventListener('click', function() {
        sideMenu.classList.add('active');
        overlay.classList.add('active');
    });

    overlay.addEventListener('click', function() {
        sideMenu.classList.remove('active');
        overlay.classList.remove('active');
    });

    const closeBtn = document.getElementById('sideMenuClose');
    closeBtn.addEventListener('click', function() {
        sideMenu.classList.remove('active');
        overlay.classList.remove('active');
    });

    // FAB menú flotante
    const fabBtn = document.getElementById('open-fab-menu');
    const fabMenu = document.getElementById('fabMenu');
    const fabOverlay = document.getElementById('fabMenuOverlay');
    const fabBtnIcon = fabBtn.querySelector('i');

    fabBtn.addEventListener('click', function(e) {
        e.preventDefault();
        fabMenu.classList.add('active');
        fabOverlay.classList.add('active');
        fabBtnIcon.classList.remove('fa-plus');
        fabBtnIcon.classList.add('fa-times');
    });

    function closeFabMenu() {
        fabMenu.classList.remove('active');
        fabOverlay.classList.remove('active');
        fabBtnIcon.classList.remove('fa-times');
        fabBtnIcon.classList.add('fa-plus');
    }

    fabOverlay.addEventListener('click', closeFabMenu);

    // Modal de nota
    const notaModal = document.getElementById('notaModal');
    const notaModalOverlay = document.getElementById('notaModalOverlay');
    const notaModalClose = document.getElementById('notaModalClose');
    const notaModalTitle = document.getElementById('notaModalTitle');
    const notaModalBody = document.getElementById('notaModalBody');

    document.querySelectorAll('.nota').forEach(function(nota) {
        nota.addEventListener('click', function(e) {
            e.stopPropagation();
            // Quitar selección previa
            document.querySelectorAll('.nota.selected').forEach(function(n) {
                n.classList.remove('selected');
            });
            // Marcar la nota actual
            nota.classList.add('selected');
            notaModalTitle.textContent = nota.getAttribute('data-title') || nota.textContent;
            notaModalBody.textContent = nota.getAttribute('data-content') || 'Sin contenido';
            notaModal.classList.add('active');
            notaModalOverlay.classList.add('active');
        });
    });

    function closeNotaModal() {
        notaModal.classList.remove('active');
        notaModalOverlay.classList.remove('active');
        // Quitar selección al cerrar el modal
        document.querySelectorAll('.nota.selected').forEach(function(n) {
            n.classList.remove('selected');
        });
    }

    notaModalClose.addEventListener('click', closeNotaModal);
    notaModalOverlay.addEventListener('click', closeNotaModal);

    // Modal Crear Materia
    const materiaModal = document.getElementById('materiaModal');
    const materiaModalOverlay = document.getElementById('materiaModalOverlay');
    const materiaModalClose = document.getElementById('materiaModalClose');
    const openMateriaModal = document.getElementById('openMateriaModal');
    const materiaCancelBtn = document.querySelector('.materia-btn-cancel');

    // Solo abre el modal cuando se hace click en el botón
    openMateriaModal.addEventListener('click', function(e) {
        e.preventDefault();
        materiaModal.classList.add('active');
        materiaModalOverlay.classList.add('active');
    });

    function closeMateriaModal() {
        materiaModal.classList.remove('active');
        materiaModalOverlay.classList.remove('active');
    }

    materiaModalClose.addEventListener('click', closeMateriaModal);
    materiaModalOverlay.addEventListener('click', closeMateriaModal);
    if (materiaCancelBtn) materiaCancelBtn.addEventListener('click', closeMateriaModal);

    // Modal Crear Tarea
    const tareaModal = document.getElementById('tareaModal');
    const tareaModalOverlay = document.getElementById('tareaModalOverlay');
    const tareaModalClose = document.getElementById('tareaModalClose');
    // Asume que tienes un botón con id="openTareaModal" para abrir el modal
    const openTareaModal = document.getElementById('openTareaModal');
    const tareaCancelBtn = document.querySelector('.tarea-btn-cancel');

    if (openTareaModal) {
        openTareaModal.addEventListener('click', function(e) {
            e.preventDefault();
            tareaModal.classList.add('active');
            tareaModalOverlay.classList.add('active');
        });
    }

    function closeTareaModal() {
        tareaModal.classList.remove('active');
        tareaModalOverlay.classList.remove('active');
    }

    if (tareaModalClose) tareaModalClose.addEventListener('click', closeTareaModal);
    if (tareaModalOverlay) tareaModalOverlay.addEventListener('click', closeTareaModal);
    if (tareaCancelBtn) tareaCancelBtn.addEventListener('click', closeTareaModal);

    // Modal Crear Nota
    const crearNotaModal = document.getElementById('crearNotaModal');
    const crearNotaModalOverlay = document.getElementById('crearNotaModalOverlay');
    const crearNotaModalClose = document.getElementById('crearNotaModalClose');
    const openCrearNotaModal = document.getElementById('openCrearNotaModal');
    const crearNotaCancelBtn = document.querySelector('.crear-nota-btn-cancel');

    if (openCrearNotaModal) {
        openCrearNotaModal.addEventListener('click', function(e) {
            e.preventDefault();
            crearNotaModal.classList.add('active');
            crearNotaModalOverlay.classList.add('active');
        });
    }

    function closeCrearNotaModal() {
        crearNotaModal.classList.remove('active');
        crearNotaModalOverlay.classList.remove('active');
    }

    if (crearNotaModalClose) crearNotaModalClose.addEventListener('click', closeCrearNotaModal);
    if (crearNotaModalOverlay) crearNotaModalOverlay.addEventListener('click', closeCrearNotaModal);
    if (crearNotaCancelBtn) crearNotaCancelBtn.addEventListener('click', closeCrearNotaModal);

    // Paleta de colores para "Frío" y "Cálido"
    const colorTypeSelect = document.querySelector('.materia-color-type');
    const colorPalettePopup = document.getElementById('colorPalettePopup');
    const colorPickerHidden = document.getElementById('materiaColorPicker');
    const showPaletteBtn = document.getElementById('showPaletteBtn');
    const paletteFrio = colorPalettePopup.querySelector('.palette-frio');
    const paletteCalido = colorPalettePopup.querySelector('.palette-calido');

    function showOrHidePalette() {
        if (colorTypeSelect.value === 'frio') {
            showPaletteBtn.style.display = 'inline-block';
            paletteFrio.style.display = 'block';
            paletteCalido.style.display = 'none';
        } else if (colorTypeSelect.value === 'calido') {
            showPaletteBtn.style.display = 'inline-block';
            paletteFrio.style.display = 'none';
            paletteCalido.style.display = 'block';
        } else {
            showPaletteBtn.style.display = 'none';
            colorPalettePopup.style.display = 'none';
        }
    }

    colorTypeSelect.addEventListener('change', showOrHidePalette);

    // Inicializa el estado al cargar
    showOrHidePalette();

    // Mostrar/ocultar paleta al tocar el círculo
    showPaletteBtn.addEventListener('click', function() {
        if (colorPalettePopup.style.display === 'block') {
            colorPalettePopup.style.display = 'none';
        } else {
            colorPalettePopup.style.display = 'block';
        }
    });

    // Selección de color de la paleta (ambas paletas)
    colorPalettePopup.querySelectorAll('.color-palette-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            colorPalettePopup.querySelectorAll('.color-palette-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            colorPickerHidden.value = btn.getAttribute('data-color');
            showPaletteBtn.style.background = btn.getAttribute('data-color');
            colorPalettePopup.style.display = 'none';
        });
    });

    // Al cargar, marca el color inicial como seleccionado
    (function selectInitialColor() {
        const val = colorPickerHidden.value;
        showPaletteBtn.style.background = val;
        colorPalettePopup.querySelectorAll('.color-palette-btn').forEach(function(btn) {
            if (btn.getAttribute('data-color').toLowerCase() === val.toLowerCase()) {
                btn.classList.add('selected');
            }
        });
    })();

    // Paleta de colores para Tarea (igual que materia, con frío/cálido)
    const tareaColorTypeSelect = document.getElementById('tareaColorType');
    const tareaColorPalettePopup = document.getElementById('tareaColorPalettePopup');
    const tareaColorPickerHidden = document.getElementById('tareaColorPicker');
    const showTareaPaletteBtn = document.getElementById('showTareaPaletteBtn');
    const tareaPaletteFrio = tareaColorPalettePopup.querySelector('.tarea-palette-frio');
    const tareaPaletteCalido = tareaColorPalettePopup.querySelector('.tarea-palette-calido');

    function showOrHideTareaPalette() {
        if (tareaColorTypeSelect.value === 'frio') {
            showTareaPaletteBtn.style.display = 'inline-block';
            tareaPaletteFrio.style.display = 'block';
            tareaPaletteCalido.style.display = 'none';
        } else if (tareaColorTypeSelect.value === 'calido') {
            showTareaPaletteBtn.style.display = 'inline-block';
            tareaPaletteFrio.style.display = 'none';
            tareaPaletteCalido.style.display = 'block';
        } else {
            showTareaPaletteBtn.style.display = 'none';
            tareaColorPalettePopup.style.display = 'none';
        }
    }

    tareaColorTypeSelect.addEventListener('change', showOrHideTareaPalette);
    showOrHideTareaPalette();

    showTareaPaletteBtn.addEventListener('click', function() {
        if (tareaColorPalettePopup.style.display === 'block') {
            tareaColorPalettePopup.style.display = 'none';
        } else {
            tareaColorPalettePopup.style.display = 'block';
        }
    });

    tareaColorPalettePopup.querySelectorAll('.tarea-color-palette-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            tareaColorPalettePopup.querySelectorAll('.tarea-color-palette-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            tareaColorPickerHidden.value = btn.getAttribute('data-color');
            showTareaPaletteBtn.style.background = btn.getAttribute('data-color');
            tareaColorPalettePopup.style.display = 'none';
        });
    });

    // Al cargar, marca el color inicial como seleccionado
    (function selectInitialTareaColor() {
        const val = tareaColorPickerHidden.value;
        showTareaPaletteBtn.style.background = val;
        tareaColorPalettePopup.querySelectorAll('.tarea-color-palette-btn').forEach(function(btn) {
            if (btn.getAttribute('data-color').toLowerCase() === val.toLowerCase()) {
                btn.classList.add('selected');
            }
        });
    })();
});