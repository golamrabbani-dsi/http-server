const conn = require("./connection");

const getBooksQuery = function() {
  return conn.select().table("books");
};

const getBookQuery = function(id) {
  return conn
    .select()
    .table("books")
    .where({ idnew_table: id });
};

const addBookQuery = function(data) {
  return conn.insert(data).table("books");
};
module.exports = { getBooksQuery, getBookQuery, addBookQuery };
