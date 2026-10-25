
// =====================================
// SAPORE - RESTAURANTE & GASTRONOMIA
// Projeto demonstrativo para portfólio
// =====================================


// =====================================
// CARDÁPIO
// =====================================

const pratos = [
    {
        nome: "Bruschetta Italiana",
        categoria: "entrada",
        descricao: "Pão artesanal tostado com tomates frescos, manjericão e azeite extravirgem.",
        preco: 28.90,
        imagem: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=800&q=85"
    },
    {
        nome: "Salada Caprese",
        categoria: "entrada",
        descricao: "Tomates selecionados, mozzarella fresca, manjericão e azeite especial.",
        preco: 34.90,
        imagem: "assets/caprese.jpg"
    },
    {
        nome: "Spaghetti Pomodoro",
        categoria: "principal",
        descricao: "Massa italiana com molho de tomates frescos, manjericão e parmesão.",
        preco: 59.90,
        imagem: "assets/spaghetti.jpg"
    },
    {
        nome: "Risoto de Cogumelos",
        categoria: "principal",
        descricao: "Arroz arbóreo cremoso com cogumelos selecionados e queijo parmesão.",
        preco: 68.90,
        imagem: "assets/risoto.jpg"
    },
    {
        nome: "Tiramisù",
        categoria: "sobremesa",
        descricao: "Sobremesa italiana com mascarpone, café e uma delicada camada de cacau.",
        preco: 29.90,
        imagem: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=85"
    },
    {
        nome: "Panna Cotta",
        categoria: "sobremesa",
        descricao: "Creme italiano delicado acompanhado de calda artesanal de frutas vermelhas.",
        preco: 27.90,
        imagem: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=85"
    },
    {
        nome: "Limonada da Casa",
        categoria: "bebida",
        descricao: "Limonada refrescante preparada com limões frescos e hortelã.",
        preco: 14.90,
        imagem: "assets/limonada.jpg"
    },
    {
        nome: "Espresso Italiano",
        categoria: "bebida",
        descricao: "Café espresso encorpado, preparado com grãos selecionados.",
        preco: 9.90,
        imagem: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=800&q=85"
    }
];


// =====================================
// ELEMENTOS DO CARDÁPIO
// =====================================

const listaPratos = document.getElementById("lista-pratos");
const botoesFiltro = document.querySelectorAll(".filtro");


// =====================================
// FORMATAÇÃO DOS PREÇOS
// =====================================

const formatarPreco = (valor) => {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
};


// =====================================
// CATEGORIAS
// =====================================

const nomesCategorias = {
    entrada: "Entrada",
    principal: "Prato principal",
    sobremesa: "Sobremesa",
    bebida: "Bebida"
};


// =====================================
// EXIBIR PRATOS
// =====================================

function mostrarPratos(categoria = "todos") {
    listaPratos.innerHTML = "";

    const pratosFiltrados = pratos.filter((prato) => {
        return categoria === "todos" ||
               prato.categoria === categoria;
    });

    pratosFiltrados.forEach((prato) => {
        const card = document.createElement("article");
        card.classList.add("prato");

        card.innerHTML = `
            <img
                src="${prato.imagem}"
                alt="${prato.nome}"
                loading="lazy"
            >

            <div class="prato-conteudo">

                <span class="prato-categoria">
                    ${nomesCategorias[prato.categoria]}
                </span>

                <h3>${prato.nome}</h3>

                <p>${prato.descricao}</p>

                <span class="prato-preco">
                    ${formatarPreco(prato.preco)}
                </span>

            </div>
        `;

        listaPratos.appendChild(card);
    });
}


// =====================================
// FILTROS DO CARDÁPIO
// =====================================

botoesFiltro.forEach((botao) => {
    botao.addEventListener("click", () => {

        botoesFiltro.forEach((item) => {
            item.classList.remove("ativo");
            item.setAttribute("aria-pressed", "false");
        });

        botao.classList.add("ativo");
        botao.setAttribute("aria-pressed", "true");

        mostrarPratos(botao.dataset.categoria);
    });
});

mostrarPratos();


// =====================================
// MENU FIXO COM EFEITO DE ROLAGEM
// =====================================

const cabecalho = document.querySelector(".cabecalho");

function atualizarCabecalho() {
    if (window.scrollY > 50) {
        cabecalho.classList.add("rolagem");
    } else {
        cabecalho.classList.remove("rolagem");
    }
}

window.addEventListener("scroll", atualizarCabecalho);

atualizarCabecalho();


// =====================================
// MENU HAMBÚRGUER PARA CELULARES
// =====================================

const botaoMenu = document.querySelector(".menu-toggle");
const menuPrincipal = document.getElementById("menu-principal");

function fecharMenu() {
    botaoMenu.classList.remove("ativo");
    menuPrincipal.classList.remove("aberto");

    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu");
}

function alternarMenu() {
    const aberto = menuPrincipal.classList.toggle("aberto");

    botaoMenu.classList.toggle("ativo", aberto);
    botaoMenu.setAttribute("aria-expanded", String(aberto));

    botaoMenu.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );
}

botaoMenu.addEventListener("click", alternarMenu);

