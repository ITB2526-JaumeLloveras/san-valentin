// ==================== CONFIGURACIÓN ====================
const CORRECT_PASSWORD = "122333444455555"; // Cambia esta contraseña

// ==================== NAVEGACIÓN ENTRE PANTALLAS ====================
function nextScreen(screenNumber) {
    // Ocultar todas las pantallas
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Mostrar la pantalla solicitada
    const targetScreen = document.getElementById('screen' + screenNumber);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

function showYesScreen() {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById('yesScreen').classList.add('active');
    closeModal();
    
    // Crear confeti
    createConfetti();
}

function showConfirmScreen() {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById('confirmScreen').classList.add('active');
}

function showMovingButtonScreen() {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById('movingButtonScreen').classList.add('active');
    
    // Inicializar el botón que se mueve
    setTimeout(() => {
        initMovingButton();
    }, 500);
}

function showCancelScreen() {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById('cancelScreen').classList.add('active');
    closeModal();
}

function showNoScreen() {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById('noScreen').classList.add('active');
    closeModal();
}

// ==================== BOTÓN QUE SE MUEVE ====================
function initMovingButton() {
    const movingBtn = document.getElementById('movingNoBtn');
    if (!movingBtn) return;
    
    let moveCount = 0;
    const maxMoves = 15; // Después de 15 intentos, permitir hacer clic
    
    function moveButton() {
        if (moveCount >= maxMoves) {
            // Después de 15 intentos, permitir hacer clic
            movingBtn.style.position = 'relative';
            movingBtn.onclick = showPasswordModal;
            movingBtn.textContent = 'NO (¡Lo lograste!)';
            return;
        }
        
        const container = movingBtn.parentElement;
        const containerRect = container.getBoundingClientRect();
        const btnRect = movingBtn.getBoundingClientRect();
        
        // Calcular posición aleatoria
        const maxX = containerRect.width - btnRect.width - 40;
        const maxY = containerRect.height - btnRect.height - 40;
        
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        movingBtn.style.position = 'absolute';
        movingBtn.style.left = randomX + 'px';
        movingBtn.style.top = randomY + 'px';
        
        moveCount++;
    }
    
    // Mover el botón cuando el cursor se acerca
    movingBtn.addEventListener('mouseenter', moveButton);
    movingBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveButton();
    });
    
    // También mover al intentar hacer clic
    movingBtn.addEventListener('click', (e) => {
        if (moveCount < maxMoves) {
            e.preventDefault();
            moveButton();
        }
    });
}

// ==================== MODAL DE CONTRASEÑA ====================
function showPasswordModal() {
    const modal = document.getElementById('passwordModal');
    const passwordInput = document.getElementById('passwordInput');
    const errorMessage = document.getElementById('errorMessage');
    
    passwordInput.value = '';
    errorMessage.classList.remove('show');
    
    modal.classList.add('active');
    
    // Enfocar el input después de un pequeño delay
    setTimeout(() => {
        passwordInput.focus();
    }, 300);
}

function closeModal() {
    const modal = document.getElementById('passwordModal');
    modal.classList.remove('active');
}

// ==================== VERIFICACIÓN DE CONTRASEÑA ====================
function verifyPassword() {
    const passwordInput = document.getElementById('passwordInput');
    const errorMessage = document.getElementById('errorMessage');
    const enteredPassword = passwordInput.value.trim();
    
    if (!enteredPassword) {
        showError('Por favor ingresa una contraseña');
        return;
    }
    
    if (enteredPassword === CORRECT_PASSWORD) {
        // Contraseña correcta - mostrar pantalla de "NO"
        showNoScreen();
    } else {
        // Contraseña incorrecta - pueden intentar de nuevo
        showError('❌ Contraseña incorrecta. Intenta de nuevo');
        passwordInput.value = '';
        passwordInput.focus();
    }
}

function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    
    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 3000);
}

// ==================== CONFETI ====================
function createConfetti() {
    const colors = ['💕', '💖', '💗', '💝', '💓', '❤️', '💜', '💙'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.fontSize = Math.random() * 20 + 20 + 'px';
            confetti.textContent = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-50px';
            confetti.style.zIndex = '10000';
            confetti.style.pointerEvents = 'none';
            
            document.body.appendChild(confetti);
            
            const fallDuration = Math.random() * 3000 + 2000;
            const rotation = Math.random() * 720 - 360;
            
            const animation = confetti.animate([
                { 
                    transform: 'translateY(0) rotate(0deg)', 
                    opacity: 1 
                },
                { 
                    transform: `translateY(${window.innerHeight + 100}px) rotate(${rotation}deg)`, 
                    opacity: 0 
                }
            ], {
                duration: fallDuration,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            animation.onfinish = () => confetti.remove();
        }, i * 30);
    }
    
    // Confeti continuo
    const confettiInterval = setInterval(() => {
        for (let i = 0; i < 3; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.fontSize = Math.random() * 20 + 20 + 'px';
            confetti.textContent = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-50px';
            confetti.style.zIndex = '10000';
            confetti.style.pointerEvents = 'none';
            
            document.body.appendChild(confetti);
            
            const animation = confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 720 - 360}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            animation.onfinish = () => confetti.remove();
        }
    }, 2000);
}

// ==================== EVENT LISTENERS ====================
document.addEventListener('DOMContentLoaded', function() {
    // Botón verificar contraseña
    const submitPassword = document.getElementById('submitPassword');
    if (submitPassword) {
        submitPassword.addEventListener('click', verifyPassword);
    }
    
    // Enter en input de contraseña
    const passwordInput = document.getElementById('passwordInput');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                verifyPassword();
            }
        });
    }
    
    // Botón cancelar
    const cancelPassword = document.getElementById('cancelPassword');
    if (cancelPassword) {
        cancelPassword.addEventListener('click', showCancelScreen);
    }
    
    // Cerrar modal al hacer clic fuera
    const modal = document.getElementById('passwordModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                showCancelScreen();
            }
        });
    }
});