document.addEventListener('DOMContentLoaded', () => {
    // Variável para controlar se o áudio está ativo
    let audioAtivo = false;
    
    // Objeto de síntese de fala do navegador
    const sinteseFala = window.speechSynthesis;
    const btnAudio = document.getElementById('btn-audio');

    // Alternar estado do áudio
    btnAudio.addEventListener('click', () => {
        audioAtivo = !audioAtivo;
        
        if (audioAtivo) {
            btnAudio.textContent = "🔈 Áudio Ativado - Passe o mouse nos textos";
            btnAudio.style.backgroundColor = "var(--cor-foco)";
        } else {
            btnAudio.textContent = "🔊 Ativar Leitura por Áudio";
            btnAudio.style.backgroundColor = "var(--texto-destaque)";
            sinteseFala.cancel(); // Para qualquer leitura em andamento
        }
    });

    // Seleciona todos os elementos que devem ser lidos
    const elementosLeitura = document.querySelectorAll('.leitura-audio');

    elementosLeitura.forEach(elemento => {
        // Leitura ao passar o mouse (Mouseover)
        elemento.addEventListener('mouseenter', () => {
            if (audioAtivo) {
                lerTexto(elemento.textContent);
            }
        });

        // Interrompe a leitura ao tirar o mouse (Mouseleave)
        elemento.addEventListener('mouseleave', () => {
            sinteseFala.cancel();
        });

        // Acessibilidade por teclado (Foco)
        elemento.addEventListener('focus', () => {
            if (audioAtivo) {
                lerTexto(elemento.textContent);
            }
        });

        // Interrompe ao perder o foco (Blur)
        elemento.addEventListener('blur', () => {
            sinteseFala.cancel();
        });
    });

    // Função que configura e executa a voz
    function lerTexto(texto) {
        sinteseFala.cancel(); // Para audios sobrepostos
        const pronunciamento = new SpeechSynthesisUtterance(texto);
        pronunciamento.lang = 'pt-BR';
        pronunciamento.rate = 1.0; // Velocidade normal da fala
        pronunciamento.pitch = 1.0; // Tom normal
        sinteseFala.speak(pronunciamento);
    }
});