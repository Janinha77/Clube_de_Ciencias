document.addEventListener('DOMContentLoaded', () => {
    let audioAtivo = false;
    const sinteseFala = window.speechSynthesis;
    const btnAudio = document.getElementById('btn-audio');

    // Alterna o estado do botão de áudio
    btnAudio.addEventListener('click', () => {
        audioAtivo = !audioAtivo;
        
        if (audioAtivo) {
            btnAudio.textContent = "🔈 Áudio Ativado - Passe o mouse ou foque nos textos";
            btnAudio.style.backgroundColor = "var(--cor-foco)";
            btnAudio.style.color = "#000000";
        } else {
            btnAudio.textContent = "🔊 Ativar Leitura por Áudio";
            btnAudio.style.backgroundColor = "var(--texto-destaque)";
            btnAudio.style.color = "var(--fundo-principal)";
            sinteseFala.cancel();
        }
    });

    // Seleciona todos os elementos marcados para leitura
    const elementosLeitura = document.querySelectorAll('.leitura-audio');

    elementosLeitura.forEach(elemento => {
        // Leitura via mouse
        elemento.addEventListener('mouseenter', () => {
            if (audioAtivo) {
                lerTexto(elemento.textContent);
            }
        });

        elemento.addEventListener('mouseleave', () => {
            if (audioAtivo) {
                sinteseFala.cancel();
            }
        });

        // Leitura via navegação por teclado (Tab)
        elemento.addEventListener('focus', () => {
            if (audioAtivo) {
                lerTexto(elemento.textContent);
            }
        });

        elemento.addEventListener('blur', () => {
            if (audioAtivo) {
                sinteseFala.cancel();
            }
        });
    });

    // Função de síntese de voz (Text-to-Speech)
    function lerTexto(texto) {
        sinteseFala.cancel();
        const pronunciamento = new SpeechSynthesisUtterance(texto);
        pronunciamento.lang = 'pt-BR';
        pronunciamento.rate = 1.0;
        pronunciamento.pitch = 1.0;
        sinteseFala.speak(pronunciamento);
    }
});