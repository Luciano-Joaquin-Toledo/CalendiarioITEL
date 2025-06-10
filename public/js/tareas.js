// --- Menú Lateral ---
const sideMenu = document.getElementById("sideMenu");
const sideMenuOverlay = document.getElementById("sideMenuOverlay");
const openSideMenuBtn = document.getElementById("openSideMenuBtn");
const closeSideMenuBtn = document.getElementById("closeSideMenu");

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

// --- Paletas de colores para tareas ---
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
let currentPaletteTask = PALETTE_FRIO;

// --- Lógica de tareas con campos extendidos y color tipo materia ---
function getTasks() {
  try {
    const data = JSON.parse(localStorage.getItem("tasks_list_v2"));
    if (!Array.isArray(data)) return [];
    return data;
  } catch {
    return [];
  }
}
function saveTasks(arr) {
  localStorage.setItem("tasks_list_v2", JSON.stringify(arr));
}
let tasks = getTasks();

const tasksListContainer = document.getElementById("tasksListContainer");
const mainSearch = document.getElementById("mainSearch");
const sortTasks = document.getElementById("sortTasks");
const filterCategory = document.getElementById("filterCategory");

function renderTasksList() {
  let q = mainSearch.value.trim().toLowerCase();
  let filtered = tasks.filter(
    (t) =>
      (!q ||
        (t.name || "").toLowerCase().includes(q) ||
        (t.desc || "").toLowerCase().includes(q)) &&
      (!filterCategory.value || t.category === filterCategory.value)
  );
  // Ordenar
  if (sortTasks.value === "nombre") {
    filtered.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  } else if (sortTasks.value === "estado") {
    filtered.sort((a, b) => +!!a.completed - +!!b.completed);
  } else {
    // fecha
    filtered.sort((a, b) => (a.date || "").localeCompare(b.date || ""));
  }
  if (filtered.length === 0) {
    tasksListContainer.innerHTML =
      '<div style="text-align:center;color:#b393c8;font-size:1.1em;margin-top:2em;">No hay tareas</div>';
    return;
  }
  tasksListContainer.innerHTML = "";
  filtered.forEach((t, idx) => {
    // Subtareas resumen (solo cantidad hechas/total)
    let subtasksSummary = "";
    if (Array.isArray(t.subTasks) && t.subTasks.length > 0) {
      const done = t.subTasksDone ? t.subTasksDone.filter(Boolean).length : 0;
      subtasksSummary = `<div style="font-size:0.97em;color:#888;">${done}/${t.subTasks.length} subtareas</div>`;
    }
    let isCompleted =
      !!t.completed ||
      (Array.isArray(t.subTasks) &&
        t.subTasks.length > 0 &&
        t.subTasksDone &&
        t.subTasksDone.filter(Boolean).length === t.subTasks.length);
    const div = document.createElement("div");
    div.className = "task-item" + (isCompleted ? " completed" : "");
    div.setAttribute("tabindex", "0");
    div.setAttribute("role", "button");
    div.setAttribute("aria-label", "Ver tarea");
    div.setAttribute("draggable", "true");
    div.dataset.idx = idx;
    div.style.cursor = "pointer";
    div.style.boxShadow = "0 2px 8px 0 rgba(116,64,140,0.08)";
    div.style.marginBottom = "1.1rem";
    div.style.border = "1.5px solid #e0dfe3";
    div.style.padding = "0.4rem 0.3rem 0.4rem 0.2rem";
    div.style.alignItems = "stretch";
    div.innerHTML = `
                <div class="task-checkbox${
                  isCompleted ? " checked" : ""
                }" style="pointer-events:none;border-color:${
      t.color || "#b393c8"
    };min-width:36px;min-height:36px;width:36px;height:36px;"></div>
                <div class="task-label" style="background:${
                  t.color || "#cfd0db"
                };box-shadow:0 1px 4px 0 rgba(116,64,140,0.04);padding:0.5rem 0.7rem;font-size:1.08em;min-width:0;">
                    <div style="font-weight:600;${
                      isCompleted
                        ? "text-decoration:line-through;color:#aaa;"
                        : ""
                    };word-break:break-word;">${escapeHtml(t.name || "")}</div>
                    <div style="font-size:0.93em;color:#74408c;${
                      isCompleted
                        ? "text-decoration:line-through;color:#bbb;"
                        : ""
                    };word-break:break-word;">${
      t.date ? escapeHtml(t.date) : ""
    }</div>
                    ${
                      t.category
                        ? `<span class="badge bg-secondary" style="background:#ede7f6;color:#74408c;font-weight:600;border-radius:8px;">${escapeHtml(
                            t.category
                          )}</span>`
                        : ""
                    }
                    ${subtasksSummary}
                </div>
                <div style="display:flex;flex-direction:column;gap:0.3em;justify-content:center;">
                  <button class="task-edit-btn" aria-label="Editar tarea" data-edit="${idx}"
                      style="background:#fff;border:none;border-radius:50%;margin-bottom:0.2em;box-shadow:0 1px 4px 0 rgba(116,64,140,0.10);width:2.6em;height:2.6em;display:flex;align-items:center;justify-content:center;transition:background 0.15s;">
                      <span class="material-icons" style="color:#74408c;font-size:1.6em;">edit</span>
                  </button>
                  <button class="task-delete-btn" aria-label="Eliminar tarea" data-del="${idx}"
                      style="background:#fff;border:none;border-radius:50%;box-shadow:0 1px 4px 0 rgba(116,64,140,0.10);width:2.6em;height:2.6em;display:flex;align-items:center;justify-content:center;transition:background 0.15s;">
                      <span class="material-icons" style="color:#e67e22;font-size:1.6em;">delete</span>
                  </button>
                </div>
            `;
    // Al hacer click en la tarea (no en el botón eliminar), abrir modal
    div.onclick = function (e) {
      if (e.target.closest(".task-delete-btn")) return;
      openViewTaskModal(idx);
    };
    div.onkeydown = function (e) {
      if (
        (e.key === "Enter" || e.key === " ") &&
        !e.target.closest(".task-delete-btn")
      ) {
        openViewTaskModal(idx);
      }
    };
    tasksListContainer.appendChild(div);
  });
}
function escapeHtml(str) {
  return String(str).replace(/[<>&"]/g, function (c) {
    return { "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c];
  });
}

// Checkbox completar tarea
tasksListContainer.onclick = function (e) {
  const cb = e.target.closest(".task-checkbox");
  const del = e.target.closest(".task-delete-btn");
  const edit = e.target.closest(".task-edit-btn");
  if (cb) {
    const idx = +cb.getAttribute("data-idx");
    tasks[idx].completed = !tasks[idx].completed;
    saveTasks(tasks);
    renderTasksList();
  } else if (del) {
    const idx = +del.getAttribute("data-del");
    if (confirm("¿Eliminar esta tarea?")) {
      tasks.splice(idx, 1);
      saveTasks(tasks);
      renderTasksList();
    }
  } else if (edit) {
    const idx = +edit.getAttribute("data-edit");
    openEditTaskModal(idx);
  }
};
// Accesibilidad: marcar con Enter/Espacio
tasksListContainer.addEventListener("keydown", function (e) {
  if (
    (e.key === "Enter" || e.key === " ") &&
    e.target.classList.contains("task-checkbox")
  ) {
    e.preventDefault();
    e.target.click();
  }
});

// --- Modal añadir tarea Bootstrap con paleta de color tipo materia ---
const modalTaskSaveBtn = document.getElementById("modalTaskSaveBtn");
const modalTaskSaveBtnText = document.getElementById("modalTaskSaveBtnText");
const modalTaskSaveSpinner = document.getElementById("modalTaskSaveSpinner");
const taskName = document.getElementById("taskName");
const taskDesc = document.getElementById("taskDesc");
const taskDate = document.getElementById("taskDate");
const taskTime = document.getElementById("taskTime");
const taskColorType = document.getElementById("taskColorType");
const taskColorCarte = document.getElementById("taskColorCarte");
const taskColor = document.getElementById("taskColor");
const colorPalettePopoverTask = document.getElementById(
  "colorPalettePopoverTask"
);
const colorPaletteGridTask = document.getElementById("colorPaletteGridTask");

function renderColorPalettePopoverTask(palette, selectedColor) {
  colorPaletteGridTask.innerHTML = "";
  palette.forEach((color) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "color-btn" + (color === selectedColor ? " selected" : "");
    btn.dataset.color = color;
    btn.style.background = color;
    btn.style.width = "1.8rem";
    btn.style.height = "1.8rem";
    btn.style.borderRadius = "50%";
    btn.style.border =
      color === selectedColor ? "3px solid #74408c" : "2px solid #b393c8";
    btn.onclick = function (e) {
      selectTaskColor(color);
      hidePalettePopoverTask();
      e.stopPropagation();
    };
    colorPaletteGridTask.appendChild(btn);
  });
}

