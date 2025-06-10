// FAB menu toggle
const fabBtn = document.getElementById("fabBtn");
const fabMenu = document.getElementById("fabMenu");
const fabIcon = document.getElementById("fabIcon");

fabBtn.addEventListener("click", function () {
  fabMenu.classList.toggle("show");
  fabIcon.textContent = fabMenu.classList.contains("show") ? "close" : "add";
});

document.addEventListener("click", function (e) {
  if (!fabBtn.contains(e.target) && !fabMenu.contains(e.target)) {
    fabMenu.classList.remove("show");
    fabIcon.textContent = "add";
  }
});

fabMenu.addEventListener("click", function (e) {
  e.stopPropagation();
});

// Side menu logic
const openSideMenuBtn = document.getElementById("openSideMenuBtn");
const sideMenu = document.getElementById("sideMenu");
const sideMenuOverlay = document.getElementById("sideMenuOverlay");
const closeSideMenu = document.getElementById("closeSideMenu");

openSideMenuBtn.addEventListener("click", function (e) {
  sideMenu.style.display = "flex";
  sideMenuOverlay.classList.add("show");
  setTimeout(() => {
    sideMenu.focus();
  }, 50);
});
function closeMenu() {
  sideMenu.style.display = "none";
  sideMenuOverlay.classList.remove("show");
}
closeSideMenu.addEventListener("click", closeMenu);
sideMenuOverlay.addEventListener("click", closeMenu);
// Cerrar con ESC
sideMenu.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeMenu();
});

// Modal Crear Nota con Bootstrap
const modalCreateNote = document.getElementById("modalCreateNote");
const bsModalCreateNote = new bootstrap.Modal(modalCreateNote);
const modalTitle = document.getElementById("modalTitle");
const modalMateria = document.getElementById("modalMateria");
const modalNota = document.getElementById("modalNota");
const modalSaveBtn = document.getElementById("modalSaveBtn");
const modalSaveBtnText = document.getElementById("modalSaveBtnText");
const modalSaveSpinner = document.getElementById("modalSaveSpinner");

// Buscar el botón "Nota" por el ícono edit_note
const fabMenuNotaBtn = Array.from(
  document.querySelectorAll(".fab-menu-option")
).find((opt) =>
  Array.from(opt.querySelectorAll(".material-icons")).some(
    (icon) => icon.textContent.trim() === "edit_note"
  )
);

if (fabMenuNotaBtn) {
  fabMenuNotaBtn.addEventListener("click", function () {
    // Limpiar campos al abrir
    modalTitle.value = "";
    modalMateria.value = "";
    modalNota.value = "";
    bsModalCreateNote.show();
    fabMenu.classList.remove("show");
    fabIcon.textContent = "add";
  });
}

// UX: efecto de carga al guardar
modalSaveBtn.addEventListener("click", function () {
  modalSaveBtn.disabled = true;
  modalSaveBtnText.textContent = "Guardando...";
  modalSaveSpinner.style.display = "inline-block";
  setTimeout(() => {
    modalSaveBtn.disabled = false;
    modalSaveBtnText.textContent = "Guardar";
    modalSaveSpinner.style.display = "none";
    bsModalCreateNote.hide();
  }, 900);
});

// UX: feedback visual en focus
[modalTitle, modalNota].forEach((el) => {
  el.addEventListener("focus", function () {
    this.style.boxShadow = "0 0 0 2px #b393c8";
  });
  el.addEventListener("blur", function () {
    this.style.boxShadow = "";
  });
});

// Modal Crear Tarea con Bootstrap
const modalCreateTask = document.getElementById("modalCreateTask");
const bsModalCreateTask = new bootstrap.Modal(modalCreateTask);
const taskName = document.getElementById("taskName");
const taskDesc = document.getElementById("taskDesc");
const taskDate = document.getElementById("taskDate");
const taskTime = document.getElementById("taskTime");
const taskLocation = document.getElementById("taskLocation");
const taskColor = document.getElementById("taskColor");
const modalTaskSaveBtn = document.getElementById("modalTaskSaveBtn");
const modalTaskSaveBtnText = document.getElementById("modalTaskSaveBtnText");
const modalTaskSaveSpinner = document.getElementById("modalTaskSaveSpinner");

