const BaseRepository = require('./BaseRepository');

class UserRepository extends BaseRepository {
    constructor() {
        super('users');
    }

    async findByEmail(email) {
        return this.findOneBy('email', email);
    }
}

module.exports = new UserRepository();
