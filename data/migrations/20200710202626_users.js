exports.up = async function (knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments();
    table.string("username").notNull().unique();
    table.string("password").notNull();
    table.string("department").notNull();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("users");
};
