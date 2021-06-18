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

async function findById(user_id) {
    const user = await db('users')
        .where('user_id', user_id)
        .first()
    return user;
}

async function add({ username, password }) {
    let created_user_id
    await db.transaction(async trx => {
        const [user_id] = await trx('users').insert({ username, password })
        created_user_id = user_id
    })
    return findById(created_user_id)
}


module.exports = {
    find,
    findBy,
    findById,
    add,
};
