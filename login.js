// Mostrar/ocultar formularios de login y registro
const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');

// Elementos del modal
const errorModal = document.getElementById('error-modal');
const modalErrorMessage = document.getElementById('modal-error-message');
const closeModal = document.getElementById('close-modal');

// Función para mostrar el modal con un mensaje de error
function showErrorModal(message) {
    modalErrorMessage.textContent = message;
    errorModal.style.display = 'flex';
}

// Cerrar el modal al hacer clic en la "X"
closeModal.addEventListener('click', () => {
    errorModal.style.display = 'none';
});

// Cerrar el modal al hacer clic fuera del contenido
window.addEventListener('click', (e) => {
    if (e.target === errorModal) {
        errorModal.style.display = 'none';
    }
});

// Mostrar/ocultar formularios
showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginSection.style.display = 'none';
    registerSection.style.display = 'block';
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginSection.style.display = 'block';
    registerSection.style.display = 'none';
});

// Manejar el formulario de login
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validar campos vacíos
    if (!email || !password) {
        showErrorModal('Por favor, completa todos los campos.');
        return;
    }

    // Validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showErrorModal('Por favor, ingresa un correo válido.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(result.user));
            window.location.href = 'index.html';
        } else {
            showErrorModal(result.message || 'Correo o contraseña incorrectos.');
        }
    } catch (error) {
        console.error('Error en login:', error.message);
        showErrorModal('Error al conectar con el servidor. Intenta de nuevo.');
    }
});

// Manejar el formulario de registro
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value.trim();

    // Validar campos vacíos
    if (!name || !email || !password) {
        showErrorModal('Por favor, completa todos los campos.');
        return;
    }

    // Validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showErrorModal('Por favor, ingresa un correo válido.');
        return;
    }

    // Validar longitud de la contraseña (mínimo 6 caracteres)
    if (password.length < 6) {
        showErrorModal('La contraseña debe tener al menos 6 caracteres.');
        return;
    }

    try {
        console.log('Enviando datos de registro:', { name, email, password });
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        console.log('Estado de la respuesta:', response.status, response.statusText);
        if (!response.ok) {
            const errorText = await response.text();
            console.log('Cuerpo del error:', errorText);
            throw new Error(`Error del servidor: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const result = await response.json();
        console.log('Resultado del servidor:', result);

        if (response.ok) {
            alert('Registro exitoso. Por favor, inicia sesión.');
            loginSection.style.display = 'block';
            registerSection.style.display = 'none';
            document.getElementById('register-form').reset();
        } else {
            showErrorModal(result.message || 'Error al registrarse.');
        }
    } catch (error) {
        console.error('Error detallado en registro:', error.message);
        showErrorModal(error

.message || 'Error al conectar con el servidor. Intenta de nuevo.');
    }
});