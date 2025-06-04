document.addEventListener('DOMContentLoaded', function() {
    // Menú lateral
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

    // Avatar predeterminado y modal
    const perfilAvatar = document.getElementById('perfilAvatar');
    const perfilAvatarImg = document.getElementById('perfilAvatarImg');
    const avatarModalOverlay = document.getElementById('avatarModalOverlay');
    const cerrarAvatarModal = document.getElementById('cerrarAvatarModal');

    if (perfilAvatar && avatarModalOverlay) {
        perfilAvatar.addEventListener('click', function(e) {
            // Evita conflicto con botón de refresh
            if (e.target.classList.contains('perfil-avatar-refresh') || e.target.closest('.perfil-avatar-refresh')) return;
            avatarModalOverlay.style.display = 'flex';
            avatarModalOverlay.classList.add('active');
        });
    }
    if (cerrarAvatarModal && avatarModalOverlay) {
        cerrarAvatarModal.onclick = function() {
            avatarModalOverlay.style.display = 'none';
            avatarModalOverlay.classList.remove('active');
        };
    }
    if (avatarModalOverlay) {
        avatarModalOverlay.onclick = function(e) {
            if (e.target === avatarModalOverlay) {
                avatarModalOverlay.style.display = 'none';
                avatarModalOverlay.classList.remove('active');
            }
        };
    }
    if (perfilAvatarImg && avatarModalOverlay) {
        document.querySelectorAll('.avatar-pick-btn img').forEach(btn => {
            btn.parentElement.onclick = function() {
                perfilAvatarImg.src = btn.src;
                avatarModalOverlay.style.display = 'none';
                avatarModalOverlay.classList.remove('active');
            };
        });
    }

    // Avatar editable (subir imagen)
    const cambiarAvatarBtn = document.getElementById('cambiarAvatarBtn');
    const inputAvatar = document.getElementById('inputAvatar');
    if (cambiarAvatarBtn && inputAvatar && perfilAvatarImg) {
        cambiarAvatarBtn.onclick = (e) => {
            e.stopPropagation();
            inputAvatar.click();
        };
        inputAvatar.onchange = function() {
            if (inputAvatar.files && inputAvatar.files[0]) {
                const reader = new FileReader();
                reader.onload = function(ev) {
                    perfilAvatarImg.src = ev.target.result;
                };
                reader.readAsDataURL(inputAvatar.files[0]);
            }
        };
    }

    // Inputs: selecciona texto al hacer click en el lápiz
    document.querySelectorAll('.perfil-edit').forEach(function(editIcon) {
        editIcon.onclick = function() {
            const input = this.parentElement.querySelector('.perfil-input');
            if (input) {
                input.focus();
                input.select && input.select();
            }
        };
    });

    // Botones de acción (simulados)
    document.getElementById('cambiarTelefonoBtn')?.addEventListener('click', function() {
        alert('Funcionalidad para cambiar teléfono próximamente.');
    });
    document.getElementById('cambiarEmailBtn')?.addEventListener('click', function() {
        alert('Funcionalidad para cambiar email próximamente.');
    });
    document.getElementById('borrarCuentaBtn')?.addEventListener('click', function() {
        if (confirm('¿Seguro que deseas borrar tu cuenta? Esta acción no se puede deshacer.')) {
            alert('Cuenta borrada (simulado)');
        }
    });
    document.getElementById('logoutBtn')?.addEventListener('click', function() {
        alert('Sesión cerrada (simulado)');
    });

    // Color dot (simulado)
    document.getElementById('perfilColorDot')?.addEventListener('click', function() {
        alert('Selector de color próximamente.');
    });

    // --- MODO OSCURO ---
    const darkModeBtn = document.getElementById('darkModeBtn');
    darkModeBtn?.addEventListener('click', function() {
        document.body.classList.toggle('darkmode');
        // Puedes guardar preferencia en localStorage si quieres persistencia
        // localStorage.setItem('darkmode', document.body.classList.contains('darkmode') ? '1' : '0');
    });

    // Si quieres que recuerde el modo oscuro:
    // if (localStorage.getItem('darkmode') === '1') document.body.classList.add('darkmode');
});
