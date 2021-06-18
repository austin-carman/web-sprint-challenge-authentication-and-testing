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
        console.log('user', user);
    return user;
}

async function add({ username, password }) {
    let created_user_id
    await db.transaction(async trx => {
        const [user_id] = await trx('users').insert({ username, password })
        console.log('user_id', user_id);
        created_user_id = user_id
        console.log('created_user_id', created_user_id);
    })
    return findById(created_user_id)
}


module.exports = {
    find,
    findBy,
    findById,
    add,
};
