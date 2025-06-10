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

// --- Calendario y Recordatorios ---
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
const dias = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sáb", "Dom"];

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const monthTitle = document.getElementById("monthTitle");
const calendarTable = document.getElementById("calendarTable");
const prevMonthBtn = document.getElementById("prevMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");

// Recordatorios por fecha exacta
// Usa localStorage para persistencia real en el navegador
function getReminders() {
  try {
    const data = JSON.parse(localStorage.getItem("reminders_calendar"));
    if (!data || typeof data !== "object") return {};
    // Migración: si es string, lo convierte a array
    for (const k in data) {
      if (typeof data[k] === "string") {
        data[k] = [{ text: data[k], cat: "tarea" }];
      }
    }
    return data;
  } catch {
    return {};
  }
}
function saveReminders(obj) {
  localStorage.setItem("reminders_calendar", JSON.stringify(obj));
}
let reminders = getReminders();

function pad(n) {
  return n < 10 ? "0" + n : n;
}

// --- Buscador de recordatorios ---
document.getElementById("mainSearch").addEventListener("input", function (e) {
  const q = e.target.value.trim().toLowerCase();
  if (!q) {
    renderCalendar(currentMonth, currentYear);
    updateReminderCount();
    renderReminderSummary();
    return;
  }
  // Buscar en todos los recordatorios
  let found = [];
  for (const date in reminders) {
    reminders[date].forEach((r, idx) => {
      if (r.text.toLowerCase().includes(q) || date.includes(q)) {
        found.push({ date, ...r });
      }
    });
  }
  // Mostrar resultados debajo del calendario
  let html =
    '<div class="alert alert-info mt-2" style="font-size:1em;"><b>Resultados de búsqueda:</b><ul style="margin:0.5em 0 0 1em;padding:0;">';
  if (found.length === 0) {
    html += "<li>No se encontraron resultados.</li>";
  } else {
    found.forEach((r) => {
      html += `<li><span style="color:var(--color-2);font-weight:600">${
        r.date
      }</span>: <span style="color:${getCatColor(r.cat)}">${escapeHtml(
        r.text
      )}</span> <span class="reminder-dot" data-cat="${
        r.cat
      }" style="margin-left:2px;vertical-align:middle;"></span></li>`;
    });
  }
  html += "</ul></div>";
  reminderSummaryBox.innerHTML = html;
});

