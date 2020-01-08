import express from 'express';
let router = express.Router();
var path = require('path');
var fs = require('fs');
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

router.get('/data/:id', cors(), (req, res,next) => {
    var id = req.params.id;
    var fileRoute = path.join(__dirname,'../') + `public/${id}`;
    if (fs.existsSync(fileRoute)){
        let ext = mime.getType('kml');
        console.log(`file ${id} sent`);
        res.sendFile(fileRoute, {headers: {'Content-Type': ext}});
    }
    else{
        next();
    }
});


router.all('*', (req, res) => {
    res.status(404).send({ msg: 'not found' });
});

export default router;
