const BaseRepository = require('./BaseRepository');

class AlunoRepository extends BaseRepository {
    constructor() {
        super('alunos');
    }

    async findByMatricula(matricula) {
        return this.findOneBy('matricula', matricula);
    }

    async findByEmail(email) {
        return this.findOneBy('email', email);
    }
}

module.exports = new AlunoRepository();