function selectTaskColor(color) {
  taskColor.value = color;
  taskColorCarte.style.background = color;
}

function showPalettePopoverTask() {
  renderColorPalettePopoverTask(currentPaletteTask, taskColor.value);
  // Posicionar popover al lado del círculo
  const rect = taskColorCarte.getBoundingClientRect();
  colorPalettePopoverTask.style.display = "block";
  colorPalettePopoverTask.style.left = rect.right + window.scrollX + 10 + "px";
  colorPalettePopoverTask.style.top = rect.top + window.scrollY - 10 + "px";
  setTimeout(() => {
    document.addEventListener("mousedown", handleClickOutsidePaletteTask, {
      once: true,
    });
  }, 0);
}

function hidePalettePopoverTask() {
  colorPalettePopoverTask.style.display = "none";
}

function handleClickOutsidePaletteTask(e) {
  if (
    !colorPalettePopoverTask.contains(e.target) &&
    e.target !== taskColorCarte
  ) {
    hidePalettePopoverTask();
  }
}

taskColorCarte.addEventListener("click", function (e) {
  showPalettePopoverTask();
  e.stopPropagation();
});

taskColorType.addEventListener("change", function () {
  if (taskColorType.value === "calido") {
    currentPaletteTask = PALETTE_CALIDO;
    selectTaskColor(PALETTE_CALIDO[0]);
  } else {
    currentPaletteTask = PALETTE_FRIO;
    selectTaskColor(PALETTE_FRIO[0]);
  }
});

