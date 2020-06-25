var express = require('express'),
    app = express(),
    port = process.env.PORT || 5002,
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cors = require('cors')
    ;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/MicroServiceOrder',
    {
        useNewUrlParser: true
    }).then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    }
);

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

let apiRoutes = require("./routes");
app.use("/", apiRoutes);

app.listen(port);

console.log('RESTful API server started on: ' + port);