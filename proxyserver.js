const express = require('express');
const request = require('request');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/requestsource', (req, res) => {
    request(
      { url:function (extent){
      return 'http://gis.epoleodomia.gov.gr/arcgis/services/Rimotomika_Sxedia_Poleod_Meletes/OikodomikaTetragona/MapServer/WFSServer?' +
      'service=WFS&request=GetFeature&version=1.2.0&'+
      '&typenames=Οικοδομικά_Τετράγωνα&maxFeatures=100' +
      'outputFormat=application/jsonp&srsname=EPSG:3857&' +
      'bbox=' + extent.join(',') + ',EPSG:3857' }
      },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: err.message });
        }
  
        res.json(JSON.parse(body));
      }
    )
  });


  const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
  