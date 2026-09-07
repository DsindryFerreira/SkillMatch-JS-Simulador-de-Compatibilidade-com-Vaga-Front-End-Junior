const { Candidato, Empresa } = require("./Perfis");
const Vaga = require("./Vaga");

const perfil1 = new Candidato(
  "Dsindry Ferreira",
  "dsindry@hotmail.com",
  "Front-End",
  ["HTML", "CSS", "JavaScript", "Git"],
  "3 meses",
);

const empresaA = new Empresa("Empresa AA", "empresa-a@gmail.com");
const empresaB = new Empresa("Empresa BB", "empresa-b@gmail.com");
const empresaC = new Empresa("Empresa CC", "empresa-c@gmail.com");

const listaVagas = [
  new Vaga(empresaA.nome, "Desenvolvedor Front-End Júnior", [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
  ]),
  new Vaga(empresaB.nome, "Estagiário Web", ["HTML", "CSS", "Git"]),
  new Vaga(empresaC.nome, "Desenvolvedor Júnior", [
    "JavaScript",
    "React",
    "Node.js",
  ]),
];

function simularCompatibilidade(candidato, vaga) {
  let habilidadesCandidato = candidato.habilidades;
  let requisitosVaga = vaga.requisitos;
  let acertos = 0;

  for (let i = 0; i < requisitosVaga.length; i++) {
    if (habilidadesCandidato.includes(requisitosVaga[i])) {
      acertos++;
    }
  }

  let percentual = (acertos / requisitosVaga.length) * 100;

  let classificacao = "";
  if (percentual >= 80) {
    classificacao = "Alta compatibilidade";
  } else if (percentual >= 50) {
    classificacao = "Média Compatibilidade";
  } else {
    classificacao = "Baixa Compatibilidade";
  }

  return {
    percentual: percentual,
    classificacao: classificacao,
  };
}

function obterHabilidadesFaltantes(candidato, vaga) {
  let habilidadesCandidato = candidato.habilidades;
  let requisitosVaga = vaga.requisitos;
  let faltantes = [];

  for (let i = 0; i < requisitosVaga.length; i++) {
    if (!habilidadesCandidato.includes(requisitosVaga[i])) {
      faltantes.push(requisitosVaga[i]);
    }
  }

  return faltantes;
}

function gerarRecomendacaoEstudo(candidato, vaga) {
  let requisitosVaga = vaga.requisitos;
  let habilidadesCandidato = candidato.habilidades;

  let habilidadesFaltantes = requisitosVaga.filter(function (requisito) {
    return !habilidadesCandidato.includes(requisito);
  });

  let recomendacoes = habilidadesFaltantes.map(function (habilidade) {
    return habilidade;
  });

  return recomendacoes;
}

console.log("Perfil do candidato:");
console.log(perfil1);
console.log();

console.log("Lista de vagas:");
for (let i = 0; i < listaVagas.length; i++) {
  console.log(
    "Empresa:",
    listaVagas[i].empresa,
    "| Cargo:",
    listaVagas[i].cargo,
    "| Requisitos:",
    listaVagas[i].requisitos,
  );
}
console.log();

console.log("Resultado de compatibilidade:");
console.log();

for (let i = 0; i < listaVagas.length; i++) {
  let resultado = simularCompatibilidade(perfil1, listaVagas[i]);

  let habilidadesFaltantes = obterHabilidadesFaltantes(perfil1, listaVagas[i]);

  let faltamTexto = "";

  if (habilidadesFaltantes.length === 0) {
    faltamTexto = "Nenhum";
  } else {
    faltamTexto = habilidadesFaltantes;
  }

  console.log(
    `Empresa: ${listaVagas[i].empresa}  
    Cargo: ${listaVagas[i].cargo}  
    Compatibilidade: ${resultado.percentual.toFixed(2)} %  
    Classificação: ${resultado.classificacao}  
    Requisitos faltantes: ${faltamTexto}`,
  );
}
console.log();

let vagaCompativel = listaVagas.find(function (vaga) {
  let simulacao = simularCompatibilidade(perfil1, vaga);
  return simulacao.classificacao === "Alta compatibilidade";
});

if (vagaCompativel) {
  let percentualVagaCompativel = simularCompatibilidade(perfil1, vagaCompativel);

  console.log(
    `Vaga com maior compatibilidade: 
    ${vagaCompativel.empresa} - ${vagaCompativel.cargo} - ${percentualVagaCompativel.percentual.toFixed(2)} %`,
  );
} else {
  console.log("Nenhuma vaga compatível com o seu perfil no momento.");
}

console.log();

console.log("Dicas de estudo para as outras vagas:");
console.log();

let vagasParaEstudar = listaVagas.filter(function(vaga) {
  let simulacao = simularCompatibilidade(perfil1, vaga);
  return simulacao.percentual < 100;
});

for (let i = 0; i < vagasParaEstudar.length; i++) {
  let recomendacoes = gerarRecomendacaoEstudo(perfil1, vagasParaEstudar[i]);

  console.log(
    `Para a vaga ${vagasParaEstudar[i].cargo} na ${vagasParaEstudar[i].empresa}, estudar:`,
  );

  console.log(`${recomendacoes.join(" | ")}`);
}

