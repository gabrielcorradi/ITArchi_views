//include the http and url module
var http = require('http'),
    url = require('url'),
    fs = require('fs');;

//create the http server accepting requests to port 3333
http.createServer(function (req, res) {
    //get url infomation
    var urlParts = url.parse(req.url);
//    console.log(req.url, urlParts);

    //direct the request to appropriate function to be processed based on the url pathname
    switch(urlParts.pathname) {
        case "/":
            homepage(req, res);
            break;
        case "/read":
            read(req, res);
            break;
        case "/svc/update":
            update(req, res);
            break;
        default:
            homepage(req,res);
            break;
    }
}).listen(5000);
console.log("Server running at http://localhost:3333/");

//functions to process incoming requests
function homepage(req, res) {

    fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err;
    }

        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();
    });
}

function read(req, res) {
    res.end("Hello, there is no data for reading yet.");
}

function update(req, res) {
    res.end("Hello, there is no data to update.");
}

function mysql(){

    var mysql      = require('mysql');
    var connection = mysql.createConnection({
    host     : 'mysql.eclipse-che.svc.cluster.local',
    user     : 'root',
    password : 'Migueletes2423',
    database : 'telecom'
    });

    connection.connect();

    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
    });

    connection.end();

}


