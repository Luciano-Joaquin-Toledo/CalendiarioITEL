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

// --- Selector de iconos de perfil ---
const profileReloadBtn = document.getElementById("profileReloadBtn");
const iconSelector = document.getElementById("iconSelector");
const profileImage = document.getElementById("profileImage");
const profileImagePlaceholder = document.getElementById(
  "profileImagePlaceholder"
);
const iconOptions = () => iconSelector.querySelectorAll(".icon-option");

profileReloadBtn.onclick = function (e) {
  iconSelector.style.display =
    iconSelector.style.display === "block" ? "none" : "block";
  e.stopPropagation();
};

iconOptions().forEach((img) => {
  img.onclick = function () {
    profileImage.src = img.src;
    profileImage.style.display = "block";
    profileImagePlaceholder.style.display = "none";
    iconSelector.style.display = "none";
  };
});

// Cierra el selector si se hace click fuera
document.addEventListener("mousedown", function (e) {
  if (
    iconSelector.style.display === "block" &&
    !iconSelector.contains(e.target) &&
    e.target !== profileReloadBtn
  ) {
    iconSelector.style.display = "none";
  }
});
