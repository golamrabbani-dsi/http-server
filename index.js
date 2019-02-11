const http = require('http');
const fs = require('fs');
const url = require('url');

const conn = require('./connection');
const route = require('./route')
const hostname = '127.0.0.1';
const port = 3000;


const server = http.createServer((req, res) => {

    var q = url.parse(req.url, true);
    route(q.pathname,()=>{
      conn.query("SELECT * FROM book",(err,results,fields)=>{
        if (err) {
          res.writeHead(404, {'Content-Type': 'text/html'});
          return res.end("404 Not Found");
        }  
        console.log(results[0].name)
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.write(JSON.stringify(results))
        res.end()
      })
    })
  });

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });