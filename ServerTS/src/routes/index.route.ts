import express from 'express';
let router = express.Router();
var path = require('path');
const mime = require('mime');
var cors = require('cors')

router.get('/', (req, res) => {
    res.send({ msg: 'hello! Server is up' });
});
router.use(
    function(req, res, next) {
        console.log('Request URL:', req.originalUrl);
        next();
    },
    function(req, res, next) {
        console.log('Request Type:', req.method);
        next();
    },
);

router.get('/data/KML_Samples.kml', cors(), (req, res) => {
    let ext = mime.getType('kml');
    res.sendFile(path.join(__dirname,'../') + 'public/KML_Samples.kml', {headers: {'Content-Type': ext}});
});
router.all('*', (req, res) => {
    res.status(404).send({ msg: 'not found' });
});

export default router;
