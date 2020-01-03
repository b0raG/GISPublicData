import 'ol/ol.css';
import {Map, View} from 'ol';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import KML from 'ol/format/KML';
import {bbox as bboxStrategy} from 'ol/loadingstrategy';
import GeoJSON from 'ol/format/GeoJSON';
import WFS from 'ol/format/wfs';
import {OSM, TileWMS, BingMaps } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import {Stroke, Style} from 'ol/style';


var vector = new VectorLayer({
  source: new VectorSource({
      // loader: function(extent, resolution, projection) {
      //   var url = 'localhost:5000/data';
      //   var xhr = new XMLHttpRequest();
      //   xhr.open('GET', url);
      //   var onError = function() {
      //     vectorSource.removeLoadedExtent(extent);
      //   }
      //   xhr.onerror = onError;
      //   xhr.onload = function() {
      //     if (xhr.status == 200) {
      //       vectorSource.addFeatures(
      //           vectorSource.getFormat().readFeatures(xhr.responseText));
      //     } else {
      //       onError();
      //     }
      //   }
      //   xhr.send();
      // },
      url: 'localhost:1234/data/KML_Samples.kml',
      crossOrigin: 'anonymous',
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
  layers: [ base, vector ],
  view: new View({
    center: [0, 0],
    zoom: 0
  })
});

// var displayFeatureInfo = function(pixel) {
//   var features = [];
//   map.forEachFeatureAtPixel(pixel, function(feature) {
//     features.push(feature);
//   });
//   if (features.length > 0) {
//     var info = [];
//     var i, ii;
//     for (i = 0, ii = features.length; i < ii; ++i) {
//       info.push(features[i].get('name'));
//     }
//     document.getElementById('info').innerHTML = info.join(', ') || '(unknown)';
//     map.getTarget().style.cursor = 'pointer';
//   } else {
//     document.getElementById('info').innerHTML = '&nbsp;';
//     map.getTarget().style.cursor = '';
//   }
// };
// map.on('pointermove', function(evt) {
//   if (evt.dragging) {
//     return;
//   }
//   var pixel = map.getEventPixel(evt.originalEvent);
//   displayFeatureInfo(pixel);
// });

// map.on('click', function(evt) {
//   displayFeatureInfo(evt.pixel);
// });