// Al abrir modal tarea, setear color y paleta por defecto
document
  .getElementById("modalCreateTask")
  .addEventListener("show.bs.modal", function () {
    taskColorType.value = "";
    taskName.value = "";
    taskDesc.value = "";
    taskDate.value = "";
    taskTime.value = "";
    currentPaletteTask = PALETTE_FRIO;
    selectTaskColor(PALETTE_FRIO[0]);
  });

// UX: efecto de carga al guardar
modalTaskSaveBtn.onclick = function () {
  const name = taskName.value.trim();
  if (!name) {
    taskName.focus();
    return;
  }
  modalTaskSaveBtn.disabled = true;
  modalTaskSaveBtnText.textContent = "Guardando...";
  modalTaskSaveSpinner.style.display = "inline-block";
  // Guardar tarea
  tasks.push({
    name,
    desc: taskDesc.value.trim(),
    date: taskDate.value,
    time: taskTime.value,
    color: taskColor.value,
    completed: false,
  });
  saveTasks(tasks);
  renderTasksList();
  // Reset modal
  setTimeout(() => {
    modalTaskSaveBtn.disabled = false;
    modalTaskSaveBtnText.textContent = "Guardar";
    modalTaskSaveSpinner.style.display = "none";
    // Cerrar modal Bootstrap
    const modal = bootstrap.Modal.getOrCreateInstance(
      document.getElementById("modalCreateTask")
    );
    modal.hide();
  }, 400);
};

// --- Subtareas dinámicas ---
const subTasksContainer = document.getElementById("subTasksContainer");
const addSubTaskBtn = document.getElementById("addSubTaskBtn");

