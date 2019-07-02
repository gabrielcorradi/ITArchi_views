//include the http and url module
var http = require('http'),
    url = require('url'),
    fs = require('fs'),
    mysql = require('mysql');

//create the http server accepting requests to port 3333
http.createServer(function (req, res) {
    //get url infomation
    var urlParts = url.parse(req.url);
    //console.log(req.url, urlParts);

    //direct the request to appropriate function to be processed based on the url pathname
    switch(urlParts.pathname) {
        case "/":
            homepage(req, res);
            break;
        case "/go.js":
            gojs(req, res);
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

async function gojs(req, res) {
    fs.readFile('./go.js', function (err, gojs) {
        if (err) {
            throw err;
        }

        res.writeHeader(200, {"Content-Type": "text/javascript"});
        res.write(gojs);
        res.end();

    });


    console.log(await mysqlfx());

}

function read(req, res) {
    res.end("Hello, there is no data for reading yet.");
}

function update(req, res) {
    res.end("Hello, there is no data to update.");
}

async function mysqlfx(){

    console.log("inside fx");
try{
    const con = await mysql.createConnection({
        host : 'mysql.eclipse-che.svc.cluster.local',
        user : 'root',
        password : 'Migueletes2423',
        database : 'telecom'});

        const result = await con.query("SELECT * FROM elements limit 3;");
        console.log(result);
        con.end();

    }
    catch(err){}

    return "123";
}


