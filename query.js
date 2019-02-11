const conn = require('./connection');

const getBooks =  function(cb) {
    conn.query("SELECT * FROM book",(err,results)=>{
        cb(err,results)
    })
}

const getBook =  function(cb) {
    conn.query("SELECT name FROM book",(err,results)=>{
        cb(err,results)
    })
}

module.exports = { getBooks, getBook } 