// Subtareas dinámicas (sin botón)
const subTasksContainer = document.getElementById("subTasksContainer");

function createSubTaskInput(value = "") {
  const wrapper = document.createElement("div");
  wrapper.className = "input-group mb-2 subtarea-row";

  const input = document.createElement("input");
  input.type = "text";
  input.className = "form-control";
  input.placeholder = "Sub tarea...";
  input.value = value;
  input.style.borderRadius = "10px 0 0 10px";
  input.style.border = "1.5px solid #cfd0db";
  input.style.background = "#fff";
  input.style.color = "#222";
  input.style.fontSize = "1.04rem";

  const btnRemove = document.createElement("button");
  btnRemove.type = "button";
  btnRemove.className = "btn btn-outline-secondary";
  btnRemove.innerHTML =
    '<span class="material-icons" style="font-size:1.2rem;">close</span>';
  btnRemove.style.borderRadius = "0 10px 10px 0";
  btnRemove.style.border = "1.5px solid #cfd0db";
  btnRemove.style.background = "#fff";
  btnRemove.style.color = "#74408c";
  btnRemove.style.display = "flex";
  btnRemove.style.alignItems = "center";
  btnRemove.style.justifyContent = "center";

  btnRemove.onclick = function () {
    if (subTasksContainer.childElementCount > 1) {
      wrapper.remove();
    } else {
      input.value = "";
    }
  };

  input.addEventListener("input", function () {
    // Si es el último input y escriben, agrega otro
    const allInputs = subTasksContainer.querySelectorAll("input");
    if (
      allInputs[allInputs.length - 1] === input &&
      input.value.trim() !== ""
    ) {
      addSubTaskInput();
    }
  });

  wrapper.appendChild(input);
  wrapper.appendChild(btnRemove);
  return wrapper;
}

function addSubTaskInput(value = "") {
  subTasksContainer.appendChild(createSubTaskInput(value));
}

function resetSubTasks() {
  subTasksContainer.innerHTML = "";
  addSubTaskInput();
}

// Buscar el botón "Tarea" por el ícono assignment
const fabMenuTaskBtn = Array.from(
  document.querySelectorAll(".fab-menu-option")
).find((opt) =>
  Array.from(opt.querySelectorAll(".material-icons")).some(
    (icon) => icon.textContent.trim() === "assignment"
  )
);

if (fabMenuTaskBtn) {
  fabMenuTaskBtn.addEventListener("click", function () {
    // Limpiar campos al abrir
    taskName.value = "";
    taskDesc.value = "";
    taskDate.value = "";
    taskTime.value = "";
    taskLocation.value = "";
    taskColor.value = "#cfd0db";
    resetSubTasks();
    bsModalCreateTask.show();
    fabMenu.classList.remove("show");
    fabIcon.textContent = "add";
  });
}

// UX: efecto de carga al guardar
modalTaskSaveBtn.addEventListener("click", function () {
  modalTaskSaveBtn.disabled = true;
  modalTaskSaveBtnText.textContent = "Guardando...";
  modalTaskSaveSpinner.style.display = "inline-block";
  setTimeout(() => {
    modalTaskSaveBtn.disabled = false;
    modalTaskSaveBtnText.textContent = "Guardar";
    modalTaskSaveSpinner.style.display = "none";
    bsModalCreateTask.hide();
  }, 900);
});

// UX: feedback visual en focus
[taskName, taskDesc, taskDate, taskTime, taskLocation].forEach((el) => {
  el.addEventListener("focus", function () {
    this.style.boxShadow = "0 0 0 2px #b393c8";
  });
  el.addEventListener("blur", function () {
    this.style.boxShadow = "";
  });
});

