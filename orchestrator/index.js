var express = require('express'),
  app = express(),
  port = process.env.PORT || 5000,
  bodyParser = require('body-parser')
  cors = require('cors')
  ;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

let apiRoutes = require("./routes");
app.use("/", apiRoutes);

app.listen(port);

console.log('RESTful API server started on: ' + port);