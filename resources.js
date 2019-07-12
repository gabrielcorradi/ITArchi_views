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

  read: async function (params, res ) {

    //, 'true' isGroup
    //, if(container_id='"+ params.view +"','true', 'false') 'isGroup'
    query_vistas_0 =    "select id as 'key', \
                        class, name, container_id as 'group', content, element_id, \
                        (select class from elements where id=element_id) element_class, \
                        (select name from elements where id=element_id) element_name, \
                        x, y , CONCAT(`width`, ' ', `height`) size \
                        from views_objects vo where id in ( \
                            select object_id \
                            from views_objects_in_view vov \
                            where view_id in ('"+ params.view +"') \
                        );"

    query_vistas_1 =    "select source_object_id 'from', target_object_id 'to', \
                        (select class from relationships where id=relationship_id) rel_class, \
                        (select name from relationships where id=relationship_id)rel_name, \
                        (select documentation from relationships where id=relationship_id) rel_doc, \
                        (SELECT container_id FROM views_objects WHERE id=vc.source_object_id) from_grp, \
                        (SELECT container_id FROM views_objects WHERE id=vc.target_object_id) to_grp \
                        from views_connections vc where id in ( \
                            select connection_id from views_connections_in_view vcv  \
                            where view_id in ('"+ params.view +"') \
                        )";

    query_vistas_2 =    "select id, name, documentation, viewpoint from views;"

        var query = [];

        query.push(query_vistas_0);
        query.push(query_vistas_1);
        query.push(query_vistas_2);

        var rta = await this.mysqlfx(query[params.id]);

        if(params.id==0) rta[0] = defgroups(rta[0], params.view);
        if(params.id==1) rta[0] = deflinks(rta[0]);

        console.log(JSON.stringify(rta[0]));
        res.end(JSON.stringify( rta[0] ));
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

var defgroups = function (rta, view) {

  for (var key in rta) {

    
    //if (rta[key].group == view) rta[key].isGroup = true;
    
    for (var key2 in rta) {
      if (rta[key].key == rta[key2].group) { rta[key].isGroup = true; break; }
    }
    


    
    if (rta[key].group != view){ 
      rta2 = fixloc(rta[key])
      rta[key].x += rta2.x;
      rta[key].y += rta2.y;

      //console.log("name\t"  + rta[key].name + "x=\t"  + rta[key].x + "\ty=\t"  + rta[key].y );
      //console.log("x\t"  + rta2.x + "y=\t"  + rta2.y)
    }
    

    rta[key].loc = rta[key].x + " " + rta[key].y

    ///////// Fix Note Content
    if(rta[key].class == "DiagramModelNote") rta[key].name = rta[key].content;


  }



  return rta;

  function fixloc(i){
    rta2 = {}
    for (var key in rta) {
      if (rta[key].key == i.group) { rta2["x"] = rta[key].x; rta2["y"] = rta[key].y; break}
    }
    return rta2;

  }

}

var deflinks = function (rta) {

  for (var key = rta.length - 1; key >= 0; --key) {

    if (rta[key].from == rta[key].to_grp) { rta.splice(key, 1); continue; }
    if (rta[key].to == rta[key].from_grp) { rta.splice(key, 1); continue; }

  }

  return rta;

}