// Modal Crear Materia con Bootstrap
const modalCreateSubject = document.getElementById("modalCreateSubject");
const bsModalCreateSubject = new bootstrap.Modal(modalCreateSubject);
const subjectName = document.getElementById("subjectName");
const subjectDesc = document.getElementById("subjectDesc");
// Eliminado subjectImg y subjectLocation
const subjectColorType = document.getElementById("subjectColorType");
const subjectColor = document.getElementById("subjectColor");
const modalSubjectSaveBtn = document.getElementById("modalSubjectSaveBtn");

// Paletas de colores (de tus imágenes)
const PALETTE_FRIO = [
  "#c7d6fa",
  "#a7c7f7",
  "#7eb6f6",
  "#b39ddb",
  "#d180e8",
  "#f062c2",
  "#7986cb",
  "#5c6bc0",
  "#64b5f6",
  "#4caf50",
  "#7e57c2",
  "#5e35b1",
  "#304ffe",
  "#4f868e",
  "#39796b",
];
const PALETTE_CALIDO = [
  "#ffe082",
  "#ffe066",
  "#ffd54f",
  "#ffc300",
  "#ffb347",
  "#ff9800",
  "#ff7043",
  "#ff5252",
  "#e53935",
  "#b71c1c",
  "#a0522d",
  "#a67c52",
  "#bdb76b",
  "#8bc34a",
  "#789262",
];

let currentPalette = PALETTE_FRIO;

