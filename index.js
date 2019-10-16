import 'ol/ol.css';
import {Map, View} from 'ol';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {bbox as bboxStrategy} from 'ol/loadingstrategy';
import GeoJSON from 'ol/format/GeoJSON';
import {OSM, TileWMS } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import {Stroke, Style} from 'ol/style';



var vectorSource = new VectorSource({
  format: new GeoJSON(),
  url: function(extent) {
    return 'http://gis.epoleodomia.gov.gr/arcgis/services/Rimotomika_Sxedia_Poleod_Meletes/OikodomikaTetragona/MapServer/WFSServer?' +
    // return 'http://geodata.gov.gr/geoserver/ows?
    'service=WFS&request=GetFeature&version=1.2.0&'+
    '&typenames=Οικοδομικά_Τετράγωνα&maxFeatures=100' +
    '&srsname=EPSG:3857&' +
    'bbox=' + extent.join(',') + ',EPSG:3857';;
  },
 strategy: bboxStrategy
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
   // tile2
    vector
  ],
  view: new View({
    center: [0, 0],
    zoom: 0
  })
});
map;