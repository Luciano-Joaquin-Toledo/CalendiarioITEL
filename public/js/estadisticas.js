// --- Menú Lateral ---
const sideMenu = document.getElementById("sideMenu");
const sideMenuOverlay = document.getElementById("sideMenuOverlay");
const openSideMenuBtn = document.getElementById("openSideMenuBtn");
const closeSideMenuBtn = document.getElementById("closeSideMenu");

// Asegura que el menú y overlay estén cerrados al cargar
sideMenu.style.display = "none";
sideMenuOverlay.style.display = "none";
sideMenu.classList.remove("open");

openSideMenuBtn.onclick = function () {
  sideMenu.style.display = "block";
  setTimeout(() => {
    sideMenu.classList.add("open");
    sideMenuOverlay.style.display = "block";
  }, 10);
};

closeSideMenuBtn.onclick = function () {
  sideMenu.classList.remove("open");
  sideMenuOverlay.style.display = "none";
  setTimeout(() => {
    sideMenu.style.display = "none";
  }, 300);
};

sideMenuOverlay.onclick = closeSideMenuBtn.onclick;

// --- Tabs dinámicos ---
const tabTareas = document.getElementById("tabTareas");
const tabEficiencia = document.getElementById("tabEficiencia");
const tabProductividad = document.getElementById("tabProductividad");
const estadisticasTabContent = document.getElementById(
  "estadisticasTabContent"
);

// Limpia gráficos previos para evitar errores de Chart.js
let chartInstance = null;
function destroyChart() {
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
}