function renderColorPalettePopover(palette, selectedColor) {
  colorPaletteGrid.innerHTML = "";
  palette.forEach((color) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "color-btn" + (color === selectedColor ? " selected" : "");
    btn.dataset.color = color;
    btn.style.background = color;
    btn.onclick = function (e) {
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
  // Posicionar popover al lado del círculo
  const rect = subjectColorCarte.getBoundingClientRect();
  colorPalettePopover.style.display = "block";
  colorPalettePopover.style.left = rect.right + window.scrollX + 10 + "px";
  colorPalettePopover.style.top = rect.top + window.scrollY - 10 + "px";
  setTimeout(() => {
    document.addEventListener("mousedown", handleClickOutsidePalette, {
      once: true,
    });
  }, 0);
}

function hidePalettePopover() {
  colorPalettePopover.style.display = "none";
}

function handleClickOutsidePalette(e) {
  if (
    !colorPalettePopover.contains(e.target) &&
    e.target !== subjectColorCarte
  ) {
    hidePalettePopover();
  }
}

subjectColorCarte.addEventListener("click", function (e) {
  showPalettePopover();
  e.stopPropagation();
});

subjectColorType.addEventListener("change", function () {
  if (subjectColorType.value === "calido") {
    currentPalette = PALETTE_CALIDO;
    selectSubjectColor(PALETTE_CALIDO[0]);
  } else {
    currentPalette = PALETTE_FRIO;
    selectSubjectColor(PALETTE_FRIO[0]);
  }
});

// Al abrir modal materia, setear color y paleta por defecto
const fabMenuSubjectBtn = Array.from(
  document.querySelectorAll(".fab-menu-option")
).find((opt) =>
  Array.from(opt.querySelectorAll(".material-icons")).some(
    (icon) => icon.textContent.trim() === "calendar_month"
  )
);
if (fabMenuSubjectBtn) {
  fabMenuSubjectBtn.addEventListener("click", function () {
    subjectColorType.value = "";
    subjectName.value = "";
    subjectDesc.value = "";
    // Eliminado subjectImg.value y subjectLocation.value
    currentPalette = PALETTE_FRIO;
    selectSubjectColor(PALETTE_FRIO[0]);
    bsModalCreateSubject.show();
    fabMenu.classList.remove("show");
    fabIcon.textContent = "add";
  });
}

// Ocultar popover si se cierra el modal materia
document
  .getElementById("modalCreateSubject")
  .addEventListener("hidden.bs.modal", hidePalettePopover);

// Utilidad para mostrar toast
function showToast(msg, color = "primary") {
  const toast = document.getElementById("mainToast");
  const toastBody = document.getElementById("mainToastBody");
  toast.className = `toast align-items-center text-bg-${color} border-0`;
  toastBody.textContent = msg;
  new bootstrap.Toast(toast, { delay: 2000 }).show();
}

// --- LocalStorage helpers ---
function saveToLS(key, arr) {
  localStorage.setItem(key, JSON.stringify(arr));
}
function loadFromLS(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}

// --- Notas dinámicas agrupadas por fecha ---
let notas = loadFromLS("notas");
const notasList = document.getElementById("notasList");

// Utilidad para obtener fecha corta (dd/mm/yyyy)
function getShortDate(date) {
  if (
    typeof date === "string" &&
    date.match(/^\d{1,2} de [A-Za-z]+ de \d{4}$/)
  ) {
    // Formato viejo: "6 de Junio de 2024"
    const parts = date.split(" ");
    const day = parts[0];
    const month =
      [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ].indexOf(parts[2]) + 1;
    const year = parts[4];
    return `${String(day).padStart(2, "0")}/${String(month).padStart(
      2,
      "0"
    )}/${year}`;
  } else if (typeof date === "string" && date.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
    // Formato nuevo: dd/mm/yyyy
    return date;
  }
  return "";
}

// Utilidad para obtener fecha de hoy en formato dd/mm/yyyy
function getTodayShort() {
  const hoy = new Date();
  return `${String(hoy.getDate()).padStart(2, "0")}/${String(
    hoy.getMonth() + 1
  ).padStart(2, "0")}/${hoy.getFullYear()}`;
}

// Utilidad para mostrar fecha larga (para encabezados)
function fechaLarga(fechaStr) {
  // fechaStr: dd/mm/yyyy
  const [d, m, y] = fechaStr.split("/");
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  return `${parseInt(d)} de ${meses[parseInt(m) - 1]} de ${y}`;
}

function renderNotas(filter = "") {
  notasList.innerHTML = "";

  // Agrupar por fecha corta
  let agrupadas = {};
  notas.forEach((n) => {
    let fechaCorta = getShortDate(n.fecha);
    if (!agrupadas[fechaCorta]) agrupadas[fechaCorta] = [];
    agrupadas[fechaCorta].push(n);
  });

  // Filtrar por búsqueda
  let fechas = Object.keys(agrupadas).sort((a, b) => {
    // Orden descendente por fecha
    const [da, ma, ya] = a.split("/").map(Number);
    const [db, mb, yb] = b.split("/").map(Number);
    return new Date(yb, mb - 1, db) - new Date(ya, ma - 1, da);
  });

  let hayNotas = false;
  fechas.forEach((fecha) => {
    // Filtrar notas de este grupo
    let grupo = agrupadas[fecha].filter(
      (n) =>
        n.titulo.toLowerCase().includes(filter.toLowerCase()) ||
        (n.materia && n.materia.toLowerCase().includes(filter.toLowerCase()))
    );
    if (grupo.length === 0) return;

    hayNotas = true;
    // Encabezado de fecha
    let hoyShort = getTodayShort();
    let encabezado =
      fecha === hoyShort ? `Hoy - ${fechaLarga(fecha)}` : fechaLarga(fecha);
    notasList.innerHTML += `<div style="font-size:1.12rem;font-weight:600;color:#74408c;margin-top:1.2em;margin-bottom:0.3em;">${encabezado}</div>`;

    grupo.forEach((n, idx) => {
      const card = document.createElement("div");
      card.className = "note-card d-flex align-items-center";
      card.innerHTML = `
                        <span class="material-icons" style="color:#74408c;font-size:1.6rem;opacity:0.9;margin-right:0.7rem;">edit_note</span>
                        <div class="flex-grow-1">
                            <div style="font-weight:600;">${n.titulo}</div>
                            ${
                              n.materia
                                ? `<div class="text-muted" style="font-size:0.97rem;">Materia: ${n.materia}</div>`
                                : ""
                            }
                            <div class="text-muted" style="font-size:0.97rem;">${
                              n.nota || ""
                            }</div>
                        </div>
                        <button class="btn btn-sm btn-outline-secondary me-1" title="Editar" aria-label="Editar nota"><span class="material-icons">edit</span></button>
                        <button class="btn btn-sm btn-outline-danger" title="Eliminar" aria-label="Eliminar nota"><span class="material-icons">delete</span></button>
                    `;
      // Ver nota al hacer click en la tarjeta (excepto botones)
      card.addEventListener("click", function (e) {
        if (e.target.closest("button")) return;
        modalViewNoteTitle.textContent = n.titulo;
        if (n.materia) {
          modalViewNoteMateria.textContent = "Materia: " + n.materia;
          modalViewNoteMateria.style.display = "";
        } else {
          modalViewNoteMateria.style.display = "none";
        }
        modalViewNoteText.textContent = n.nota || "";
        modalViewNoteFecha.textContent = fechaLarga(fecha);
        if (typeof bsModalViewNote === "undefined" || !bsModalViewNote) {
          bsModalViewNote = new bootstrap.Modal(
            document.getElementById("modalViewNote")
          );
        }
        bsModalViewNote.show();
      });
      card.querySelector(".btn-outline-secondary").onclick = (ev) => {
        ev.stopPropagation();
        editNota(notas.indexOf(n));
      };
      card.querySelector(".btn-outline-danger").onclick = (ev) => {
        ev.stopPropagation();
        if (confirm("¿Eliminar nota?")) {
          notas.splice(notas.indexOf(n), 1);
          saveToLS("notas", notas);
          renderNotas(document.getElementById("mainSearch").value);
          showToast("Nota eliminada", "danger");
        }
      };
      notasList.appendChild(card);
    });
  });

  if (!hayNotas) {
    notasList.innerHTML = `<div class="text-muted text-center py-2">No hay notas</div>`;
  }
}

// Al guardar nota, guardar fecha en formato dd/mm/yyyy
modalSaveBtn.onclick = function () {
  if (!modalTitle.value.trim()) {
    modalTitle.classList.add("is-invalid");
    modalTitle.focus();
    return;
  }
  const hoy = new Date();
  const fechaStr = `${String(hoy.getDate()).padStart(2, "0")}/${String(
    hoy.getMonth() + 1
  ).padStart(2, "0")}/${hoy.getFullYear()}`;
  notas.push({
    titulo: modalTitle.value,
    materia: modalMateria.value,
    nota: modalNota.value,
    fecha: fechaStr,
  });
  saveToLS("notas", notas);
  renderNotas(document.getElementById("mainSearch").value);
  bsModalCreateNote.hide();
  showToast("Nota guardada", "success");
};

// Al editar nota, mantener la fecha original (ya está correcto)
modalSaveBtn.onclick = function () {
  if (!modalTitle.value.trim()) {
    modalTitle.classList.add("is-invalid");
    modalTitle.focus();
    return;
  }
  const hoy = new Date();
  const fechaStr = `${String(hoy.getDate()).padStart(2, "0")}/${String(
    hoy.getMonth() + 1
  ).padStart(2, "0")}/${hoy.getFullYear()}`;
  notas.push({
    titulo: modalTitle.value,
    materia: modalMateria.value,
    nota: modalNota.value,
    fecha: n.fecha, // mantener fecha original
  });
  saveToLS("notas", notas);
  renderNotas(document.getElementById("mainSearch").value);
  bsModalCreateNote.hide();
  showToast("Nota editada", "success");
};
modalTitle.oninput = () => modalTitle.classList.remove("is-invalid");

// Encabezado de fecha de hoy
function getTodayStr() {
  const hoy = new Date();
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  return `Hoy - ${hoy.getDate()} de ${meses[hoy.getMonth()]}`;
}
document.getElementById("todayTitle").textContent = getTodayStr();

// --- Búsqueda en tiempo real solo sobre notas ---
document.getElementById("mainSearch").addEventListener("input", function () {
  const val = this.value;
  renderNotas(val);
});

// --- Inicialización ---
renderNotas();
