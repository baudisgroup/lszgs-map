
var map = L.map( 'map', {
  center: [10.0, 5.0],
  minZoom: 2,
  maxZoom: 6,
  zoom: 2
}).setView([35, 6.143158]);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibW9sYmlvIiwiYSI6ImNqZjE2ZzUycTA4dzQzM3F4aGg3d3Byc3QifQ.GiU2OC0tqT9aZ35b1TAFWw'
}).addTo(map);




// var markerClusters = L.markerClusterGroup();

// for ( var i = 0; i < marks.length; ++i )
// {
//   var popup = marks[i].Country

//   var m = L.marker( [marks[i].lat, marks[i].lng]).bindPopup( popup );

//   markerClusters.addLayer( m );
// }

// map.addLayer( markerClusters );
//''mim','clisci','cb','epibiostats','sp','mls','psc','eco','immed','rna','znz','bsm','nan','sysbio','mtb','biomed','ddnz',
var cluster_all = L.markerClusterGroup();
var cluster_biomed = L.markerClusterGroup();
var cluster_bsm = L.markerClusterGroup();
var cluster_cb = L.markerClusterGroup();
var cluster_clisci = L.markerClusterGroup();
var cluster_ddnz = L.markerClusterGroup();
var cluster_eco = L.markerClusterGroup();
var cluster_epibiostats = L.markerClusterGroup();
var cluster_immed = L.markerClusterGroup();
var cluster_mim = L.markerClusterGroup();
var cluster_mls = L.markerClusterGroup();
var cluster_mtb = L.markerClusterGroup();
var cluster_nan = L.markerClusterGroup();
var cluster_psc = L.markerClusterGroup();
var cluster_rna = L.markerClusterGroup();
var cluster_sp = L.markerClusterGroup();
var cluster_sysbio = L.markerClusterGroup();
var cluster_znz = L.markerClusterGroup();

function makeMarkers(list, cluster){
  for ( var i = 0; i < list.length; ++i )
  {
    var popup = list[i].Country

    var m1 = L.marker( [list[i].lat, list[i].lng]).bindPopup( popup );
    var m2 = L.marker( [list[i].lat, list[i].lng]).bindPopup( popup );

    cluster.addLayer( m1 );
    cluster_all.addLayer(m2);  
  }
};

makeMarkers(biomed, cluster_biomed);
makeMarkers(bsm, cluster_bsm);
makeMarkers(cb, cluster_cb);
makeMarkers(clisci, cluster_clisci);
makeMarkers(ddnz, cluster_ddnz);
makeMarkers(eco, cluster_eco);
makeMarkers(epibiostats, cluster_epibiostats);
makeMarkers(immed, cluster_immed);
makeMarkers(mim, cluster_mim);
makeMarkers(mls, cluster_mls);
makeMarkers(mtb, cluster_mtb);
makeMarkers(nan, cluster_nan);
makeMarkers(psc, cluster_psc);
makeMarkers(rna, cluster_rna);
makeMarkers(sp, cluster_sp);
makeMarkers(sysbio, cluster_sysbio);
makeMarkers(znz, cluster_znz);




var overlayMaps = {
  "ALL": cluster_all,
  "BioMed": cluster_biomed,
  "BSM": cluster_bsm,
  "CB": cluster_cb,
  "CliSci": cluster_clisci,
  "DDNZ": cluster_ddnz,
  "Eco": cluster_eco,
  "Epi": cluster_epibiostats,
  "EvoBio": cluster_nan,
  "imMed": cluster_immed,
  "MIM": cluster_mim,
  "MLS": cluster_mls,
  "MTB": cluster_mtb,
  "PSC": cluster_psc,
  "RNA": cluster_rna,
  "S&P": cluster_sp,
  "SysBio": cluster_sysbio,
  "ZNZ": cluster_znz,
};

map.addLayer( cluster_all );

// map.addLayer( cluster_imls );
// map.addLayer( cluster_neuro );

L.control.layers(overlayMaps, null, {collapsed:false}).addTo(map);