const Usuario = require('./Usuario');

class Candidato extends Usuario {
    constructor(nome, email, areaInteresse, habilidades, tempoExperiencia) {
        super(nome, email);
        this.areaInteresse = areaInteresse;
        this.habilidades = habilidades;
        this.tempoExperiencia = tempoExperiencia;
    }
}

class Empresa extends Usuario {
  constructor(nome, email, cidade) {
    super(nome, email);
    this.cidade = cidade;
  }

  publicarVaga(listaDeVagas, vagaClasse, cargo, requisitos) {
    const novaVaga = new vagaClasse(this.nome, cargo, requisitos, this.cidade);

    listaDeVagas.push(novaVaga);

    return `A ${this.nome} publicou uma nova oportunidade para ${cargo} em ${this.cidade}!`;
  }
}

module.exports = { Candidato, Empresa }
