const { addBookQuery, getBookQuery, getBooksQuery } = require("./query");

const getBooks = (req, res) => {
  getBooksQuery()
    .then(result => {
      res.writeHead(200, { "Content-Type": "text/json" });
      res.write(JSON.stringify(result));
      res.end();
    })
    .catch(err => res.end("something went wrong"));
};

const getBook = (req, res, args) => {
  getBook(args)
    .then(results => {
      res.writeHead(200, { "Content-Type": "text/json" });
      res.write(
        JSON.stringify({
          results,
          params: args
        })
      );
      res.end();
    })
    .catch(err => {
      console.log(err);
      res.end("something went wrong");
    });
};

const addBook = function(req, res) {
  const chunks = [];
  req.on("data", chunk => chunks.push(chunk));
  req.on("end", () => {
    const bufferedData = Buffer.concat(chunks);
    const data = JSON.parse(bufferedData.toString());

    addBookQuery(data)
      .then(response => {
        res.writeHead(200, { "Content-Type": "text/json" });
        res.write(JSON.stringify(response));
        res.end();
      })
      .catch(e => console.log(e));
  });
};

module.exports = { addBook, getBook, getBooks };
