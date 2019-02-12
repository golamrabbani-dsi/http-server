const url = require("url");

const { addBook, getBook, getBooks } = require("./route");
const app = (req, res) => {
  var q = url.parse(req.url, true);
  const path = q.pathname.split("/").filter(e => e.length > 0);
  console.log(q.query);
  const root = path.join("/");
  console.log(root);
  if (req.method === "GET") {
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
        getBook(req, res, path[0]);
        break;
      default: {
        res.end("Error 404 not found");
      }
    }
  } else if (req.method === "POST") {
    switch (q.pathname) {
      case "/":
        {
          res.writeHead(200, { "Content-Type": "text/document" });
          res.write("This is an API");
          res.end();
        }
        break;

      case "/books": {
        addBook(req, res);
      }
    }
  }
};

module.exports = app;
