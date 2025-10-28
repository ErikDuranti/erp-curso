const db = require('../db/memory-db');

class BaseRepository {
    constructor(collectionName) {
        this.collectionName = collectionName;
    }

    async create(data) {
        const newRecord = db.insert(this.collectionName, data);
        return newRecord;
    }

    async findAll() {
        return db.findAll(this.collectionName);
    }

    async findById(id) {
        return db.findById(this.collectionName, id);
    }

    async findOneBy(key, value) {
        return db.findOneBy(this.collectionName, key, value);
    }

    async findManyBy(key, value) {
        return db.findManyBy(this.collectionName, key, value);
    }

    async update(id, updates) {
        const updatedRecord = db.update(this.collectionName, id, updates);
        return updatedRecord;
    }

    async delete(id) {
        const deleted = db.remove(this.collectionName, id);
        return deleted;
    }
}

module.exports = BaseRepository;
