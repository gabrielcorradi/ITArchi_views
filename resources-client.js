
 function getSQL(url){
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", url, false ); // false for synchronous request
            xmlHttp.send( null );
            var obj = JSON.parse(xmlHttp.responseText);
//            console.log(obj);

            return obj;
}