function createSubTaskInput(value = "") {
  const wrapper = document.createElement("div");
  wrapper.className = "input-group mb-2 subtarea-row";

  const input = document.createElement("input");
  input.type = "text";
  input.className = "form-control";
  input.placeholder = "Subtarea...";
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

addSubTaskBtn.onclick = function () {
  addSubTaskInput();
};

// Al abrir modal tarea, setear color y paleta por defecto y limpiar subtareas
document
  .getElementById("modalCreateTask")
  .addEventListener("show.bs.modal", function () {
    taskColorType.value = "";
    taskName.value = "";
    taskDesc.value = "";
    taskDate.value = "";
    taskTime.value = "";
    currentPaletteTask = PALETTE_FRIO;
    selectTaskColor(PALETTE_FRIO[0]);
    resetSubTasks();
  });

// --- Guardar tarea con subtareas ---
modalTaskSaveBtn.onclick = function () {
  const name = taskName.value.trim();
  if (!name) {
    taskName.focus();
    return;
  }
  // Obtener subtareas no vacías
  const subTasks = Array.from(subTasksContainer.querySelectorAll("input"))
    .map((input) => input.value.trim())
    .filter((val) => val.length > 0);

  modalTaskSaveBtn.disabled = true;
  modalTaskSaveBtnText.textContent = "Guardando...";
  modalTaskSaveSpinner.style.display = "inline-block";
  // Guardar tarea
  tasks.push({
    name,
    desc: taskDesc.value.trim(),
    date: taskDate.value,
    time: taskTime.value,
    color: taskColor.value,
    subTasks,
    completed: false,
  });
  saveTasks(tasks);
  renderTasksList();
  // Reset modal
  setTimeout(() => {
    modalTaskSaveBtn.disabled = false;
    modalTaskSaveBtnText.textContent = "Guardar";
    modalTaskSaveSpinner.style.display = "none";
    // Cerrar modal Bootstrap
    const modal = bootstrap.Modal.getOrCreateInstance(
      document.getElementById("modalCreateTask")
    );
    modal.hide();
  }, 400);
};

// Buscar tareas
mainSearch.addEventListener("input", renderTasksList);

// Sincroniza entre pestañas
window.addEventListener("storage", function (e) {
  if (e.key === "tasks_list_v2") {
    tasks = getTasks();
    renderTasksList();
  }
});

// Inicialización
renderTasksList();

// Modal para ver y tachar subtareas
const modalViewTask = document.getElementById("modalViewTask");
const modalViewTaskTitle = document.getElementById("modalViewTaskTitle");
const modalViewTaskDesc = document.getElementById("modalViewTaskDesc");
const modalViewTaskDate = document.getElementById("modalViewTaskDate");
const modalViewTaskSubtasks = document.getElementById("modalViewTaskSubtasks");

function openViewTaskModal(idx) {
  const t = tasks[idx];
  modalViewTaskTitle.textContent = t.name || "";
  modalViewTaskDesc.textContent = t.desc || "";
  modalViewTaskDate.textContent = t.date
    ? `Fecha: ${t.date}${t.time ? " - " + t.time : ""}`
    : "";
  // Subtareas
  if (Array.isArray(t.subTasks) && t.subTasks.length > 0) {
    // Asegura que subTasksDone exista y tenga el mismo largo
    if (
      !Array.isArray(t.subTasksDone) ||
      t.subTasksDone.length !== t.subTasks.length
    ) {
      t.subTasksDone = t.subTasks.map(() => false);
    }
    let html = `<ul class="list-unstyled mb-0">`;
    t.subTasks.forEach((st, sidx) => {
      const checked = t.subTasksDone[sidx];
      html += `
                    <li>
                        <label style="display:flex;align-items:center;gap:0.5em;cursor:pointer;">
                            <input type="checkbox" class="modal-subtask-checkbox" data-task="${idx}" data-sub="${sidx}" ${
        checked ? "checked" : ""
      } style="accent-color:${t.color || "#74408c"};width:1.1em;height:1.1em;">
                            <span style="flex:1;${
                              checked
                                ? "text-decoration:line-through;color:#aaa;"
                                : ""
                            }">${escapeHtml(st)}</span>
                        </label>
                    </li>
                `;
    });
    html += `</ul>`;
    modalViewTaskSubtasks.innerHTML = html;
  } else {
    modalViewTaskSubtasks.innerHTML =
      '<div class="text-muted">No hay subtareas</div>';
  }
  // Mostrar modal
  const bsModal = bootstrap.Modal.getOrCreateInstance(modalViewTask);
  bsModal.show();
}

// Manejar tildado de subtareas en el modal
modalViewTaskSubtasks.onclick = function (e) {
  if (e.target.classList.contains("modal-subtask-checkbox")) {
    const tidx = +e.target.getAttribute("data-task");
    const sidx = +e.target.getAttribute("data-sub");
    if (
      !Array.isArray(tasks[tidx].subTasksDone) ||
      tasks[tidx].subTasksDone.length !== tasks[tidx].subTasks.length
    ) {
      tasks[tidx].subTasksDone = tasks[tidx].subTasks.map(() => false);
    }
    tasks[tidx].subTasksDone[sidx] = e.target.checked;
    // Si todas las subtareas están hechas, marcar tarea como completada
    if (
      tasks[tidx].subTasksDone.filter(Boolean).length ===
      tasks[tidx].subTasks.length
    ) {
      tasks[tidx].completed = true;
    } else {
      tasks[tidx].completed = false;
    }
    saveTasks(tasks);
    renderTasksList();
  }
};

// Eliminar tarea desde la lista
tasksListContainer.onclick = function (e) {
  const del = e.target.closest(".task-delete-btn");
  if (del) {
    const idx = +del.getAttribute("data-del");
    if (confirm("¿Eliminar esta tarea?")) {
      tasks.splice(idx, 1);
      saveTasks(tasks);
      renderTasksList();
    }
  }
};

// --- Notificaciones de tareas próximas a vencer ---
function checkUpcomingTasks() {
  if (!("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  const now = new Date();
  tasks.forEach((t) => {
    if (t.date && !t.notified) {
      const taskDate = new Date(t.date + (t.time ? "T" + t.time : "T00:00"));
      const diff = (taskDate - now) / (1000 * 60 * 60); // horas
      if (diff > 0 && diff < 24) {
        new Notification("Tarea próxima", { body: t.name + " vence pronto." });
        t.notified = true;
      }
    }
  });
  saveTasks(tasks);
}
if ("Notification" in window && Notification.permission !== "granted") {
  Notification.requestPermission();
}
setInterval(checkUpcomingTasks, 60 * 60 * 1000); // cada hora

// --- Ordenar y filtrar tareas ---
sortTasks.onchange = renderTasksList;
filterCategory.onchange = renderTasksList;

// --- Arrastrar y soltar para reordenar tareas ---
let dragSrcIdx = null;
tasksListContainer.ondragstart = function (e) {
  const item = e.target.closest(".task-item");
  if (!item) return;
  dragSrcIdx = +item.dataset.idx;
  e.dataTransfer.effectAllowed = "move";
};
tasksListContainer.ondragover = function (e) {
  e.preventDefault();
};
tasksListContainer.ondrop = function (e) {
  e.preventDefault();
  const item = e.target.closest(".task-item");
  if (!item || dragSrcIdx === null) return;
  const dropIdx = +item.dataset.idx;
  if (dragSrcIdx !== dropIdx) {
    const moved = tasks.splice(dragSrcIdx, 1)[0];
    tasks.splice(dropIdx, 0, moved);
    saveTasks(tasks);
    renderTasksList();
  }
  dragSrcIdx = null;
};

// --- Edición de tareas ---
let editingTaskIdx = null;
function openEditTaskModal(idx) {
  editingTaskIdx = idx;
  const t = tasks[idx];
  taskName.value = t.name || "";
  taskDesc.value = t.desc || "";
  taskDate.value = t.date || "";
  taskTime.value = t.time || "";
  taskColor.value = t.color || PALETTE_FRIO[0];
  taskColorCarte.style.background = t.color || PALETTE_FRIO[0];
  document.getElementById("taskCategory").value = t.category || "";
  resetSubTasks();
  if (Array.isArray(t.subTasks)) {
    t.subTasks.forEach((st) => addSubTaskInput(st));
  }
  const modal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById("modalCreateTask")
  );
  modal.show();
}

// Guardar tarea (nuevo o edición)
modalTaskSaveBtn.onclick = function () {
  const name = taskName.value.trim();
  if (!name) {
    taskName.focus();
    return;
  }
  // Validación de fecha
  if (taskDate.value) {
    const today = new Date();
    const selDate = new Date(
      taskDate.value + (taskTime.value ? "T" + taskTime.value : "T00:00")
    );
    if (selDate < today) {
      alert("La fecha no puede ser pasada.");
      taskDate.focus();
      return;
    }
  }
  // Obtener subtareas no vacías
  const subTasks = Array.from(subTasksContainer.querySelectorAll("input"))
    .map((input) => input.value.trim())
    .filter((val) => val.length > 0);
  modalTaskSaveBtn.disabled = true;
  modalTaskSaveBtnText.textContent = "Guardando...";
  modalTaskSaveSpinner.style.display = "inline-block";
  const taskObj = {
    name,
    desc: taskDesc.value.trim(),
    date: taskDate.value,
    time: taskTime.value,
    color: taskColor.value,
    subTasks,
    category: document.getElementById("taskCategory").value,
    completed: false,
  };
  if (editingTaskIdx !== null) {
    tasks[editingTaskIdx] = { ...tasks[editingTaskIdx], ...taskObj };
    editingTaskIdx = null;
  } else {
    tasks.push(taskObj);
  }
  saveTasks(tasks);
  renderTasksList();
  setTimeout(() => {
    modalTaskSaveBtn.disabled = false;
    modalTaskSaveBtnText.textContent = "Guardar";
    modalTaskSaveSpinner.style.display = "none";
    const modal = bootstrap.Modal.getOrCreateInstance(
      document.getElementById("modalCreateTask")
    );
    modal.hide();
  }, 400);
};

// --- Accesibilidad: roles y navegación por teclado ---
// Ya se usan roles y tabindex en los elementos interactivos.
// Mejorar navegación con flechas
tasksListContainer.addEventListener("keydown", function (e) {
  const items = Array.from(tasksListContainer.querySelectorAll(".task-item"));
  const idx = items.indexOf(document.activeElement);
  if (e.key === "ArrowDown" && idx >= 0 && idx < items.length - 1) {
    items[idx + 1].focus();
    e.preventDefault();
  }
  if (e.key === "ArrowUp" && idx > 0) {
    items[idx - 1].focus();
    e.preventDefault();
  }
});
