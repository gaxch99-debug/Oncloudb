document.addEventListener('DOMContentLoaded', () => {
    // Seleção dos elementos do menu
    const btnAcessibilidade = document.getElementById('btn-acessibilidade');
    const painelAcessibilidade = document.getElementById('painel-acessibilidade');
    const btnFechar = document.getElementById('fechar-acessibilidade');

    // Botões de Ação
    const btnAumentarFonte = document.getElementById('aumentar-fonte');
    const btnDiminuirFonte = document.getElementById('diminuir-fonte');
    const btnResetarFonte = document.getElementById('resetar-fonte');
    const btnToggleContraste = document.getElementById('toggle-contraste');
    const btnToggleLinks = document.getElementById('toggle-links');
    const btnToggleEspacamento = document.getElementById('toggle-espacamento');
    const btnResetarTudo = document.getElementById('resetar-tudo');

    // Estado Atual
    let tamanhoFonte = parseInt(localStorage.getItem('acc_fonte')) || 100;
    let altoContraste = localStorage.getItem('acc_contraste') === 'true';
    let destacarLinks = localStorage.getItem('acc_links') === 'true';
    let espacamento = localStorage.getItem('acc_espacamento') === 'true';

    // Aplica as preferências salvas no site
    function aplicarPreferencias() {
        // Fonte
        document.documentElement.style.fontSize = `${tamanhoFonte}%`;
        localStorage.setItem('acc_fonte', tamanhoFonte);

        // Alto Contraste
        if (altoContraste) {
            document.body.classList.add('alto-contraste');
            if (btnToggleContraste) btnToggleContraste.classList.add('ativo');
        } else {
            document.body.classList.remove('alto-contraste');
            if (btnToggleContraste) btnToggleContraste.classList.remove('ativo');
        }
        localStorage.setItem('acc_contraste', altoContraste);

        // Destacar Links
        if (destacarLinks) {
            document.body.classList.add('destacar-links');
            if (btnToggleLinks) btnToggleLinks.classList.add('ativo');
        } else {
            document.body.classList.remove('destacar-links');
            if (btnToggleLinks) btnToggleLinks.classList.remove('ativo');
        }
        localStorage.setItem('acc_links', destacarLinks);

        // Espaçamento
        if (espacamento) {
            document.body.classList.add('espacamento-aumentado');
            if (btnToggleEspacamento) btnToggleEspacamento.classList.add('ativo');
        } else {
            document.body.classList.remove('espacamento-aumentado');
            if (btnToggleEspacamento) btnToggleEspacamento.classList.remove('ativo');
        }
        localStorage.setItem('acc_espacamento', espacamento);
    }

    // Inicializa as preferências salvas ao carregar
    aplicarPreferencias();

    // Funções de Abrir/Fechar o Painel com suporte ARIA
    function abrirPainel() {
        if (!painelAcessibilidade) return;
        painelAcessibilidade.classList.remove('hidden');
        painelAcessibilidade.setAttribute('aria-hidden', 'false');
        if (btnAcessibilidade) btnAcessibilidade.setAttribute('aria-expanded', 'true');
    }

    function fecharPainel() {
        if (!painelAcessibilidade) return;
        painelAcessibilidade.classList.add('hidden');
        painelAcessibilidade.setAttribute('aria-hidden', 'true');
        if (btnAcessibilidade) btnAcessibilidade.setAttribute('aria-expanded', 'false');
    }

    // Eventos do Painel
    if (btnAcessibilidade) {
        btnAcessibilidade.addEventListener('click', (e) => {
            e.stopPropagation();
            if (painelAcessibilidade && painelAcessibilidade.classList.contains('hidden')) {
                abrirPainel();
            } else {
                fecharPainel();
            }
        });
    }

    if (btnFechar) {
        btnFechar.addEventListener('click', () => {
            fecharPainel();
        });
    }

    // Fechar ao clicar fora do painel
    document.addEventListener('click', (e) => {
        if (
            painelAcessibilidade && 
            !painelAcessibilidade.contains(e.target) && 
            btnAcessibilidade && 
            !btnAcessibilidade.contains(e.target)
        ) {
            fecharPainel();
        }
    });

    // Fechar ao pressionar a tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            fecharPainel();
        }
    });

    // Eventos dos botões de controle
    if (btnAumentarFonte) {
        btnAumentarFonte.addEventListener('click', () => {
            if (tamanhoFonte < 140) {
                tamanhoFonte += 10;
                aplicarPreferencias();
            }
        });
    }

    if (btnDiminuirFonte) {
        btnDiminuirFonte.addEventListener('click', () => {
            if (tamanhoFonte > 80) {
                tamanhoFonte -= 10;
                aplicarPreferencias();
            }
        });
    }

    if (btnResetarFonte) {
        btnResetarFonte.addEventListener('click', () => {
            tamanhoFonte = 100;
            aplicarPreferencias();
        });
    }

    if (btnToggleContraste) {
        btnToggleContraste.addEventListener('click', () => {
            altoContraste = !altoContraste;
            aplicarPreferencias();
        });
    }

    if (btnToggleLinks) {
        btnToggleLinks.addEventListener('click', () => {
            destacarLinks = !destacarLinks;
            aplicarPreferencias();
        });
    }

    if (btnToggleEspacamento) {
        btnToggleEspacamento.addEventListener('click', () => {
            espacamento = !espacamento;
            aplicarPreferencias();
        });
    }

    if (btnResetarTudo) {
        btnResetarTudo.addEventListener('click', () => {
            tamanhoFonte = 100;
            altoContraste = false;
            destacarLinks = false;
            espacamento = false;
            aplicarPreferencias();
        });
    }
});