var knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "password",
    database: "library"
  }
});

knex.schema.hasTable("books").then(function(exists) {
  if (!exists) {
    return knex.schema.createTable("books", function(t) {
      t.increments("id").primary();
      t.string("title", 100).notNullable;
      t.string("description", 100).notNullable;
      t.text("link");
    });
  }
});
module.exports = knex;