function escapeHtml(str) {
  return str.replace(/[<>&"]/g, function (c) {
    return { "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c];
  });
}
function getCatColor(cat) {
  if (cat === "tarea") return "#27ae60";
  if (cat === "examen") return "#e67e22";
  if (cat === "evento") return "#2980b9";
  return "#8e44ad";
}

function updateReminderCount() {
  let count = 0;
  for (const k in reminders) count += reminders[k].length;
  reminderCountBox.textContent =
    count === 0
      ? "No tienes recordatorios"
      : count === 1
      ? "Tienes 1 recordatorio"
      : `Tienes ${count} recordatorios`;
}

function renderReminderSummary() {
  // Mostrar próximos 5 recordatorios (ordenados por fecha)
  let all = [];
  for (const date in reminders) {
    reminders[date].forEach((r) => all.push({ date, ...r }));
  }
  all.sort((a, b) => a.date.localeCompare(b.date));
  let html =
    '<div class="card p-2" style="font-size:1em;"><b>Próximos recordatorios:</b><ul style="margin:0.5em 0 0 1em;padding:0;">';
  let shown = 0;
  for (let i = 0; i < all.length && shown < 5; i++) {
    html += `<li><span style="color:var(--color-2);font-weight:600">${
      all[i].date
    }</span>: <span style="color:${getCatColor(all[i].cat)}">${escapeHtml(
      all[i].text
    )}</span> <span class="reminder-dot" data-cat="${
      all[i].cat
    }" style="margin-left:2px;vertical-align:middle;"></span></li>`;
    shown++;
  }
  if (shown === 0) html += "<li>No hay próximos recordatorios.</li>";
  html += "</ul></div>";
  reminderSummaryBox.innerHTML = html;
}

function renderCalendar(month, year) {
  monthTitle.textContent = `${meses[month]} ${year}`;
  calendarTable.innerHTML = "";

  let thead = document.createElement("thead");
  let trHead = document.createElement("tr");
  for (let d = 0; d < 7; d++) {
    let th = document.createElement("th");
    th.textContent = dias[d];
    trHead.appendChild(th);
  }
  thead.appendChild(trHead);
  calendarTable.appendChild(thead);

  let firstDay = new Date(year, month, 1);
  let startDay = (firstDay.getDay() + 6) % 7; // Lunes=0, Domingo=6
  let daysInMonth = new Date(year, month + 1, 0).getDate();
  let prevMonthDays = new Date(year, month, 0).getDate();

  let tbody = document.createElement("tbody");
  let day = 1;
  let nextMonthDay = 1;
  for (let i = 0; i < 6; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      let td = document.createElement("td");
      if (i === 0 && j < startDay) {
        td.textContent = prevMonthDays - startDay + j + 1;
        td.classList.add("inactive");
      } else if (day > daysInMonth) {
        td.textContent = nextMonthDay++;
        td.classList.add("inactive");
      } else {
        const dateKey = `${year}-${pad(month + 1)}-${pad(day)}`;
        td.className = "";
        // Marcar hoy
        let isToday =
          day === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear();
        let hasReminder = reminders[dateKey] && reminders[dateKey].length > 0;
        let cat = hasReminder ? reminders[dateKey][0].cat : null;

        // Crear el span del número de día
        const daySpan = document.createElement("span");
        daySpan.textContent = day;
        daySpan.style.display = "inline-block";
        daySpan.style.width = "2em";
        daySpan.style.height = "2em";
        daySpan.style.lineHeight = "2em";
        daySpan.style.borderRadius = "50%";
        daySpan.style.transition =
          "background 0.18s, color 0.18s, border 0.18s";
        daySpan.style.fontWeight = isToday
          ? "bold"
          : hasReminder
          ? "bold"
          : "normal";
        daySpan.style.fontSize = "1em";
        daySpan.style.verticalAlign = "middle";
        daySpan.style.background = "transparent";
        daySpan.style.color = "#222";
        daySpan.style.border = "none";

        if (isToday) {
          daySpan.style.background = "#9c65b7";
          daySpan.style.color = "#fff";
          daySpan.style.border = "none";
        } else if (hasReminder) {
          td.classList.add("has-reminder");
          if (cat === "tarea") {
            daySpan.style.border = "2.5px solid var(--color-tarea)";
            daySpan.style.color = "var(--color-tarea)";
          } else if (cat === "examen") {
            daySpan.style.border = "2.5px solid var(--color-examen)";
            daySpan.style.color = "var(--color-examen)";
          } else if (cat === "evento") {
            daySpan.style.border = "2.5px solid var(--color-evento)";
            daySpan.style.color = "var(--color-evento)";
          } else {
            daySpan.style.border = "2.5px solid #b393c8";
            daySpan.style.color = "#74408c";
          }
        } else {
          daySpan.style.background = "transparent";
          daySpan.style.color = "#222";
        }

        td.appendChild(daySpan);

        // Badge "hoy" para el día actual
        if (isToday) {
          const todayBadge = document.createElement("span");
          todayBadge.className = "day-today-badge";
          todayBadge.textContent = "Hoy";
          td.appendChild(todayBadge);
        }

        td.title = "";
        td.style.position = "relative";
        // Mejor accesibilidad y experiencia visual
        td.tabIndex = 0;
        td.setAttribute(
          "aria-label",
          `Día ${day}` +
            (hasReminder
              ? `, ${reminders[dateKey].length} recordatorio(s)`
              : "")
        );
        td.style.transition = "box-shadow 0.18s, background 0.18s, color 0.18s";
        const thisDay = day;
        td.onmouseenter = function () {
          td.style.boxShadow = "0 0 0 3px #b393c8";
          td.style.background = "#f6f2fa";
        };
        td.onmouseleave = function () {
          td.style.boxShadow = "";
          td.style.background = "";
        };
        td.onclick = function () {
          document
            .querySelectorAll(".calendar-table td.selected")
            .forEach((el) => el.classList.remove("selected"));
          td.classList.add("selected");
          openReminderModal(year, month, thisDay);
        };
        td.onkeydown = function (e) {
          if (e.key === "Enter" || e.key === " ") {
            td.click();
          }
        };
        td.onfocus = function () {
          td.style.outline = "2px solid var(--color-2)";
        };
        td.onblur = function () {
          td.style.outline = "";
        };
        day++;
      }
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
    if (day > daysInMonth) break;
  }
  calendarTable.appendChild(tbody);

  // Tooltips para los puntitos
  setTimeout(() => {
    document.querySelectorAll(".reminder-dot[title]").forEach((dot) => {
      dot.addEventListener("mouseenter", function (e) {
        let tooltip = document.createElement("div");
        tooltip.className = "reminder-tooltip";
        tooltip.textContent = dot.title;
        document.body.appendChild(tooltip);
        const rect = dot.getBoundingClientRect();
        tooltip.style.left = rect.left + window.scrollX + 16 + "px";
        tooltip.style.top = rect.top + window.scrollY - 8 + "px";
        tooltip.style.opacity = 1;
        dot._tooltip = tooltip;
      });
      dot.addEventListener("mouseleave", function (e) {
        if (dot._tooltip) {
          dot._tooltip.remove();
          dot._tooltip = null;
        }
      });
    });
  }, 10);
}

prevMonthBtn.onclick = function () {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
  renderReminderSummary();
};
nextMonthBtn.onclick = function () {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
  renderReminderSummary();
};

// --- Modal de Recordatorios (varios por día, editar, eliminar, accesibilidad) ---
const reminderModal = document.getElementById("reminderModalCustom");
const reminderForm = document.getElementById("reminderForm");
const reminderText = document.getElementById("reminderText");
const reminderCategory = document.getElementById("reminderCategory");
const reminderDate = document.getElementById("reminderDate");
const reminderEditIndex = document.getElementById("reminderEditIndex");
const closeReminderModal = document.getElementById("closeReminderModal");
const cancelReminderBtn = document.getElementById("cancelReminderBtn");
const reminderModalTitle = document.getElementById("reminderModalTitle");
const reminderInputBox = document.getElementById("reminderInputBox");
const reminderListBox = document.getElementById("reminderListBox");
const reminderList = document.getElementById("reminderList");
const reminderViewBox = document.getElementById("reminderViewBox"); // no se usa, pero por compatibilidad
const reminderViewText = document.getElementById("reminderViewText"); // no se usa, pero por compatibilidad
const saveReminderBtn = document.getElementById("saveReminderBtn");
const deleteReminderBtn = document.getElementById("deleteReminderBtn");
const addNewReminderBtn = document.getElementById("addNewReminderBtn");
const reminderCountBox = document.getElementById("reminderCountBox");

let modalMode = "add"; // 'add' | 'edit'

function openReminderModal(year, month, day) {
  reminders = getReminders();
  const dateKey = `${year}-${pad(month + 1)}-${pad(day)}`;
  reminderDate.value = dateKey;
  reminderEditIndex.value = "";
  reminderText.value = "";
  reminderCategory.value = "tarea";
  reminderInputBox.style.display = "block";
  addNewReminderBtn.style.display = "none";
  reminderText.setAttribute("aria-label", "Texto del recordatorio");
  reminderCategory.setAttribute("aria-label", "Categoría");
  // Si hay recordatorios, mostrar lista
  if (reminders[dateKey] && reminders[dateKey].length > 0) {
    reminderModalTitle.textContent = "Recordatorios del día";
    reminderListBox.style.display = "block";
    renderReminderList(dateKey);
    saveReminderBtn.textContent = "Guardar";
    saveReminderBtn.style.display = "inline-block";
    deleteReminderBtn.style.display = "none";
    modalMode = "add";
    setTimeout(() => {
      reminderText.focus();
    }, 100);
  } else {
    reminderModalTitle.textContent = "Añadir recordatorio";
    reminderListBox.style.display = "none";
    saveReminderBtn.textContent = "Guardar";
    saveReminderBtn.style.display = "inline-block";
    deleteReminderBtn.style.display = "none";
    modalMode = "add";
    setTimeout(() => {
      reminderText.focus();
    }, 100);
  }
  reminderModal.style.display = "flex";
  reminderModal.setAttribute("aria-hidden", "false");
}

function renderReminderList(dateKey) {
  reminderList.innerHTML = "";
  (reminders[dateKey] || []).forEach((r, idx) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex align-items-center justify-content-between";
    li.innerHTML = `
                  <span>
                    <span class="reminder-dot" data-cat="${
                      r.cat
                    }" style="margin-right:5px;background:${getCatColor(
      r.cat
    )}"></span>
                    <span style="color:${getCatColor(r.cat)}">${escapeHtml(
      r.text
    )}</span>
                  </span>
                  <span>
                    <button type="button" class="btn btn-sm btn-outline-primary me-1" aria-label="Editar" data-edit="${idx}"><span class="material-icons" style="font-size:1.1em;">edit</span></button>
                    <button type="button" class="btn btn-sm btn-outline-danger" aria-label="Eliminar" data-del="${idx}"><span class="material-icons" style="font-size:1.1em;">delete</span></button>
                  </span>
                `;
    reminderList.appendChild(li);
  });
  // Botón para agregar nuevo
  addNewReminderBtn.style.display = "inline-block";
}

