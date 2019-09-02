
var rta = [
{"name":"CALIPSO","ubicacion":"PACHECO","hw":"HP BL460c G7","servidor":"plcalipsoapp1","version":"Red Hat Enterprise Linux 6","servicio":"Sistema Operativo","hostname":"plcalipsoapp1"},
{"name":"CALIPSO","ubicacion":"PACHECO","hw":"HP BL460c G7","servidor":"plcalipsoapp2","version":"Red Hat Enterprise Linux 6","servicio":"Sistema Operativo","hostname":"plcalipsoapp2"},
{"name":"CALIPSO","ubicacion":"ESTOMBA","hw":"DELL Poweredge R910","servidor":"plnx0220","version":"Red Hat Enterprise Linux 6","servicio":"Sistema Operativo","hostname":"plnx0220"},
{"name":"CALIPSO","ubicacion":"ESTOMBA","hw":"DELL Poweredge R910","servidor":"plnx0221","version":"Red Hat Enterprise Linux 6","servicio":"Sistema Operativo","hostname":"plnx0221"},
{"name":"CALIPSO","ubicacion":"PACHECO","hw":"HP BL460c G8","servidor":"plnx0302","version":"Red Hat Enterprise Linux 6","servicio":"Sistema Operativo","hostname":"plnx0302"},
{"name":"CALIPSO","ubicacion":"PACHECO","hw":"HP BL460c G8","servidor":"plnx0326","version":"Red Hat Enterprise Linux 6","servicio":"Sistema Operativo","hostname":"plnx0326"},
{"name":"CALIPSO","ubicacion":"ESTOMBA","hw":"HP BL460c G1","servidor":"pwin0315","version":"Win. Server 2003 R2 SE","servicio":"Sistema Operativo","hostname":"PWIN0315"},
{"name":"CALIPSO","ubicacion":"ESTOMBA","hw":"HP BL460c G1","servidor":"pwin0316","version":"Win. Server 2003 R2 SE","servicio":"Sistema Operativo","hostname":"PWIN0316"},
{"name":"CALIPSO","ubicacion":"PACHECO","hw":"HP BL460c G1","servidor":"pwin0467","version":"Win. Server 2003 R2 SE","servicio":"Sistema Operativo","hostname":"PWIN0467"},
{"name":"CALIPSO","ubicacion":"PACHECO","hw":"HP BL460c G1","servidor":"pwin0471","version":"Win. Server 2003 R2 SE","servicio":"Sistema Operativo","hostname":"PWIN0471"},
{"name":"CALIPSO","ubicacion":"ESTOMBA","hw":"DELL Poweredge R910","servidor":"POFCTPR1","version":"Oracle 11.2.0.4.0","servicio":"Base de Datos","hostname":"plnx0220"},
{"name":"CALIPSO","ubicacion":"ESTOMBA","hw":"DELL Poweredge R910","servidor":"POFCTPR1_*","version":"Oracle 11.2.0.4.0","servicio":"Base de Datos","hostname":"plnx0221"},
{"name":"CALIPSO","ubicacion":"PACHECO","hw":"HP BL460c G8","servidor":"POFCTPR-DRP","version":"Oracle 11.2.0.4.0","servicio":"Base de Datos","hostname":"plnx0302"},
{"name":"CALIPSO","ubicacion":"PACHECO","hw":"HP BL460c G8","servidor":"POFCTPR-DRP_*","version":"Oracle 11.2.0.4.0","servicio":"Base de Datos","hostname":"plnx0326"},
{"name":"CALIPSO","ubicacion":"ESTOMBA","hw":"DELL Poweredge R910","servidor":"POFCTSE1","version":"Oracle 11.2.0.4.0","servicio":"Base de Datos","hostname":"plnx0220"},
{"name":"CALIPSO","ubicacion":"ESTOMBA","hw":"DELL Poweredge R910","servidor":"POFCTSE1_*","version":"Oracle 11.2.0.4.0","servicio":"Base de Datos","hostname":"plnx0221"},
{"name":"CALIPSO","ubicacion":"PACHECO","hw":"HP BL460c G8","servidor":"POFCTSE-DRP","version":"Oracle 11.2.0.4.0","servicio":"Base de Datos","hostname":"plnx0302"},
{"name":"CALIPSO","ubicacion":"PACHECO","hw":"HP BL460c G8","servidor":"POFCTSE-DRP_*","version":"Oracle 11.2.0.4.0","servicio":"Base de Datos","hostname":"plnx0326"}
]

var query = {};
var query2 = [];

// Sites
for (var key in rta)
    query[rta[key].ubicacion] = rta[key].name;

// HW in sites
for (var key in rta)
    query[rta[key].ubicacion + ";" + rta[key].hw] = rta[key].name;

for (var key in query){
    
    if(key.search(";")<0)
        // HW in sites
        query2.push({ "key" : key, "isGroup" : "true" });
    else{
        //Sites
        query2.push({ "key" : key, "element_class" : "Node", "group" : key.split(";")[0], "name" : key.split(";")[1], "isGroup" : "true"});
    }
} 

for (var key in rta){
    if (rta[key].servicio=="Base de Datos")
    query2.push({ "key" : rta[key].servidor, "element_class" : "Node", "group" :  rta[key].ubicacion + ";" + rta[key].hw, "name" : rta[key].servidor });
}

// query2.push(query);

console.log(JSON.stringify(query2));
