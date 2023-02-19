const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const JWT_Secret = 'your_secret_key';
let users;
var sessions = {};
var subscribers = {};
const incomingForm = require("formidable").IncomingForm

global.isTesting = true

router.post("/api/addNews", (req, res, next) => {
    console.log("SUB ON: "+subscribers[req.body.user.id].token);
    console.log(sessions);
    subscribers[req.body.user.id].socket.emit("created-news", {});
    for(const v of req.body.friends) {
        if(subscribers[v.id]) {
            subscribers[v.id].socket.emit("created-news", {});
        }
    }
    res.status(200).end();
    return;
});

router.post('/api/authenticate', (req, res, next) => {
    //throw "ZDAROV";
    if (req.body) {
        users = JSON.parse(req.body.all_users);
        var user = req.body;
        let user_db = getUserByEmail(user.email, users);

        if(user_db.password === user.password) {
            var token = jwt.sign(user, JWT_Secret);
            sessions[token] = user_db.id;
            user.id = user_db.id;
            res.status(200).send({
                signed_user: user,
                token: token,
            });
        }
        else {
            res.status(403).send({
                errorMessage: 'Please provide email and password'
            });
        }
    }
});

router.post("/photo", (req, res, next) => {
    let form = new incomingForm();
    form.on("file", (field, file) => {
        let new_fname = file.newFilename+'.'+file.mime.substring((file.mimetype.lastIndexOf('/')+1));
        fs.writeFileSync("../uploads/"+new_fname, fs.readFileSync(file.filepath));

    })

});

if(!global.isTesting) {
    global.server_io.on("connection", (socket) => {
        socket.on("news-subscribe", (args)=> {
            if(args.token && sessions[args.token]!==null) {
                subscribers[sessions[args.token]] = {token: args.token, socket};
            }
        })
    })
}


function getUserByEmail(email, users) {
    for(const v of users) {
        if (v.email === email) {
            return v;
        }
    }
}

module.exports = {router, getUserByEmail};