document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Controle de Leitura por Áudio (Text-to-Speech)
    // ----------------------------------------------------
    let audioAtivo = false;
    const sinteseFala = window.speechSynthesis;
    const btnAudio = document.getElementById('btn-audio');

    btnAudio.addEventListener('click', () => {
        audioAtivo = !audioAtivo;
        
        if (audioAtivo) {
            btnAudio.textContent = "🔈 Desativar Leitura por Áudio";
            btnAudio.style.opacity = "0.9";
        } else {
            btnAudio.textContent = "🔊 Ativar Leitura por Áudio";
            btnAudio.style.opacity = "1";
            sinteseFala.cancel();
        }
    });

    const elementosLeitura = document.querySelectorAll('.leitura-audio');

    elementosLeitura.forEach(elemento => {
        // Leitura ao passar o mouse
        elemento.addEventListener('mouseenter', () => {
            if (audioAtivo) lerTexto(elemento.textContent);
        });

        elemento.addEventListener('mouseleave', () => {
            if (audioAtivo) sinteseFala.cancel();
        });

        // Leitura ao navegar via Teclado (Tab)
        elemento.addEventListener('focus', () => {
            if (audioAtivo) lerTexto(elemento.textContent);
        });

        elemento.addEventListener('blur', () => {
            if (audioAtivo) sinteseFala.cancel();
        });
    });

    function lerTexto(texto) {
        sinteseFala.cancel();
        const pronunciamento = new SpeechSynthesisUtterance(texto);
        pronunciamento.lang = 'pt-BR';
        pronunciamento.rate = 1.0;
        sinteseFala.speak(pronunciamento);
    }

    // ----------------------------------------------------
    // 2. Alternador de Modo Claro / Modo Escuro
    // ----------------------------------------------------
    const btnTema = document.getElementById('btn-tema');

    btnTema.addEventListener('click', () => {
        document.body.classList.toggle('modo-escuro');
        const estaNoModoEscuro = document.body.classList.contains('modo-escuro');

        if (estaNoModoEscuro) {
            btnTema.textContent = "☀️ Modo Claro";
            btnTema.setAttribute('aria-label', 'Alternar para o modo claro');
        } else {
            btnTema.textContent = "🌓 Modo Escuro";
            btnTema.setAttribute('aria-label', 'Alternar para o modo escuro');
        }
    });
});