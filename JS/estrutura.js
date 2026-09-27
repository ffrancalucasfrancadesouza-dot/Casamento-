// ── Countdown ──
function updateCountdown() {
    const wedding = new Date('2026-11-01T18:00:00');
    const now = new Date();
    const diff = wedding - now;

    if (diff <= 0) {
        document.getElementById('countdown').innerHTML =
            '<p class="countdown-label" style="font-size:1.2rem;letter-spacing:.1em">🎉 Hoje é o grande dia!</p>';
        return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    document.getElementById('cd-dias').textContent = String(d).padStart(2, '0');
    document.getElementById('cd-horas').textContent = String(h).padStart(2, '0');
    document.getElementById('cd-min').textContent = String(m).padStart(2, '0');
    document.getElementById('cd-seg').textContent = String(s).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// --- RSVP ---

// ===============================
// RSVP - CONFIRMAÇÃO DE PRESENÇA
// ===============================

const campoConfirmacao = document.getElementById('f-conf');
const campoAcompanhante = document.getElementById('campo-acompanhante');


// Mostra ou esconde o campo de acompanhante
campoConfirmacao.addEventListener('change', function () {

    const inputAcompanhante = document.getElementById('f-acompanhante');

    if (this.value === 'nao') {

        // Esconde o acompanhante
        campoAcompanhante.style.display = 'none';

        // Limpa o campo
        inputAcompanhante.value = '';

    } else {

        // Mostra o acompanhante
        campoAcompanhante.style.display = 'block';

    }

});


// ===============================
// FUNÇÃO DE ENVIO
// ===============================

function submitRSVP() {

    const nome = document
        .getElementById('f-nome')
        .value
        .trim();

    const whatsapp = document
        .getElementById('f-whatsapp')
        .value
        .trim();

    const conf = document
        .getElementById('f-conf')
        .value;

    const acompanhante = document
        .getElementById('f-acompanhante')
        .value
        .trim();


    // ===============================
    // VALIDAÇÕES
    // ===============================

    if (!nome) {
        alert('Por favor, informe seu nome.');
        return;
    }

    if (!whatsapp) {
        alert('Por favor, informe seu WhatsApp.');
        return;
    }

    if (!conf) {
        alert('Por favor, selecione sua confirmação.');
        return;
    }


    // ===============================
    // PESSOA VAI AO CASAMENTO
    // ===============================

    if (conf === 'sim') {

        let mensagem;

        if (acompanhante) {

            mensagem =
                `Olá! Sou ${nome}.\n\n` +
                `Confirmo minha presença no casamento de Emily & Vinicius, ` +
                `que será realizado no dia 01/11/2026.\n\n` +
                `Meu acompanhante será: ${acompanhante}.\n\n` +
                `Meu WhatsApp: ${whatsapp}`;

        } else {

            mensagem =
                `Olá! Sou ${nome}.\n\n` +
                `Confirmo minha presença no casamento de Emily & Vinicius, ` +
                `que será realizado no dia 01/11/2026.\n\n` +
                `Irei sozinho.\n\n` +
                `Meu WhatsApp: ${whatsapp}`;
        }


        const numeroCerimonialista = '5567991116370';

        const url =
            `https://wa.me/${numeroCerimonialista}?text=` +
            `${encodeURIComponent(mensagem)}`;

        window.open(url, '_blank');


        // Mensagem exibida no site
        document.getElementById('form-wrap').style.display = 'none';

        document.getElementById('rsvp-titulo').textContent =
            'Presença confirmada!';

        document.getElementById('rsvp-mensagem').textContent =
            'Que alegria ter você conosco nesse dia tão especial!';

        document.getElementById('rsvp-success').style.display = 'block';

        return;
    }


    // ===============================
    // PESSOA NÃO VAI AO CASAMENTO
    // ===============================

    if (conf === 'nao') {

        const mensagem =
            `Olá! Sou ${nome}.\n\n` +
            `Infelizmente, não poderei comparecer ao casamento de ` +
            `Emily & Vinicius, que será realizado no dia 01/11/2026.\n\n` +
            `Sinto muito por não poder estar presente. ` +
            `Desejo um dia muito especial ao casal!\n\n` +
            `Meu WhatsApp: ${whatsapp}`;

        const numeroCerimonialista = '5567991116370';

        const url =
            `https://wa.me/${numeroCerimonialista}?text=` +
            `${encodeURIComponent(mensagem)}`;

        window.open(url, '_blank');


        // Mensagem exibida no site
        document.getElementById('form-wrap').style.display = 'none';

        document.getElementById('rsvp-titulo').textContent =
            'Que pena!';

        document.getElementById('rsvp-mensagem').textContent =
            'Sentiremos sua falta. Agradecemos por nos avisar!';

        document.getElementById('rsvp-success').style.display = 'block';

        return;
    }

}
// ── Intersection Observer: fade-in on scroll ──
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.tl-item, .presente-card, .local-card, .presentes-pix').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .7s ease, transform .7s ease';
    observer.observe(el);
});
function copiarPix() {

    const chave = document.getElementById('pix-chave').textContent.trim();

    const texto = document.getElementById('pix-copy-text');
    const icone = document.getElementById('pix-copy-icon');
    const feedback = document.getElementById('pix-feedback');

    navigator.clipboard.writeText(chave)
        .then(() => {

            texto.textContent = 'Chave copiada!';
            icone.textContent = '✓';

            feedback.classList.add('show');

            setTimeout(() => {

                texto.textContent = 'Copiar chave Pix';
                icone.textContent = '⧉';

                feedback.classList.remove('show');

            }, 2500);

        })
        .catch(() => {

            alert('Não foi possível copiar automaticamente. Chave Pix: ' + chave);

        });
}