import 'ol/ol.css';
import {Map, View} from 'ol';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {bbox as bboxStrategy} from 'ol/loadingstrategy';
import GeoJSON from 'ol/format/GeoJSON';
import WFS from 'ol/format/wfs';
import {OSM, TileWMS, BingMaps } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import {Stroke, Style} from 'ol/style';


var vector = new VectorLayer({
    source: new VectorSource({
      url: 'data/kml/2012-02-10.kml',
      format: new KML()
    })
  });

var base = new TileLayer({
  source: new BingMaps({
    imagerySet: 'Aerial',
    key: 'Your Bing Maps Key from http://www.bingmapsportal.com/ here'
  })
});
const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    }),
   // tile2
    //tile2
    vector
  ],
  view: new View({
    center: [0, 0],
    zoom: 0
  })
});
map;