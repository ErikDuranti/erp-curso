const BaseRepository = require('./BaseRepository');

class TurmaRepository extends BaseRepository {
    constructor() {
        super('turmas');
    }
}

module.exports = new TurmaRepository();
