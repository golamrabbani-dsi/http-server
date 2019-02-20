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
    res.writeHead(s, { "Content-Type": "application/json" });
    res.end(JSON.stringify(r));
  };

  const q = url.parse(req.url, true);
  const path = q.pathname.split("/").filter(e => e.length > 0);

  const root = path.join("/");

  switch (req.method) {
    case "GET":
      {
        switch (root) {
          case "":
            {
              res.json(200, { message: "This is a very cool API" });
            }
            break;

          case "books":
            getBooks(req, res);
            break;

          case `books/${path[1]}`:
            getBook(req, res, path[1]);
            break;
          default: {
            res.json(404, { error: "Page Not Found" });
          }
        }
      }
      break;
    case "POST":
      {
        switch (root) {
          case "books":
            {
              addBook(req, res);
            }
            break;
          default: {
            res.json(501, "Internal Server Error");
          }
        }
      }
      break;
    case "PATCH":
      {
        switch (root) {
          case `books/${path[1]}`:
            {
              updateBook(req, res, path[1]);
            }
            break;
          default: {
            res.json(501, "Internal Server Error");
          }
        }
      }
      break;
    case "DELETE":
      {
        switch (root) {
          case `books/${path[1]}`:
            {
              deleteBook(req, res, path[1]);
            }
            break;
          default: {
            res.json(500, "Internal Server Error");
          }
        }
      }

      break;
    default: {
      res.json(404, { error: "Error 404 not found" });
    }
  }
};

module.exports = app;
