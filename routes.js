const url = require("url");

const {
  addBook,
  getBook,
  getBooks,
  updateBook,
  deleteBook
} = require("./action");

const app = (req, res) => {
  // to json method middleware;
  res.json = (s, r) => {
    res.writeHead(s, { "Content-Type": "text/json" });
    res.write(JSON.stringify(r));
    res.end();
  };

  const q = url.parse(req.url, true);
  const path = q.pathname.split("/").filter(e => e.length > 0);
  console.log(q.query);
  const root = path.join("/");

  switch (req.method) {
    case "GET":
      {
        switch (root) {
          case "":
            {
              res.writeHead(200, { "Content-Type": "text/document" });
              res.write("This is an API");
              res.end();
            }
            break;

          case "books":
            getBooks(req, res);
            break;

          case `books/${path[1]}`:
            getBook(req, res, path[1]);
            break;
          default: {
            res.end("Error 404 not found");
          }
        }
      }
      break;
    case "POST":
      {
        switch (root) {
          case "/":
            {
              res.writeHead(200, { "Content-Type": "text/document" });
              res.write("This is an API");
              res.end();
            }
            break;

          case "books":
            {
              addBook(req, res);
            }
            break;
          default: {
            res.end("Error 404 not found");
          }
        }
      }
      break;
    case "PATCH": {
      switch (root) {
        case `books/${path[1]}`: {
          updateBook(req, res, path[1]);
        }
      }
    }
    case "DELETE":
      {
        switch (root) {
          case `books/${path[1]}`: {
            deleteBook(req, res, path[1]);
          }
        }
      }

      break;
    default: {
      res.end("Error 404 not found");
    }
  }
};

module.exports = app;
