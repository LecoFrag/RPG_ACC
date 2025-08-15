document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURAÇÕES ---
    const CORRECT_PASSWORD = 'recuperacao';

    // --- ELEMENTOS DA UI ---
    const loginContainer = document.getElementById('login-container');
    const emailContainer = document.getElementById('email-container');
    const passwordInput = document.getElementById('password-input');
    const loginBtn = document.getElementById('login-btn');
    const errorMessage = document.getElementById('error-message');

    const viewVideoBtn = document.getElementById('view-video-btn');
    const videoOverlay = document.getElementById('video-overlay');
    const missionVideo = document.getElementById('mission-video');
    const closeVideoBtn = document.getElementById('close-video-btn');

    const responseInput = document.getElementById('response-input');
    const sendResponseBtn = document.getElementById('send-response-btn');

    const deletingOverlay = document.getElementById('deleting-overlay');
    const deletingText = document.getElementById('deleting-text');

    // --- ÁUDIO ---
    const deleteSound = new Audio('msg_apagada.mp3');
    deleteSound.volume = 0.7;

    // --- FUNÇÕES ---

    function handleLogin() {
        if (passwordInput.value.trim().toLowerCase() === CORRECT_PASSWORD) {
            loginContainer.classList.add('hidden');
            emailContainer.classList.remove('hidden');
        } else {
            errorMessage.classList.remove('hidden');
            passwordInput.value = '';
        }
    }

    function startSelfDestruct() {
        deleteSound.play();
        emailContainer.classList.add('hidden');
        deletingOverlay.classList.remove('hidden');

        deletingText.textContent = "AUTENTICANDO RESPOSTA...\nPROTOCOLO DE SEGURANÇA ATIVADO.\nESTA MENSAGEM SERÁ APAGADA EM 3...";

        let countdown = 2;
        const countdownInterval = setInterval(() => {
            if (countdown > 0) {
                deletingText.textContent += ` ${countdown}...`;
                countdown--;
            } else {
                clearInterval(countdownInterval);
                glitchEffect();
            }
        }, 1000);
    }

    function glitchEffect() {
        const originalText = document.getElementById('email-body').innerText;
        let textChars = originalText.split('');
        let iteration = 0;

        const glitchInterval = setInterval(() => {
            const scrambledText = textChars.map((char, index) => {
                if (char === ' ' || char === '\n' || index < iteration) {
                    return char;
                }
                const randomChar = '§*#%&@!?$';
                return randomChar[Math.floor(Math.random() * randomChar.length)];
            }).join('');

            deletingText.textContent = scrambledText;

            if (iteration >= textChars.length) {
                clearInterval(glitchInterval);
                deletingText.textContent = "\n\n...PURGA DE DADOS COMPLETA...\n\nCONEXÃO ENCERRADA.";
            }

            iteration += 25; // Aumenta a velocidade da "deleção"
        }, 50);
    }


    // --- EVENT LISTENERS ---

    // Eventos de Login
    loginBtn.addEventListener('click', handleLogin);
    passwordInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });

    // Eventos de Vídeo
    viewVideoBtn.addEventListener('click', () => {
        videoOverlay.classList.remove('hidden');
        missionVideo.play();
    });

    closeVideoBtn.addEventListener('click', () => {
        videoOverlay.classList.add('hidden');
        missionVideo.pause();
        missionVideo.currentTime = 0;
    });

    // Eventos de Resposta
    sendResponseBtn.addEventListener('click', () => {
        if (responseInput.value.trim().toLowerCase() === 'aceito') {
            startSelfDestruct();
        }
    });

    responseInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && responseInput.value.trim().toLowerCase() === 'aceito') {
            startSelfDestruct();
        }
    });

});