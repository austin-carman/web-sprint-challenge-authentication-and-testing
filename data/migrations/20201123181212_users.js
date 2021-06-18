exports.up = function (knex) {
  return knex.schema
    .createTable('users', users => {
      users.increments('id');
      users.string('username', 255).notNullable().unique();
      users.string('password', 255).notNullable();
    })
    // .createTable('jokes', jokes => {
    //   jokes.increments('joke_id');
    //   jokes.string('joke', 255).notNullable();
    //   jokes.integer('user_id')
    //     .unsigned()
    //     .notNullable()
    //     .references('role_id')
    //     .inTable('users')
    //     .onUpdate('RESTRICT')
    //     .onDelete('RESTRICT')
    // });

};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('jokes')
    .dropTableIfExists('users');

};
