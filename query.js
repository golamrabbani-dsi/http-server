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

const updateBookQuery = (id, data) => {
  console.log(id, data);
  return conn
    .table("books")
    .where({ idnew_table: id })
    .update(data);
};

const deleteBookQuery = id => {
  return conn
    .table("books")
    .where({ idnew_table: id })
    .del();
};
module.exports = {
  getBooksQuery,
  getBookQuery,
  addBookQuery,
  updateBookQuery,
  deleteBookQuery
};