// Fecha o menu ao clicar em um link
menuPrincipal.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", fecharMenu);
});

// Fecha ao clicar fora da navegação
document.addEventListener("click", (evento) => {
    if (
        menuPrincipal.classList.contains("aberto") &&
        !evento.target.closest(".navegacao")
    ) {
        fecharMenu();
    }
});

// Fecha com a tecla Escape
document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
        fecharMenu();
    }
});

// Restaura o menu normal ao voltar para desktop
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        fecharMenu();
    }
});


// =====================================
// SISTEMA DE RESERVAS
// =====================================

const formularioReserva = document.getElementById("form-reserva");
const campoData = document.getElementById("data");
const campoTelefone = document.getElementById("telefone");
const mensagemReserva = document.getElementById("mensagem-reserva");


// =====================================
// MÁSCARA DE TELEFONE BRASILEIRO
// =====================================

function formatarTelefone(valor) {
    let numeros = valor.replace(/\D/g, "");

    // Limita a 11 dígitos
    numeros = numeros.slice(0, 11);

    if (numeros.length === 0) {
        return "";
    }

    if (numeros.length <= 2) {
        return `(${numeros}`;
    }

    if (numeros.length <= 6) {
        return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    }

    if (numeros.length <= 10) {
        return `(${numeros.slice(0, 2)}) ${numeros.slice(2, -4)}-${numeros.slice(-4)}`;
    }

    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
}

campoTelefone.addEventListener("input", () => {
    campoTelefone.value = formatarTelefone(campoTelefone.value);
});


// =====================================
// DATA LOCAL
// =====================================

function dataLocalISO(data) {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
}


// =====================================
// IMPEDIR DATAS PASSADAS
// =====================================

function atualizarDataMinima() {
    campoData.min = dataLocalISO(new Date());
}

atualizarDataMinima();


// =====================================
// MENSAGENS DO FORMULÁRIO
// =====================================

function exibirMensagem(texto, tipo) {
    mensagemReserva.textContent = texto;
    mensagemReserva.className = `mensagem-reserva ${tipo}`;
}


// =====================================
// VALIDAÇÃO DAS RESERVAS
// =====================================

formularioReserva.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = campoTelefone.value.trim();

    const data = campoData.value;
    const horario = document.getElementById("horario").value;
    const pessoas = Number(document.getElementById("pessoas").value);

    const agora = new Date();

    atualizarDataMinima();

    // VALIDAÇÃO DO NOME

    if (nome.length < 3) {
        exibirMensagem(
            "Informe um nome com pelo menos 3 caracteres.",
            "erro"
        );
        return;
    }

    // VALIDAÇÃO DO E-MAIL

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(email)) {
        exibirMensagem(
            "Informe um endereço de e-mail válido.",
            "erro"
        );
        return;
    }

    // VALIDAÇÃO DO TELEFONE

    const telefoneNumeros = telefone.replace(/\D/g, "");

    if (
        telefoneNumeros.length < 10 ||
        telefoneNumeros.length > 11
    ) {
        exibirMensagem(
            "Informe um telefone com DDD válido.",
            "erro"
        );
        return;
    }

    // VALIDAÇÃO DE DATA E HORÁRIO

    if (!data || !horario) {
        exibirMensagem(
            "Selecione uma data e um horário.",
            "erro"
        );
        return;
    }

    const [ano, mes, dia] = data.split("-").map(Number);
    const [hora, minuto] = horario.split(":").map(Number);

    const dataReserva = new Date(
        ano,
        mes - 1,
        dia,
        hora,
        minuto
    );

    // IMPEDIR DATAS INVÁLIDAS OU PASSADAS

    if (
        dataReserva.getFullYear() !== ano ||
        dataReserva.getMonth() !== mes - 1 ||
        dataReserva.getDate() !== dia ||
        dataReserva <= agora
    ) {
        exibirMensagem(
            "Escolha uma data e um horário futuros.",
            "erro"
        );
        return;
    }

    // HORÁRIOS PERMITIDOS

    const horariosPermitidos = [
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00"
    ];

    if (!horariosPermitidos.includes(horario)) {
        exibirMensagem(
            "Selecione um dos horários disponíveis.",
            "erro"
        );
        return;
    }

    // QUANTIDADE DE PESSOAS

    if (
        !Number.isInteger(pessoas) ||
        pessoas < 1 ||
        pessoas > 8
    ) {
        exibirMensagem(
            "Selecione entre 1 e 8 pessoas.",
            "erro"
        );
        return;
    }

    // FORMATAR DATA

    const dataFormatada = dataReserva.toLocaleDateString("pt-BR");

    const textoPessoas = pessoas === 1
        ? "1 pessoa"
        : `${pessoas} pessoas`;

    // CONFIRMAÇÃO DEMONSTRATIVA

    exibirMensagem(
        `Simulação concluída! ${nome}, sua solicitação para ` +
        `${textoPessoas}, no dia ${dataFormatada}, às ${horario}, ` +
        `foi validada. Nenhuma reserva real foi efetuada ou enviada.`,
        "sucesso"
    );

    formularioReserva.reset();
});
