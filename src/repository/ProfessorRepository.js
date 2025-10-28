const BaseRepository = require('./BaseRepository');

class ProfessorRepository extends BaseRepository {
    constructor() {
        super('professores');
    }

    async findByEmail(email) {
        return this.findOneBy('email', email);
    }
}

module.exports = new ProfessorRepository();
