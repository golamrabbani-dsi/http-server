var knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "password",
    database: "library"
  }
});

knex.schema.hasTable("users").then(function(exists) {
  if (!exists) {
    return knex.schema.createTable("users", function(t) {
      t.increments("id").primary();
      t.string("first_name", 100);
      t.string("last_name", 100);
      t.text("bio");
    });
  }
});
module.exports = knex;
