const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const rollbar_module = require("rollbar");

const rollbar = new rollbar_module({
    accessToken: "3d148bed26fe450f81906754502c44e8",
    captureUncaught: true,
    captureUnhandledRejections: true});
global.rollbar = rollbar;

const corsOptions = {
    'credentials': true,
    'origin': true,
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'allowedHeaders': 'Authorization,X-Requested-With,X-HTTPMethod-Override,Content-Type,Cache-Control,Accept',
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors(corsOptions));


const http_server = require("http").Server(app);

const io = require("socket.io")(http_server, {
    cors: {
        origins: ["*"],
        handlePreflightRequest: (req, res) => {
            res.writeHead(200, {
                "Access-Control-Allow-Credintals": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,POST,PUT,GET,HEAD,PATCH,DELETE",
            });
            res.end();
        }
    }
});
global.server_io = io;

const router = require("./routes.js");
app.use("/", router.router);
app.use(rollbar.errorHandler());
http_server.listen(5000);

module.exports = app;


//app.listen(5000);