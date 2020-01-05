import 'ol/ol.css';
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import KML from 'ol/format/KML';
import { bbox as bboxStrategy } from 'ol/loadingstrategy';
import GeoJSON from 'ol/format/GeoJSON';
import WFS from 'ol/format/wfs';
import { OSM, TileWMS, BingMaps } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import { Stroke, Style } from 'ol/style';


var vector = new VectorLayer({
  source: new VectorSource({
    // loader: function(extent, resolution, projection) {
    //   var url = 'http://localhost:3000/data/KML_Samples.kml';
    //   var xhr = new XMLHttpRequest();
    //   xhr.open('GET', url, true);


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
    url: 'http://localhost:5000/data/KML_Samples.kml',
    format: new KML()
  })
});

var base = new TileLayer({
  source: new BingMaps({
    imagerySet: 'Aerial',
    key: 'AhIHUfYE1S5tiIOgYs6Nw4TBw9PIv-f7Kzq5n77t8UgXMFoiqVGWOEhn2S9knUMD'
  })
});

const map = new Map({
  target: 'map',
  layers: [base, vector],
  view: new View({
    center: [0, 0],
    zoom: 0
  })
});
var getDisplayFeatureInfo = function (pixel) {
  var features = [];
  map.forEachFeatureAtPixel(pixel, function (feature) {
    features.push(feature);
  });
  var info = [];
  if (features.length > 0) {
    var i, ii;
    for (i = 0, ii = features.length; i < ii; ++i) {
      info.push(features[i].get('name'));
    }
  } else {
    document.getElementById('info').innerHTML = '&nbsp;';
  }
  return info;
}


var displayFeatureInfo = function (pixel) {
  var info = getDisplayFeatureInfo(pixel);

  if (info.length > 0) {
    document.getElementById('info').innerHTML = info.join(', ') || '(unknown)';
  } else {
    document.getElementById('info').innerHTML = '&nbsp;';
  }
};
map.on('pointermove', function (evt) {
  if (evt.dragging) {
    return;
  }
  var pixel = map.getEventPixel(evt.originalEvent);
  displayFeatureInfo(pixel);
});

map.on('click', function (evt) {
  var pixel = map.getEventPixel(evt.originalEvent);
  addFeatureInfo(pixel);
});

var addFeatureInfo = function (pixel) {
  var info = getDisplayFeatureInfo(pixel);
  var tableRef = document.getElementById('selectedItemsTable').getElementsByTagName('tbody')[0];
  var newRow = tableRef.insertRow();

  // Insert a cell in the row at index 0
  var newCell1 = newRow.insertCell(0);

  // Append a text node to the cell
  var newText1 = document.createTextNode('0');
  newCell1.appendChild(newText1);

  // Insert a cell in the row at index 1
  var newCell2 = newRow.insertCell(1);

  // Append a text node to the cell
  var newText2 = document.createTextNode(info.join(', '));
  newCell2.appendChild(newText2);

  // Insert a cell in the row at index 1
  var newCell3 = newRow.insertCell(3);

  // Append a text node to the cell
  var newText3 = document.createTextNode(info.join(', '));
  newCell3.appendChild("test");

}
