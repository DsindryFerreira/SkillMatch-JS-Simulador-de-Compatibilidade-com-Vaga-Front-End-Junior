const { Candidato, Empresa } = require("./Perfis");
const Vaga = require("./Vaga");

const perfil1 = new Candidato(
  "Dsindry Ferreira",
  "dsindry@hotmail.com",
  "Front-End",
  ["HTML", "CSS", "JavaScript", "Git"],
  "3 meses",
);

console.log("Perfil do candidato:");
console.log(perfil1);
console.log();

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

console.log("Resultado de compatibilidade:");
console.log();

let maiorPercentual = 0;
let melhorCargo = "";
let melhorEmpresa = "";

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
    Requisitos faltantes: ${faltamTexto}`
  );

  if (resultado.percentual > maiorPercentual) {
    maiorPercentual = resultado.percentual;
    melhorCargo = listaVagas[i].cargo;
    melhorEmpresa = listaVagas[i].empresa;
  }
}

console.log();
console.log(
  `Vaga com maior compatibilidade: 
  ${melhorEmpresa} - ${melhorCargo} (${maiorPercentual.toFixed(2)} %)`
);
