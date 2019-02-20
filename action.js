const {
  addBookQuery,
  getBookQuery,
  getBooksQuery,
  updateBookQuery,
  deleteBookQuery
} = require("./query");

//Get all the books
const getBooks = (req, res) => {
  getBooksQuery()
    .then(result => {
      res.json(200, result);
    })
    .catch(err => res.json(500, { error: "Internal Server Error" }));
};

//Get single Book by id;
const getBook = (req, res, args) => {
  getBookQuery(args)
    .then(results => {
      if (results.length > 0) res.json(200, results);
      else res.json(404, "Specified Book is Not Found");
    })
    .catch(err => res.json(500, { error: "Internal Server Error" }));
};

// Add book to the database;
const addBook = function(req, res) {
  const chunks = [];
  req.on("data", chunk => chunks.push(chunk));
  req.on("end", () => {
    if (chunks.length == 0) {
      res.json(406, { error: "Empty Body Not Acceptable" });
    } else {
      const bufferedData = Buffer.concat(chunks);
      const data = JSON.parse(bufferedData.toString());

      addBookQuery(data)
        .then(response => {
          res.json(201, { data: response[0] });
        })
        .catch(err => res.json(500, { error: "Internal Server Error" }));
    }
  });
};

//  Update Book by id
const updateBook = (req, res, id) => {
  const chunks = [];
  req.on("data", chunk => chunks.push(chunk));
  req.on("end", () => {
    const bufferedData = Buffer.concat(chunks);
    const data = JSON.parse(bufferedData.toString());

    updateBookQuery(id, data)
      .then(response => {
        if (response) res.json(201, { message: "Successfully Deleted" });
        else res.json(404, { error: "Nothing found to be updated" });
      })
      .catch(err => res.json(500, { error: "Internal Server Error" }));
  });
};

// Delete book by id
const deleteBook = (req, res, id) => {
  deleteBookQuery(id)
    .then(response => {
      if (response) res.json(201, { message: "Successfully Deleted" });
      else res.json(404, { error: "Nothing found to be deleted" });
    })
    .catch(err => res.json(500, { error: "Internal Server Error" }));
};
module.exports = { addBook, getBook, getBooks, updateBook, deleteBook };
