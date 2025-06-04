// --- Menú lateral igual que en panel.js ---
document.addEventListener('DOMContentLoaded', function() {
    // ...menú lateral...
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

    // --- Tabs de estadísticas ---
    const tabs = document.querySelectorAll('.estadisticas-tab');
    const seccionBarras = document.getElementById('estadisticasBarras');
    const seccionDonut = document.getElementById('estadisticasDonut');
    const seccionHoras = document.getElementById('estadisticasHoras');

    // Solo continuar si existen las secciones y tabs
    if (tabs.length && seccionBarras && seccionDonut && seccionHoras) {
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                // Mostrar solo la sección correspondiente
                if (tab.dataset.tab === 'tareas') {
                    seccionBarras.style.display = '';
                    seccionDonut.style.display = 'none';
                    seccionHoras.style.display = 'none';
                } else if (tab.dataset.tab === 'eficiencia') {
                    seccionBarras.style.display = 'none';
                    seccionDonut.style.display = '';
                    seccionHoras.style.display = 'none';
                } else if (tab.dataset.tab === 'productividad') {
                    seccionBarras.style.display = 'none';
                    seccionDonut.style.display = 'none';
                    seccionHoras.style.display = '';
                }
            });
        });
        // Mostrar la pestaña activa según el HTML al cargar
        let activeTab = Array.from(tabs).find(t => t.classList.contains('active'));
        if (!activeTab) activeTab = tabs[0];
        activeTab.click();
    }
});
