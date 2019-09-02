//include the http and url module
var http = require('http'),
    url = require('url')
    tools = require('./resources.js');

//create the http server accepting requests to port 3333
http.createServer(function (req, res) {
    //get url infomation
    var urlParts = url.parse(req.url);
    //console.log(req.url, urlParts);

    var params = url.parse(req.url,true).query;

    //console.log(urlParts.pathname);
    //console.log(params);

    //direct the request to appropriate function to be processed based on the url pathname
    switch(urlParts.pathname) {
        case "/":
            tools.homepage(req, res);
            break;
            
        case "/test":
            tools.test(req, res);
            break;

        case "/get":
            tools.read(params, res);
            break;
        
        default:
            tools.test_res(req,res);
            break;
    }
}).listen(5000);
console.log("Server running at http://localhost:5000/");

