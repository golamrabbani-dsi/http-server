var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'your_database_user',
    password : 'your_database_password',
    database : 'myapp_test'
  }
});

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database:'library'
});

conn.connect(function(err) {
  if (err) throw err;
  console.log('connected')
});

      knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('users', function(t) {
      t.increments('id').primary();
      t.string('first_name', 100);
      t.string('last_name', 100);
      t.text('bio');
    });
  }
});
module.exports = conn;