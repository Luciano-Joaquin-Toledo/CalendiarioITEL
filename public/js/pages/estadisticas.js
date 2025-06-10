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

    // --- Chart.js: Gráfico de barras de tareas ---
    const tareasBar = document.getElementById('tareasBarChart');
    if (tareasBar) {
        new Chart(tareasBar, {
            type: 'bar',
            data: {
                labels: ['Día 1', 'Día 2', 'Día 3'],
                datasets: [{
                    label: 'Tareas completadas',
                    data: [6, 1, 3],
                    backgroundColor: ['#b9a5e2', '#8e44ad', '#4e2e8e'],
                    borderRadius: 16,
                    borderSkipped: false,
                    barPercentage: 0.6,
                    categoryPercentage: 0.7
                }]
            },
            options: {
                responsive: true,
                animation: { duration: 900, easing: 'easeOutQuart' },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#b9a5e2',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: '#8e44ad',
                        borderWidth: 1,
                        cornerRadius: 10,
                        padding: 12
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { color: '#4e2e8e', font: { weight: 600 } }
                    },
                    y: {
                        beginAtZero: true,
                        grid: { color: '#ede7f6' },
                        ticks: { stepSize: 1, color: '#8e44ad' }
                    }
                }
            }
        });
    }

    // --- Chart.js: Donut de eficiencia ---
    const eficienciaDonut = document.getElementById('eficienciaDonutChart');
    if (eficienciaDonut) {
        new Chart(eficienciaDonut, {
            type: 'doughnut',
            data: {
                labels: ['Realizadas', 'Pendientes', 'No realizadas'],
                datasets: [{
                    data: [4, 3, 3],
                    backgroundColor: ['#b9a5e2', '#8e44ad', '#4e2e8e'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                animation: { duration: 900, easing: 'easeOutQuart' },
                cutout: '70%',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#b9a5e2',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: '#8e44ad',
                        borderWidth: 1,
                        cornerRadius: 10,
                        padding: 12
                    }
                }
            }
        });
    }

    // --- Chart.js: Donut de productividad (solo para el 70%) ---
    const productividadDonut = document.getElementById('productividadDonutChart');
    if (productividadDonut) {
        new Chart(productividadDonut, {
            type: 'doughnut',
            data: {
                labels: ['Productividad', 'Restante'],
                datasets: [{
                    data: [70, 30],
                    backgroundColor: ['#8e44ad', '#ede7f6'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: false,
                animation: { duration: 900, easing: 'easeOutQuart' },
                cutout: '75%',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        enabled: false
                    }
                }
            }
        });
    }

    // --- Chart.js: Barras horizontales de productividad por nota ---
    const productividadBar = document.getElementById('productividadBarChart');
    if (productividadBar) {
        new Chart(productividadBar, {
            type: 'bar',
            data: {
                labels: ['Nota 1', 'Nota 2', 'Nota 3', 'Nota 4', 'Nota 5'],
                datasets: [{
                    label: 'Horas',
                    data: [1.6, 0.8, 2.4, 1.2, 3.2],
                    backgroundColor: [
                        '#b9a5e2', '#8e44ad', '#4e2e8e', '#b9a5e2', '#8e44ad'
                    ],
                    borderRadius: 12,
                    borderSkipped: false,
                    barPercentage: 0.7,
                    categoryPercentage: 0.7
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                animation: { duration: 900, easing: 'easeOutQuart' },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#b9a5e2',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: '#8e44ad',
                        borderWidth: 1,
                        cornerRadius: 10,
                        padding: 12
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 4,
                        grid: { color: '#ede7f6' },
                        ticks: { color: '#8e44ad' }
                    },
                    y: {
                        grid: { display: false },
                        ticks: { color: '#4e2e8e', font: { weight: 600 } }
                    }
                }
            }
        });
    }
});
