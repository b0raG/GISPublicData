import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index.route';
import config from './config/config';
//import expressValidation from 'express-joi-validation';
import mongoose from 'mongoose';
var nodestatic = require('node-static');
var path = require('path');
const mime = require('mime');
var cors = require('cors');

class App {
    public app;

    constructor() {
        // Set up the express app
        this.app = express();
        this.app.use(cors());
        this.app.options('*', cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    //    this.connectToDB();
        this.mountRoutes();
       // this.app.use(routes);
    }

  private connectToDB():void{
      //connect to mongodb
          mongoose
          .connect(config.connectionstring, { useNewUrlParser: true })
          .then(() => console.log("Connected to MongoDB..."))
          .catch(err => console.error("Could not connect to MongoDB..."));
  }

  private mountRoutes(): void {
      this.app.set('baseUrl', config.baseUrl);
      this.app.listen(config.port,config.host, () => {
        console.log(`server running on http://${config.host}:${config.port}`)
      });
      this.app.use(routes);
      let ext = mime.getType('kml');
      express.static.mime.define({ext: ['kml']});
      this.app.use(express.static(path.join(__dirname, 'public'), {extensions:['kml']}))
      this.app.use((err, req, res, next) => {
        if (err != null) {
          let fieldErrorMessages = [];
          err.errors.forEach((el, i) => {
            fieldErrorMessages.push({field: el.field, message: el.messages[0]});
          })
          res.status(err.status).json({message: err.message, fieldMessages: fieldErrorMessages});
        } else {
          res.status(500)
            .json({
              status: err.status,
              message: err.message
            });
        }
      });
      this.app.use(function(req, res) {
        res.status(404).send({url: req.originalUrl + ' not found'})
      });

      console.log();
  }
}

export default new App().app;