reminderList.onclick = function (e) {
  const dateKey = reminderDate.value;
  if (e.target.closest("[data-edit]")) {
    const idx = +e.target.closest("[data-edit]").getAttribute("data-edit");
    // Editar
    reminderText.value = reminders[dateKey][idx].text;
    reminderCategory.value = reminders[dateKey][idx].cat;
    reminderEditIndex.value = idx;
    saveReminderBtn.textContent = "Actualizar";
    saveReminderBtn.style.display = "inline-block";
    deleteReminderBtn.style.display = "inline-block";
    modalMode = "edit";
    setTimeout(() => {
      reminderText.focus();
    }, 100);
  } else if (e.target.closest("[data-del]")) {
    const idx = +e.target.closest("[data-del]").getAttribute("data-del");
    // Eliminar
    if (confirm("¿Eliminar este recordatorio?")) {
      reminders[dateKey].splice(idx, 1);
      if (reminders[dateKey].length === 0) delete reminders[dateKey];
      saveReminders(reminders);
      renderReminderList(dateKey);
      renderCalendar(currentMonth, currentYear);
      updateReminderCount();
      renderReminderSummary();
    }
  }
};

addNewReminderBtn.onclick = function () {
  reminderText.value = "";
  reminderCategory.value = "tarea";
  reminderEditIndex.value = "";
  saveReminderBtn.textContent = "Guardar";
  saveReminderBtn.style.display = "inline-block";
  deleteReminderBtn.style.display = "none";
  modalMode = "add";
  setTimeout(() => {
    reminderText.focus();
  }, 100);
};

