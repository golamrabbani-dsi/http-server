const config = require("./config.json");

var knex = require("knex")({
  client: "mysql",
  connection: {
    host: config.db.host,
    user: config.db.user,
    password: config.db.pass,
    database: config.db.name
  }
});

knex.schema.hasTable("books").then(function(exists) {
  if (!exists) {
    return knex.schema.createTable(config.tableName, function(t) {
      t.increments("id").primary();
      t.string("title", 100).notNullable;
      t.string("description", 100).notNullable;
      t.text("link");
    });
  }
});
module.exports = knex;
