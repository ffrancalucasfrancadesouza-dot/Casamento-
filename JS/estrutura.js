const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {

    navLinks.classList.toggle('active');

});
navLinks.querySelectorAll('a').forEach(link => {

    link.addEventListener('click', () => {

        navLinks.classList.remove('active');

    });

});
// ── Countdown ──
function updateCountdown() {
    const wedding = new Date('2026-11-01T16:00:00');
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

/* ================================
   CONFIRMAÇÃO DE PRESENÇA
================================ */

document.addEventListener("DOMContentLoaded", () => {

    /* ================================
       ELEMENTOS DO HTML
    ================================= */

    const form = document.getElementById("confirmationForm");

    const presenca = document.getElementById("presenca");

    const acompanhantesContainer =
        document.getElementById("acompanhantesContainer");

    const quantidadeAcompanhantes =
        document.getElementById("quantidadeAcompanhantes");

    const nomesAcompanhantes =
        document.getElementById("nomesAcompanhantes");

    const criancasContainer =
        document.getElementById("criancasContainer");

    const temCriancas =
        document.getElementById("temCriancas");

    const criancasFields =
        document.getElementById("criancasFields");

    const errorMessage =
        document.getElementById("confirmationError");

    const confirmationResult =
        document.getElementById("confirmationResult");

    const resultIcon =
        document.getElementById("resultIcon");

    const resultTitle =
        document.getElementById("resultTitle");

    const resultText =
        document.getElementById("resultText");

    const resultSubtext =
        document.getElementById("resultSubtext");

    const whatsapp =
        document.getElementById("whatsapp");


    /* ================================
       CONFIGURAÇÃO
    ================================= */

    const numeroCerimonialista = "556792460207";


    /* ================================
       ESTADO INICIAL
    ================================= */

    acompanhantesContainer.classList.add("hidden");

    criancasContainer.classList.add("hidden");


    /* ================================
       MOSTRAR RESULTADO
    ================================= */

    function mostrarResultado(tipo, nome) {

        // Esconde o formulário
        form.style.display = "none";

        // Remove estado anterior
        confirmationResult.classList.remove("declined");


        /* ================================
           PRESENÇA CONFIRMADA
        ================================= */

        if (tipo === "confirmado") {

            resultIcon.textContent = "✓";

            resultTitle.textContent =
                "Presença confirmada!";

            resultText.textContent =
                `Obrigado, ${nome}. Estamos felizes em ter você conosco nesse dia tão especial.`;

            resultSubtext.textContent =
                "Nos vemos no grande dia!";
        }


        /* ================================
           NÃO VAI
        ================================= */

        if (tipo === "recusado") {

            confirmationResult.classList.add("declined");

            resultIcon.textContent = "♡";

            resultTitle.textContent =
                "Que pena que você não poderá estar conosco.";

            resultText.textContent =
                "Agradecemos por nos avisar. Desejamos que você esteja bem e esperamos nos encontrar em outra ocasião.";

            resultSubtext.textContent =
                "Com carinho, Emily & Vinícius";
        }


        // Mostra a tela de resultado
        confirmationResult.classList.add("show");
    }


    /* ================================
       ALTERAÇÃO DA CONFIRMAÇÃO
    ================================= */

    presenca.addEventListener("change", () => {

        errorMessage.textContent = "";

        nomesAcompanhantes.innerHTML = "";

        criancasFields.innerHTML = "";

        quantidadeAcompanhantes.value = "0";

        temCriancas.value = "nao";


        if (presenca.value === "sim") {

            acompanhantesContainer.classList.remove("hidden");

            criancasContainer.classList.remove("hidden");

        } else {

            acompanhantesContainer.classList.add("hidden");

            criancasContainer.classList.add("hidden");
        }

    });


    /* ================================
       ACOMPANHANTES
    ================================= */

    quantidadeAcompanhantes.addEventListener("change", () => {

        const quantidade =
            Number(quantidadeAcompanhantes.value);

        nomesAcompanhantes.innerHTML = "";


        if (quantidade === 0) {

            return;
        }


        for (let i = 1; i <= quantidade; i++) {

            const campo =
                document.createElement("div");

            campo.classList.add("dynamic-field");

            campo.innerHTML = `
                <label for="acompanhante${i}">
                    Nome do acompanhante ${i}
                </label>

                <input
                    type="text"
                    id="acompanhante${i}"
                    name="acompanhante${i}"
                    placeholder="Nome completo"
                    required
                >
            `;

            nomesAcompanhantes.appendChild(campo);
        }

    });


    /* ================================
       CRIANÇAS
    ================================= */

    temCriancas.addEventListener("change", () => {

        criancasFields.innerHTML = "";


        if (temCriancas.value !== "sim") {

            return;
        }


        adicionarCrianca();

    });


    /* ================================
       ADICIONAR CRIANÇA
    ================================= */

    function adicionarCrianca() {

        const quantidadeAtual =
            criancasFields.querySelectorAll(".child-group").length;

        const numero =
            quantidadeAtual + 1;


        const childGroup =
            document.createElement("div");

        childGroup.classList.add("child-group");


        childGroup.innerHTML = `

            <div class="dynamic-fields">

                <div class="dynamic-field">

                    <label>
                        Nome da criança ${numero}
                    </label>

                    <input
                        type="text"
                        name="criancaNome${numero}"
                        placeholder="Nome completo"
                        required
                    >

                </div>


                <div class="dynamic-field">

                    <label>
                        Idade
                    </label>

                    <input
                        type="number"
                        name="criancaIdade${numero}"
                        placeholder="Idade"
                        min="0"
                        max="17"
                        required
                    >

                </div>

            </div>

        `;


        criancasFields.appendChild(childGroup);


        /* ================================
           BOTÃO ADICIONAR OUTRA CRIANÇA
        ================================= */

        const adicionarBotao =
            document.createElement("button");

        adicionarBotao.type = "button";

        adicionarBotao.classList.add(
            "add-child-button"
        );

        adicionarBotao.textContent =
            "+ Adicionar outra criança";


        adicionarBotao.addEventListener("click", () => {

            const totalCriancas =
                criancasFields.querySelectorAll(".child-group").length;


            if (totalCriancas >= 6) {

                return;
            }


            adicionarBotao.remove();

            adicionarCrianca();

        });


        criancasFields.appendChild(adicionarBotao);

    }


    /* ================================
       MÁSCARA DO WHATSAPP
    ================================= */

    whatsapp.addEventListener("input", (event) => {

        let valor =
            event.target.value
                .replace(/\D/g, "")
                .substring(0, 11);


        if (valor.length > 10) {

            valor =
                valor.replace(
                    /^(\d{2})(\d{5})(\d{4}).*/,
                    "($1) $2-$3"
                );

        } else {

            valor =
                valor.replace(
                    /^(\d{2})(\d{4})(\d{4}).*/,
                    "($1) $2-$3"
                );
        }


        event.target.value = valor;

    });


    /* ================================
       ENVIO DO FORMULÁRIO
    ================================= */

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        errorMessage.textContent = "";


        /* ================================
           DADOS PRINCIPAIS
        ================================= */

        const nome =
            document.getElementById("nome")
                .value
                .trim();

        const telefone =
            whatsapp.value.trim();


        if (!nome || !telefone || !presenca.value) {

            errorMessage.textContent =
                "Preencha os campos obrigatórios.";

            return;
        }


        /* ================================
           RECUSA
        ================================= */

        if (presenca.value === "nao") {

            const mensagem =
                `Olá! Aqui é ${nome}.

Agradeço pelo convite para o casamento de Emily e Vinícius, mas infelizmente não poderei comparecer.

Obrigado pelo carinho e desejo um dia muito especial ao casal!`;


            enviarWhatsApp(mensagem);


            setTimeout(() => {

                mostrarResultado(
                    "recusado",
                    nome
                );

            }, 500);


            return;
        }


        /* ================================
           ACOMPANHANTES
        ================================= */

        const quantidade =
            Number(quantidadeAcompanhantes.value);


        const acompanhantes = [];


        for (let i = 1; i <= quantidade; i++) {

            const campo =
                document.getElementById(
                    `acompanhante${i}`
                );


            if (!campo || !campo.value.trim()) {

                errorMessage.textContent =
                    "Informe o nome de todos os acompanhantes.";

                return;
            }


            acompanhantes.push(
                campo.value.trim()
            );
        }


        /* ================================
           CRIANÇAS
        ================================= */

        const criancas = [];


        if (temCriancas.value === "sim") {

            const grupos =
                criancasFields.querySelectorAll(
                    ".child-group"
                );


            for (const grupo of grupos) {

                const nomeCampo =
                    grupo.querySelector(
                        'input[type="text"]'
                    );

                const idadeCampo =
                    grupo.querySelector(
                        'input[type="number"]'
                    );


                if (
                    !nomeCampo.value.trim() ||
                    !idadeCampo.value
                ) {

                    errorMessage.textContent =
                        "Informe o nome e a idade de todas as crianças.";

                    return;
                }


                criancas.push({

                    nome:
                        nomeCampo.value.trim(),

                    idade:
                        idadeCampo.value

                });

            }
        }


        /* ================================
           TOTAL DE PESSOAS
        ================================= */

        const totalPessoas =
            1 +
            acompanhantes.length +
            criancas.length;


        /* ================================
           MONTAR MENSAGEM
        ================================= */

        let mensagem =
            `Olá! Gostaria de confirmar minha presença no casamento de Emily e Vinícius.

Nome: ${nome}
WhatsApp: ${telefone}

Quantidade total de pessoas: ${totalPessoas}`;


        /* ================================
           ACOMPANHANTES NA MENSAGEM
        ================================= */

        if (acompanhantes.length > 0) {

            mensagem +=
                `\n\nAcompanhante(s):`;


            acompanhantes.forEach(
                (pessoa, index) => {

                    mensagem +=
                        `\n${index + 1}. ${pessoa}`;

                }
            );

        }


        /* ================================
           CRIANÇAS NA MENSAGEM
        ================================= */

        if (criancas.length > 0) {

            mensagem +=
                `\n\nCriança(s):`;


            criancas.forEach(
                (crianca, index) => {

                    mensagem +=
                        `\n${index + 1}. ${crianca.nome} - ${crianca.idade} anos`;

                }
            );

        }


        /* ================================
           ENVIAR WHATSAPP
        ================================= */

        enviarWhatsApp(mensagem);


        /* ================================
           MOSTRAR CONFIRMAÇÃO
        ================================= */

        setTimeout(() => {

            mostrarResultado(
                "confirmado",
                nome
            );

        }, 500);

    });


    /* ================================
       FUNÇÃO WHATSAPP
    ================================= */

    function enviarWhatsApp(mensagem) {

        const mensagemCodificada =
            encodeURIComponent(mensagem);


        const url =
            `https://wa.me/${numeroCerimonialista}?text=${mensagemCodificada}`;


        window.open(
            url,
            "_blank"
        );

    }

});