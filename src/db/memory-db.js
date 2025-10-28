const data = {
    users: [],
    professores: [],
    alunos: [],
    turmas: [],
    matriculas: []
};

let nextIds = {
    users: 1,
    professores: 1,
    alunos: 1,
    turmas: 1,
    matriculas: 1
};

function insert(collection, record) {
    const newRecord = { id: nextIds[collection]++, ...record };
    data[collection].push(newRecord);
    return newRecord;
}

function findAll(collection) {
    return data[collection];
}

function findById(collection, id) {
    return data[collection].find(r => r.id === parseInt(id));
}

function findOneBy(collection, key, value) {
    return data[collection].find(r => r[key] === value);
}

function update(collection, id, updates) {
    const index = data[collection].findIndex(r => r.id === parseInt(id));
    if (index === -1) return undefined;

    data[collection][index] = { ...data[collection][index], ...updates };
    return data[collection][index];
}

function remove(collection, id) {
    const initialLength = data[collection].length;
    data[collection] = data[collection].filter(r => r.id !== parseInt(id));
    return data[collection].length < initialLength;
}

function findManyBy(collection, key, value) {
    return data[collection].filter(r => r[key] === value);
}

module.exports = {
    insert,
    findAll,
    findById,
    findOneBy,
    update,
    remove,
    findManyBy,
    data
};
