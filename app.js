const url = require('url');
const {getBooks} = require('./query')
const app = (req,res)=> {

    var q = url.parse(req.url, true);
    
    switch(q.pathname) {
       
        case '/': {
            res.writeHead(200, {'Content-Type': 'text/document'});
            res.write("This is an API")
            res.end()
        }
        break;
        case '/api': {
           
            let results = getBooks((error,results)=>{
                res.writeHead(200, {'Content-Type': 'text/json'});
                res.write(JSON.stringify(results))
                res.end()
            })

            
            
        }
    }
}


module.exports = app;