function setTab(tab) {
  // Reset estilos
  [tabTareas, tabEficiencia, tabProductividad].forEach((btn) => {
    btn.classList.remove("selected");
    btn.style.background = "#e3d3f2";
    btn.style.color = "#74408c";
  });
  destroyChart();

  if (tab === "tareas") {
    tabTareas.classList.add("selected");
    tabTareas.style.background = "#8d5bbd";
    tabTareas.style.color = "#fff";
    estadisticasTabContent.innerHTML = `
                <div style="display:flex;gap:0.7em;margin-bottom:1.1em;">
                    <button style="background:#e3e3ee;color:#222;border:none;border-radius:14px 0 0 14px;padding:0.3em 1.2em;font-size:1.08em;font-weight:600;box-shadow:0 2px 8px 0 rgba(116,64,140,0.10);">LUNES</button>
                    <button style="background:#e3e3ee;color:#74408c;border:none;border-radius:0 14px 14px 0;padding:0.3em 1.2em;font-size:1.08em;font-weight:500;box-shadow:0 2px 8px 0 rgba(116,64,140,0.10);">Filtro</button>
                    <button style="background:#e3e3ee;border:none;border-radius:50%;width:38px;height:38px;display:flex;align-items:center;justify-content:center;margin-left:auto;">
                        <span class="material-icons" style="color:#74408c;font-size:1.5em;">tune</span>
                    </button>
                </div>
                <div style="display:flex;justify-content:center;margin-bottom:1.2em;">
                    <canvas id="tareasDoughnut" width="160" height="160"></canvas>
                </div>
                <div style="display:flex;flex-direction:column;gap:0.7em;">
                    <div style="display:flex;align-items:center;gap:0.7em;background:#cfd0db;border-radius:16px;padding:0.7em 1.1em;">
                        <span style="display:inline-block;width:18px;height:18px;border-radius:50%;background:#b393c8;"></span>
                        <span style="font-size:1.04em;color:#222;font-weight:500;">Tareas realizadas</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:0.7em;background:#cfd0db;border-radius:16px;padding:0.7em 1.1em;">
                        <span style="display:inline-block;width:18px;height:18px;border-radius:50%;background:#74408c;"></span>
                        <span style="font-size:1.04em;color:#222;font-weight:500;">Tareas pendientes</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:0.7em;background:#cfd0db;border-radius:16px;padding:0.7em 1.1em;">
                        <span style="display:inline-block;width:18px;height:18px;border-radius:50%;background:#4a3257;"></span>
                        <span style="font-size:1.04em;color:#222;font-weight:500;">Tareas no realizadas</span>
                    </div>
                </div>
            `;
    setTimeout(() => {
      const ctx = document.getElementById("tareasDoughnut").getContext("2d");
      chartInstance = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Realizadas", "Pendientes", "No realizadas"],
          datasets: [
            {
              data: [7, 3, 5],
              backgroundColor: ["#b393c8", "#74408c", "#4a3257"],
              borderWidth: 0,
            },
          ],
        },
        options: {
          cutout: "60%",
          plugins: { legend: { display: false } },
        },
      });
    }, 10);
  } else if (tab === "eficiencia") {
    tabEficiencia.classList.add("selected");
    tabEficiencia.style.background = "#8d5bbd";
    tabEficiencia.style.color = "#fff";
    estadisticasTabContent.innerHTML = `
                <div style="display:flex;gap:0.7em;margin-bottom:1.1em;">
                    <button style="background:#e3e3ee;color:#222;border:none;border-radius:14px 0 0 14px;padding:0.3em 1.2em;font-size:1.08em;font-weight:600;box-shadow:0 2px 8px 0 rgba(116,64,140,0.10);">VIERNES</button>
                    <button style="background:#e3e3ee;color:#74408c;border:none;border-radius:0 14px 14px 0;padding:0.3em 1.2em;font-size:1.08em;font-weight:500;box-shadow:0 2px 8px 0 rgba(116,64,140,0.10);">Filtro</button>
                    <button style="background:#e3e3ee;border:none;border-radius:50%;width:38px;height:38px;display:flex;align-items:center;justify-content:center;margin-left:auto;">
                        <span class="material-icons" style="color:#74408c;font-size:1.5em;">tune</span>
                    </button>
                </div>
                <div style="display:flex;justify-content:center;margin-bottom:1.2em;position:relative;">
                    <canvas id="eficienciaDoughnut" width="160" height="160"></canvas>
                    <span id="eficienciaPorcentaje" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-size:2.1em;font-weight:700;color:#4a3257;">70%</span>
                </div>
                <div style="display:flex;flex-direction:column;gap:0.5em;margin-bottom:1.2em;">
                    <div style="display:flex;align-items:center;gap:0.7em;">
                        <input type="checkbox" checked style="accent-color:#8d5bbd;width:1.1em;height:1.1em;">
                        <span style="background:#e3d3f2;color:#74408c;border-radius:12px;padding:0.18em 1.1em;font-weight:500;">Nota 1</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:0.7em;">
                        <input type="checkbox" checked style="accent-color:#8d5bbd;width:1.1em;height:1.1em;">
                        <span style="background:#e3d3f2;color:#74408c;border-radius:12px;padding:0.18em 1.1em;font-weight:500;">Nota 2</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:0.7em;">
                        <input type="checkbox" checked style="accent-color:#8d5bbd;width:1.1em;height:1.1em;">
                        <span style="background:#e3d3f2;color:#74408c;border-radius:12px;padding:0.18em 1.1em;font-weight:500;">Nota 3</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:0.7em;">
                        <input type="checkbox" style="accent-color:#8d5bbd;width:1.1em;height:1.1em;">
                        <span style="background:#e3d3f2;color:#74408c;border-radius:12px;padding:0.18em 1.1em;font-weight:500;">Nota 4</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:0.7em;">
                        <input type="checkbox" style="accent-color:#8d5bbd;width:1.1em;height:1.1em;">
                        <span style="background:#e3d3f2;color:#74408c;border-radius:12px;padding:0.18em 1.1em;font-weight:500;">Nota 5</span>
                    </div>
                </div>
                <div style="border-bottom:1px solid #bbb;margin-bottom:0.7em;"></div>
                <div style="font-size:1.08em;font-weight:600;color:#222;margin-bottom:0.7em;">Cantidad de horas</div>
                <div style="display:flex;flex-direction:column;gap:0.5em;">
                    <div style="display:flex;align-items:center;">
                        <span style="width:60px;color:#74408c;font-size:0.98em;">Nota 1</span>
                        <div style="height:16px;background:#b393c8;border-radius:8px;width:40%;"></div>
                    </div>
                    <div style="display:flex;align-items:center;">
                        <span style="width:60px;color:#74408c;font-size:0.98em;">Nota 2</span>
                        <div style="height:16px;background:#8d5bbd;border-radius:8px;width:25%;"></div>
                    </div>
                    <div style="display:flex;align-items:center;">
                        <span style="width:60px;color:#74408c;font-size:0.98em;">Nota 3</span>
                        <div style="height:16px;background:#4a3257;border-radius:8px;width:70%;"></div>
                    </div>
                    <div style="display:flex;align-items:center;">
                        <span style="width:60px;color:#74408c;font-size:0.98em;">Nota 4</span>
                        <div style="height:16px;background:#b393c8;border-radius:8px;width:30%;"></div>
                    </div>
                    <div style="display:flex;align-items:center;">
                        <span style="width:60px;color:#74408c;font-size:0.98em;">Nota 5</span>
                        <div style="height:16px;background:#b393c8;border-radius:8px;width:50%;"></div>
                    </div>
                </div>
                <div style="display:flex;justify-content:space-between;font-size:0.97em;color:#888;margin-top:0.5em;">
                    <span>1hr</span><span>2hrs</span><span>3hrs</span><span>4hrs</span>
                </div>
            `;
    setTimeout(() => {
      const ctx = document
        .getElementById("eficienciaDoughnut")
        .getContext("2d");
      chartInstance = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Completado", "Pendiente"],
          datasets: [
            {
              data: [70, 30],
              backgroundColor: ["#8d5bbd", "#e3d3f2"],
              borderWidth: 0,
            },
          ],
        },
        options: {
          cutout: "70%",
          plugins: { legend: { display: false } },
        },
      });
    }, 10);
  } else if (tab === "productividad") {
    tabProductividad.classList.add("selected");
    tabProductividad.style.background = "#8d5bbd";
    tabProductividad.style.color = "#fff";
    estadisticasTabContent.innerHTML = `
                
                <div style="display:flex;justify-content:space-between;align-items:end;height:140px;margin-bottom:0.7em;">
                    <div style="display:flex;flex-direction:column;align-items:center;width:60px;">
                        <span style="margin-bottom:0.5em;font-size:1.08em;color:#222;">Día 1</span>
                        <div style="width:38px;height:70px;background:#b393c8;border-radius:8px;"></div>
                    </div>
                    <div style="display:flex;flex-direction:column;align-items:center;width:60px;">
                        <span style="margin-bottom:0.5em;font-size:1.08em;color:#222;">Día 2</span>
                        <div style="width:38px;height:50px;background:#8d5bbd;border-radius:8px;"></div>
                    </div>
                    <div style="display:flex;flex-direction:column;align-items:center;width:60px;">
                        <span style="margin-bottom:0.5em;font-size:1.08em;color:#222;">Día 3</span>
                        <div style="width:38px;height:110px;background:#4a3257;border-radius:8px;"></div>
                    </div>
                </div>
                <div style="margin-top:1.2em;">
                    <div style="display:flex;justify-content:space-between;align-items:center;font-size:1.04em;font-weight:500;color:#222;border-bottom:1px solid #bbb;padding-bottom:0.2em;margin-bottom:0.5em;">
                        <span>Cantidad</span>
                        <span>Día</span>
                    </div>
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5em;">
                        <span style="background:#e3d3f2;color:#74408c;border-radius:16px;padding:0.18em 1.1em;font-weight:600;min-width:36px;text-align:center;">6</span>
                        <span style="font-size:0.98em;color:#74408c;">Martes 25/05</span>
                    </div>
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5em;">
                        <span style="background:#e3d3f2;color:#74408c;border-radius:16px;padding:0.18em 1.1em;font-weight:600;min-width:36px;text-align:center;">1</span>
                        <span style="font-size:0.98em;color:#74408c;">Miércoles 26/05</span>
                    </div>
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <span style="background:#e3d3f2;color:#74408c;border-radius:16px;padding:0.18em 1.1em;font-weight:600;min-width:36px;text-align:center;">3</span>
                        <span style="font-size:0.98em;color:#74408c;">Jueves 27/05</span>
                    </div>
                </div>
            `;
  }
}

tabTareas.onclick = () => setTab("tareas");
tabEficiencia.onclick = () => setTab("eficiencia");
tabProductividad.onclick = () => setTab("productividad");

// Inicializa en "Tareas"
setTab("tareas");
