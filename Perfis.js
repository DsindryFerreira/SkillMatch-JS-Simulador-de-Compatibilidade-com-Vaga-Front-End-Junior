const Usuario = require('./Usuario');

class Candidato extends Usuario {
    constructor(nome, email, areaInteresse, habilidades, tempoExperiencia) {
        super(nome, email);
        this.areaInteresse = areaInteresse;
        this.habilidades = habilidades;
        this.tempoExperiencia = tempoExperiencia;
    }
}

class Empresa extends Usuario {}

module.exports = { Candidato, Empresa }
