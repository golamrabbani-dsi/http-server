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
    .catch(err => res.end("something went wrong"));
};

//Get single Book by id;
const getBook = (req, res, args) => {
  getBookQuery(args)
    .then(results => res.json(200, results))
    .catch(err => {
      console.log(err);
      res.json(404, []);
    });
};
// Add book to the database;
const addBook = function(req, res) {
  const chunks = [];
  req.on("data", chunk => chunks.push(chunk));
  req.on("end", () => {
    const bufferedData = Buffer.concat(chunks);
    const data = JSON.parse(bufferedData.toString());

    addBookQuery(data)
      .then(response => {
        res.json(201, response);
      })
      .catch(e => {
        res.end("Something went soooo bad");
      });
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
        res.json(203, response);
      })
      .catch(e => {
        res.json(404, e);
      });
  });
};

// Delete book by id
const deleteBook = (req, res, id) => {
  deleteBookQuery(id)
    .then(response => {
      res.json(200, response);
    })
    .catch(e => {
      res.json(404, e);
    });
};
module.exports = { addBook, getBook, getBooks, updateBook, deleteBook };
