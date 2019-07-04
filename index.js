//include the http and url module
var http = require('http'),
    url = require('url'),
    fs = require('fs'),
    mysql = require('mysql2/promise');
   // util = require('util');

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
console.log("Server running at http://localhost:5000/");

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

function gojs(req, res) {
    fs.readFile('./go.js', function (err, gojs) {
        if (err) {
            throw err;
        }

        res.writeHeader(200, {"Content-Type": "text/javascript"});
        res.write(gojs);
        res.end();

    });

}

async function read(req, res) {

query_vistas_0 =    "select id as 'key', class, name, container_id as 'group', content, \
                    element_id, \
                    (select class from elements where id=element_id) element_class, \
                    (select name from elements where id=element_id) element_name \
                    from views_objects vo where id in ( \
                        select object_id \
                        from views_objects_in_view vov \
                        where view_id in ('4ee92239-acb9-4109-8f1e-c0a64a8f3b30') \
                    );"

query_vistas_1 =    "select source_object_id 'from', target_object_id 'to', \
                    (select class from relationships where id=relationship_id) rel_class, \
                    (select name from relationships where id=relationship_id)rel_name, \
                    (select documentation from relationships where id=relationship_id) rel_doc \
                    from views_connections vc where id in ( \
                        select connection_id from views_connections_in_view vcv  \
                        where view_id in ('4ee92239-acb9-4109-8f1e-c0a64a8f3b30') \
                    )";



    var rta = await mysqlfx(query_vistas_0);
    res.end(JSON.stringify(rta[0]));

}

function update(req, res) {
    res.end("Hello, there is no data to update.");
}

async function mysqlfx(SQLquery){

//    var host = 'mysql.eclipse-che.svc.cluster.local';
    var host = '10.75.28.17';

    const conn = await mysql.createConnection({
        host : host,
        user : 'root',
        password : 'Migueletes2423',
        database : 'telecom'});

    var result = await conn.query(SQLquery);
    //console.log(result[0]);
    conn.end();
    return result;
}


