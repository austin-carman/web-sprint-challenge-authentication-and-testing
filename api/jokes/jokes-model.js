const db = require('../../data/dbConfig');

function find() {
    console.log('model');
}

function findBy(filter) {
    const user = db('users')
      .where(filter)
      .first()
    return user;
}

async function findById(id) {
    const user = await db('users')
        .where('id', id)
        .first()
    return user;
}

async function add({ username, password }) {
    let created_id
    await db.transaction(async trx => {
        const [id] = await trx('users').insert({ username, password })
        created_id = id
    })
    return findById(created_id)
}


module.exports = {
    find,
    findBy,
    findById,
    add,
};