reminderForm.onsubmit = function (e) {
  e.preventDefault();
  const dateKey = reminderDate.value;
  const text = reminderText.value.trim();
  const cat = reminderCategory.value;
  if (!text) return;
  if (!reminders[dateKey]) reminders[dateKey] = [];
  if (modalMode === "edit" && reminderEditIndex.value !== "") {
    reminders[dateKey][+reminderEditIndex.value] = { text, cat };
  } else {
    reminders[dateKey].push({ text, cat });
  }
  saveReminders(reminders);
  renderReminderList(dateKey);
  renderCalendar(currentMonth, currentYear);
  updateReminderCount();
  renderReminderSummary();
  // Limpiar input para agregar otro
  reminderText.value = "";
  reminderCategory.value = "tarea";
  reminderEditIndex.value = "";
  saveReminderBtn.textContent = "Guardar";
  saveReminderBtn.style.display = "inline-block";
  deleteReminderBtn.style.display = "none";
  modalMode = "add";
  setTimeout(() => {
    reminderText.focus();
  }, 100);
};

deleteReminderBtn.onclick = function () {
  const dateKey = reminderDate.value;
  const idx = +reminderEditIndex.value;
  if (reminders[dateKey] && reminders[dateKey][idx]) {
    reminders[dateKey].splice(idx, 1);
    if (reminders[dateKey].length === 0) delete reminders[dateKey];
    saveReminders(reminders);
    renderReminderList(dateKey);
    renderCalendar(currentMonth, currentYear);
    updateReminderCount();
    renderReminderSummary();
    reminderText.value = "";
    reminderCategory.value = "tarea";
    reminderEditIndex.value = "";
    saveReminderBtn.textContent = "Guardar";
    saveReminderBtn.style.display = "inline-block";
    deleteReminderBtn.style.display = "none";
    modalMode = "add";
    setTimeout(() => {
      reminderText.focus();
    }, 100);
  }
};

closeReminderModal.onclick = closeReminder;
cancelReminderBtn.onclick = function (e) {
  e.preventDefault();
  closeReminder();
};
reminderModal.onclick = function (e) {
  if (e.target === reminderModal) closeReminder();
};
function closeReminder() {
  reminderModal.style.display = "none";
  reminderModal.setAttribute("aria-hidden", "true");
}

// --- Accesibilidad: navegación con teclado, roles ARIA ---
reminderModal.setAttribute("tabindex", "-1");
reminderModal.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeReminder();
});
reminderText.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    saveReminderBtn.click();
  }
});

// Sincroniza entre pestañas
window.addEventListener("storage", function (e) {
  if (e.key === "reminders_calendar") {
    reminders = getReminders();
    renderCalendar(currentMonth, currentYear);
    updateReminderCount();
    renderReminderSummary();
  }
});

// Inicialización
renderCalendar(currentMonth, currentYear);
updateReminderCount();
renderReminderSummary();
