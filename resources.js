var  http = require('http'),
    fs = require('fs'),
    mysql = require('mysql2/promise'),
   // util = require('util');
    mime = require('mime');

module.exports = {

  homepage: function (req, res) {
    fs.readFile('./index.html', function (err, html) {
        if (err) {
            throw err;
        }
        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();
    });
  },

  read: async function (id, res) {
    query_vistas_0 =    "select id as 'key', 'true' isGroup, class, name, container_id as 'group', content, \
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

    query_vistas_2 =    "select id, name, documentation, viewpoint from views;"

        var query = [];

        query.push(query_vistas_0);
        query.push(query_vistas_1);
        query.push(query_vistas_2);

        var rta = await this.mysqlfx(query[id]);
        res.end(JSON.stringify(rta[0]));
  },

  mysqlfx: async function(SQLquery){

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
  },

  test_res:function(req, res){

    mtype = mime.getType("." + req.url);

    fs.readFile("."+ req.url, function (err, html) {
        if (err) {
            throw err;
        }

        res.writeHeader(200, {"Content-Type": mtype });
        res.write(html);

        res.end();
    });
  },

  test: function(req, res){
    fs.readFile('./index2.html', function (err, html) {
        if (err) {
            throw err;
        }
        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();
    });
  }

};

var demo = function () {
}
