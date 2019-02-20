const conn = require("./connection");
const { tableName } = require("./config");

const getBooksQuery = function() {
  return conn.select().table(tableName);
};

const getBookQuery = function(id) {
  return conn
    .select()
    .table(tableName)
    .where({ idnew_table: id });
};

const addBookQuery = function(data) {
  return conn.insert(data).table(tableName);
};

const updateBookQuery = (id, data) => {
  return conn
    .table(tableName)
    .where({ idnew_table: id })
    .update(data);
};

const deleteBookQuery = id => {
  return conn
    .table(tableName)
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
