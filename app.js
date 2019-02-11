const url = require('url');
const { 
    getBook,
    getBooks } = require('./query')
const app = (req,res)=> {

    var q = url.parse(req.url, true);
    const path = q.pathname.split('/').filter(e=>e.length>0)
    console.log(q.query)
    const root = path.join('/')
    console.log(root)
    if(req.method === "GET") {
        switch(root) {
            case '': {
                res.writeHead(200, {'Content-Type': 'text/document'});
                res.write("This is an API")
                res.end()
            }
            break;

            case 'books': {
                getBooks((error,results)=>{
                    if(error)  res.end("something went wrong")
                    res.writeHead(200, {'Content-Type': 'text/json'});
                    res.write(JSON.stringify(results))
                    res.end()
                })
            }
            break;

            case `books/${path[1]}`: {
                getBook((error,results)=>{
                    if(error)  res.end("something went wrong")
                    res.writeHead(200, {'Content-Type': 'text/json'});
                    res.write(
                        JSON.stringify(
                            {
                                results,
                                params:path[1]
                            }
                        )
                    )
                    res.end()
                })
            }
            break;
            default: {
                res.end("Error 404 not found")
            }
        }
    } else if(req.method === 'POST') {
        switch(q.pathname) {
            case '/': {
                res.writeHead(200, {'Content-Type': 'text/document'});
                res.write("This is an API")
                res.end()
            }
            break;

            case '/books': {
                getBooks((error,results)=>{
                    if(error)  res.end("something went wrong")
                    res.writeHead(200, {'Content-Type': 'text/json'});
                    res.write(JSON.stringify(results))
                    res.end()
                })
  
            }
        }
    }
}


module.exports = app;