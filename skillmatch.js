const { Candidato, Empresa } = require("./Perfis");
const Vaga = require("./Vaga");

const perfil1 = new Candidato(
  "Dsindry Ferreira",
  "dsindry@hotmail.com",
  "Front-End",
  ["HTML", "CSS", "JavaScript", "Git"],
  "3 meses",
);

const empresaA = new Empresa("Empresa AA", "empresa-a@gmail.com", "Palhoça");
const empresaB = new Empresa("Empresa BB", "empresa-b@gmail.com", "São josé");
const empresaC = new Empresa("Empresa CC", "empresa-c@gmail.com", "Florianópolis");

let listaVagas = [];

empresaA.publicarVaga(listaVagas, Vaga, "Desenvolvedor Front-End Júnior", [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
]);
  empresaB.publicarVaga(listaVagas, Vaga, "Estagiário Web", [
    "HTML",
    "CSS",
    "Git",
  ]);
  empresaC.publicarVaga(listaVagas, Vaga, "Desenvolvedor Júnior", [
    "JavaScript",
    "React",
    "Node.js",
  ]);

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

function limitadorDeVisualizacao(limiteDiario) {
  let visualizacaoRestante = limiteDiario;

  return function () {
    if (visualizacaoRestante > 0) {
      visualizacaoRestante--;
      return `✓ Visualização liberada! Você ainda pode ver ${visualizacaoRestante} vagas.`;
    } else {
      return `X Você atingiu o limite de visualização diária. Para ver mais vagas assine o Premium!`;
    }
  };
}

const checarLimiteDeVisualizacao = limitadorDeVisualizacao(3);

function carregarBancoDeDados(vagasIniciais) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(vagasIniciais);
    }, 1500);
  });
}

function processarRelatorio(listaFiltrada, funcaoCallback) {
  for (let i = 0; i < listaFiltrada.length; i++) {
    funcaoCallback(listaFiltrada[i]);
  }
}

console.log("Perfil do candidato:");
console.log(perfil1);
console.log();

async function iniciarApp() {
  console.log("Carregando vagas publicadas...");
  console.log();

  listaVagas = await carregarBancoDeDados(listaVagas);

  console.log("➔  Lista de vagas:");
  for (let i = 0; i < listaVagas.length; i++) {
    console.log(
      "Empresa:",
      listaVagas[i].empresa,
      "| Cargo:",
      listaVagas[i].cargo,
      "| Requisitos:",
      listaVagas[i].requisitos,
      "| Cidade:",
      listaVagas[i].cidade,
    );
  }
  console.log();

  console.log("➔  Resultado de compatibilidade:");
  console.log();

  for (let i = 0; i < listaVagas.length; i++) {
    let resultado = simularCompatibilidade(perfil1, listaVagas[i]);

    let habilidadesFaltantes = obterHabilidadesFaltantes(
      perfil1,
      listaVagas[i],
    );

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
    let percentualVagaCompativel = simularCompatibilidade(
      perfil1,
      vagaCompativel,
    );

    console.log(
      `➔  Vaga com maior compatibilidade: 
    ${vagaCompativel.empresa} - ${vagaCompativel.cargo} - ${percentualVagaCompativel.percentual.toFixed(2)} %`,
    );
  } else {
    console.log("Nenhuma vaga compatível com o seu perfil no momento.");
  }
  console.log();

  console.log("➔  Dicas de estudo para as outras vagas:");
  console.log();

  let vagasParaEstudar = listaVagas.filter(function (vaga) {
    let simulacao = simularCompatibilidade(perfil1, vaga);
    return simulacao.percentual < 100;
  });

  processarRelatorio(vagasParaEstudar, function (vagaAtual) {
  let recomendacoes = gerarRecomendacaoEstudo(perfil1, vagaAtual);

  console.log(
    `Para a vaga ${vagaAtual.cargo} na ${vagaAtual.empresa}, estudar:`,
  );
  console.log(`  ${recomendacoes.join(" | ")}`);
});

  console.log();

  console.log("* Testando publicação de novas vagas:");

  let novaPublicacao = empresaA.publicarVaga(
    listaVagas,
    Vaga,
    "Desenvolvedor React Native",
    ["JavaScript", "Git"],
  );

  console.log(novaPublicacao);
  console.log();

  console.log("* Testando limite de visualização:");
  console.log();

  console.log(checarLimiteDeVisualizacao());
  console.log(checarLimiteDeVisualizacao());
  console.log(checarLimiteDeVisualizacao());
  console.log(checarLimiteDeVisualizacao());
}

iniciarApp();
