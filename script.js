document.addEventListener('DOMContentLoaded', () => {
    // Controle do Painel
    const btnAcessibilidade = document.getElementById('btn-acessibilidade-fixo');
    const painel = document.getElementById('painel-acessibilidade');
    
    btnAcessibilidade.addEventListener('click', () => {
        painel.classList.toggle('oculto');
    });

    // Aumento/Diminuição de Fonte
    let tamanhoAtual = 18;
    document.getElementById('btn-fonte-mais').addEventListener('click', () => {
        if(tamanhoAtual < 26) tamanhoAtual += 2;
        document.documentElement.style.setProperty('--tamanho-fonte', `${tamanhoAtual}px`);
    });

    document.getElementById('btn-fonte-menos').addEventListener('click', () => {
        if(tamanhoAtual > 14) tamanhoAtual -= 2;
        document.documentElement.style.setProperty('--tamanho-fonte', `${tamanhoAtual}px`);
    });

    // Alto Contraste
    document.getElementById('btn-contraste').addEventListener('click', () => {
        document.body.classList.toggle('alto-contraste');
    });

    // Lógica Básica de Leitura
    const sinteseFala = window.speechSynthesis;
    let lendo = false;
    document.getElementById('btn-ouvir').addEventListener('click', () => {
        if (lendo) {
            sinteseFala.cancel();
            lendo = false;
        } else {
            const texto = document.body.innerText;
            const fala = new SpeechSynthesisUtterance(texto);
            fala.lang = 'pt-BR';
            sinteseFala.speak(fala);
            lendo = true;
        }
    });
});