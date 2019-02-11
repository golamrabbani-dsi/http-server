const url = require('url');
const { getBooks } = require('./query')
const app = (req,res)=> {

    var q = url.parse(req.url, true);
    if(req.method === "GET") {
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
    } else if(req.method === 'POST') {}
}


module.exports = app;