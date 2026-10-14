/* 1. CHECKLIST */
const caixas = document.querySelectorAll("#checklist-itens input");
const barra = document.getElementById("barra");
const porcentagem = document.getElementById("porcentagem");

for (let i = 0; i < caixas.length; i++) {
  caixas[i].addEventListener("change", atualizarChecklist);
}

function atualizarChecklist() {
  let concluidas = 0;
  for (let i = 0; i < caixas.length; i++) {
    if (caixas[i].checked) {
      concluidas++;
    }
  }
  let total = caixas.length;
  let percentual = Math.round(concluidas * 100 / total);
  barra.style.width = percentual + "%";
  porcentagem.textContent = percentual + "% concluído - " + concluidas + " de " + total + " tarefas";
}
atualizarChecklist();

/* 2. QUIZ */
const perguntas = [
  { texto: "Dengue e chikungunya podem ser transmitidas pelo Aedes aegypti.", resposta: true, explicacao: "Esse mosquito pode transmitir as duas doenças." },
  { texto: "Chá de boldo cura dengue e substitui o atendimento médico.", resposta: false, explicacao: "Chá não substitui o atendimento médico." },
  { texto: "É correto compartilhar uma denúncia sem verificar as informações.", resposta: false, explicacao: "É importante verificar as informações antes de compartilhar." },
  { texto: "Água parada pode servir de criadouro para o Aedes aegypti.", resposta: true, explicacao: "Recipientes com água parada podem favorecer a reprodução do mosquito." }
];
let numero = 0;
let respondido = false;
const pergunta = document.getElementById("pergunta");
const contador = document.getElementById("contador");
const feedback = document.getElementById("feedback");
const verdade = document.getElementById("verdade");
const fake = document.getElementById("fake");
const proxima = document.getElementById("proxima");

function mostrarPergunta() {
  pergunta.textContent = perguntas[numero].texto;
  contador.textContent = "Pergunta " + (numero + 1) + " de " + perguntas.length;
  feedback.textContent = "";
  verdade.disabled = false;
  fake.disabled = false;
  proxima.hidden = true;
  respondido = false;
}
function responder(resposta) {
  if (respondido) { return; }
  respondido = true;
  if (resposta === perguntas[numero].resposta) {
    feedback.textContent = "✅ Correto! " + perguntas[numero].explicacao;
  } else {
    feedback.textContent = "❌ Resposta incorreta. " + perguntas[numero].explicacao;
  }
  verdade.disabled = true;
  fake.disabled = true;
  proxima.hidden = false;
  if (numero === perguntas.length - 1) {
    proxima.textContent = "Recomeçar quiz";
  } else {
    proxima.textContent = "Próxima pergunta";
  }
}
verdade.addEventListener("click", function () { responder(true); });
fake.addEventListener("click", function () { responder(false); });
proxima.addEventListener("click", function () {
  numero++;
  if (numero === perguntas.length) { numero = 0; }
  mostrarPergunta();
});
mostrarPergunta();

/* 3. REGISTROS LOCAIS */
const formulario = document.getElementById("form-denuncia");
const lista = document.getElementById("lista-denuncias");
let denuncias = [];
function mostrarDenuncias() {
  lista.innerHTML = "";
  for (let i = 0; i < denuncias.length; i++) {
    let item = document.createElement("li");
    item.textContent = denuncias[i].protocolo + " - " + denuncias[i].bairro + ": " + denuncias[i].descricao;
    lista.appendChild(item);
  }
}
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();
  let bairro = document.getElementById("bairro").value.trim();
  let descricao = document.getElementById("desc").value.trim();
  if (bairro === "" || descricao === "") {
    alert("Preencha todos os campos!");
    return;
  }
  let protocolo = "PE-" + Date.now();
  let novaDenuncia = { bairro: bairro, descricao: descricao, protocolo: protocolo };
  denuncias.push(novaDenuncia);
  mostrarDenuncias();
  formulario.reset();
  alert("Registro de demonstração criado! Protocolo: " + protocolo);
});
mostrarDenuncias();
