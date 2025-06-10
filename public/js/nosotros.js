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

// Renderizado dinámico de integrantes with avatar e íconos accesibles
document.addEventListener("DOMContentLoaded", function () {
  const integrantes = [
    {
      nombre: "Arguello Leylen",
      avatar: "AL",
      contactos: [
        { tipo: "linkedin", url: "https://linkedin.com/", title: "LinkedIn" },
        { tipo: "mail", url: "mailto:leylen@email.com", title: "Mail" },
      ],
    },
    {
      nombre: "Benítez Nicolas",
      avatar: "BN",
      contactos: [
        { tipo: "github", url: "https://github.com/", title: "GitHub" },
        { tipo: "mail", url: "mailto:nicolas@email.com", title: "Mail" },
      ],
    },
    {
      nombre: "Bogado Micaela",
      avatar: "BM",
      contactos: [
        { tipo: "linkedin", url: "https://linkedin.com/", title: "LinkedIn" },
      ],
    },
    {
      nombre: "Gomez Demian",
      avatar: "GD",
      contactos: [
        { tipo: "github", url: "https://github.com/", title: "GitHub" },
      ],
    },
    {
      nombre: "Llamosas Santiago",
      avatar: "LS",
      contactos: [
        { tipo: "mail", url: "mailto:santiago@email.com", title: "Mail" },
      ],
    },
    {
      nombre: "Luque Agustín",
      avatar: "LA",
      contactos: [
        { tipo: "linkedin", url: "https://linkedin.com/", title: "LinkedIn" },
      ],
    },
    {
      nombre: "Quiroz Martina",
      avatar: "QM",
      contactos: [
        { tipo: "mail", url: "mailto:martina@email.com", title: "Mail" },
      ],
    },
    {
      nombre: "Sotelo Tobias",
      avatar: "ST",
      contactos: [
        { tipo: "github", url: "https://github.com/", title: "GitHub" },
      ],
    },
    {
      nombre: "Soveron Valentín",
      avatar: "SV",
      contactos: [
        { tipo: "linkedin", url: "https://linkedin.com/", title: "LinkedIn" },
      ],
    },
    {
      nombre: "Toledo Luciano",
      avatar: "TL",
      contactos: [
        { tipo: "mail", url: "mailto:luciano@email.com", title: "Mail" },
      ],
    },
  ];
  const iconos = {
    linkedin: `<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 10.268h-3v-4.604c0-1.099-.021-2.513-1.532-2.513-1.532 0-1.767 1.197-1.767 2.434v4.683h-3v-9h2.881v1.233h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.599v4.731z"/></svg>`,
    github: `<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576 4.765-1.589 8.2-6.085 8.2-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
    mail: `<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 13.065l-11.985-8.065v17h24v-17l-12.015 8.065zm11.985-10.065h-23.97l11.985 8.065 11.985-8.065z"/></svg>`,
  };
  const lista = document.getElementById("integrantes-list");
  lista.innerHTML = "";
  integrantes.forEach((int, idx) => {
    let fondo =
      idx % 2 === 1
        ? "background:#e8daf6;border-radius:0.4em;padding:0.22em 0.6em;"
        : "";
    let html =
      `<div style="color:#222;margin-bottom:0.5em;display:flex;align-items:center;justify-content:space-between;gap:0.7em;${fondo}">
                <span class="integrante-nombre">
                    <span class="avatar">${int.avatar}</span>
                    ${int.nombre}
                </span>
                <span class="integrante-contactos" style="display:flex;gap:0.18em;">` +
      int.contactos
        .map(
          (c) =>
            `<a href="${c.url}" target="_blank" title="${
              c.title
            }" aria-label="${c.title}">${iconos[c.tipo]}</a>`
        )
        .join("") +
      `</span>
            </div>`;
    lista.innerHTML += html;
    // Separador visual cada 4 integrantes
    if ((idx + 1) % 4 === 0 && idx !== integrantes.length - 1) {
      lista.innerHTML += `<div class="integrante-separador"></div>`;
    }
  });
});
