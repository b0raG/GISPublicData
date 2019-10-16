import 'ol/ol.css';
import {Map, View} from 'ol';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import WFS from 'ol/format/wfs';
import {OSM, TileWMS } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import {Stroke, Style} from 'ol/style';



var vectorSource = new VectorSource({
  format: new WFS(),
  url:'http://gis.epoleodomia.gov.gr/arcgis/services/Rimotomika_Sxedia_Poleod_Meletes/OikodomikaTetragona/MapServer/WFSServer?' +
    'service=WFS&request=GetFeature&version=1.2.0&'+
    'typeName=Οικοδομικά_Τετράγωνα&maxFeatures=100',
  // loader: function(extent) {
  //   var url= 'http://gis.epoleodomia.gov.gr/arcgis/services/Rimotomika_Sxedia_Poleod_Meletes/OikodomikaTetragona/MapServer/WFSServer?' +
  //   'service=WFS&request=GetFeature&version=1.2.0&'+
  //   'typeName=Οικοδομικά_Τετράγωνα&maxFeatures=100';
  //   var xhr = new XMLHttpRequest();
  //   xhr.open('GET', url);
  //   var onError = function() {
  //     vectorSource.removeLoadedExtent(extent);
  //   }
  //   xhr.onerror = onError;
  //    xhr.onload = function() {
  //      if (xhr.status == 200) {
  //        vectorSource.addFeatures(
  //            vectorSource.getFormat().readFeatures(xhr.responseText));
  //      } else {
  //        onError();
  //      }
  //    }
  //    xhr.send();
  // },
 //strategy: bbox
});
var vector = new VectorLayer({
  source: vectorSource,
  style: new Style({
    stroke: new Stroke({
      color: 'rgba(0, 0, 255, 1.0)',
      width: 2
    })
  })
})
var tile1 = new TileLayer({
  source: new TileWMS({
    url: 'http://geodata.gov.gr/geoserver/ows',
    params: {'LAYERS': 'geodata.gov.gr:3fbc1aea-3bdd-4bbc-811c-e11758213a8d'},
  serverType: 'geoserver'
  })
});

var tile2 = new TileLayer({
  source: new TileWMS({
    url: 'http://gis.ktimanet.gr/wms/wmsopen/wmsserver.aspx',
    params: {'LAYERS': 'BASEMAP'},
  serverType: 'geoserver'
  })
});
const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    //tile2
    vector
  ],
  view: new View({
    center: [0, 0],
    zoom: 0
  })
});
map;