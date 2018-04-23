/**
 * Package imports
 */

var express = require('express');                               //express
var app = express();                                            //invoke express in app
//var port = process.env.PORT || 8080;                          //Port for the app to listen on, Where 8080 is may require additional information, I.E. process.env.port || 8080
var port = require('./app/port/portConfig');                    //port
var morgan = require('morgan');                                 //Middleware for logging
var bodyParser = require('body-parser');                        //Middleware for interpretation
var router = express.Router();                                  //create router variable for app routing file
var appRoutes = require('./app/routes/api')(router);            //Allows access to app routers (in api.js file)
var path = require('path');                                     //Call path package to allow redirects through index
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var nicknames = [];
//var passport = require('passport');                             //passport allows OAuth login to work
//var social = require('./app/passport/passport')(app, passport); //Controls oAuth login system

//var test = require('./app/test/test');                          //test of require to prove



/**
 * Middleware activation
 * Order of app.use is important here (essentially think scoping), we want to
 * 1) log the routes
 * 2) parse the data
 * 3) use the routes (with the now parsed data)
 */

app.use(morgan('dev'));                             //Every time a request is made to the server, it is logged.
app.use(bodyParser.json());                         //for parsing application/json
app.use(bodyParser.urlencoded({ extended: false})); //for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public'));     //Middleware utilises express to feed a static file location - allows user to access all public data
app.use('/api', appRoutes);                         //for utilising app routes we created, and apply the /api/ file path to deconflict backend and frontend - essentially means that these routes will be localhost:8080/api/whatever, the "api" will allows to know which route it is specifically, ie, where it came from

/**
 * CORS request setup
 */

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
});

/**
 * MongoDB Controls - Think about moving this to another file. - Disabled until required
 * Mongoose is a handler for MongoDB -> AngularJS
 * Have Mongod up and running if you want to test this
 */

var mongoose = require('mongoose');                 //import mongoose, allow MongoDB connectivity
//the "test" part of the lower address is the name of the DB to be accessed.
//you also need to specify the port after localhost, dependant on the port being used by mongodb (it will tell you if you look)
mongoose.connect('mongodb://localhost:27017/user_test', function(err){
    if(err){
        console.log('WH1401676: Not connected to MongoDB, ' + err);
        //console.log(test.phrase2);
    } else {
        console.log('WH1401676: Successfully connected to MongoDB');
        //console.log(test.phrase2);
    }
});

/**
 * No matter what the user types, feed them this index page, denoted by '*'
 */
app.get('*', function(req, res){
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'))
});

/**
 * Server Ports
 * I.E. process.env.port || 8080, This tells the server to use its designated/required port, or 8080 as a default
 */
server.listen(port.port, function(){
    //function to report back that server is running in cmd line
    console.log('Server Running, Port: ' + port.port);
});

/**
 *  Setup io sockets
 */

io.sockets.on('connection', function(socket){

    socket.on('new user', function(data, callback){
        if (nicknames.indexOf(data) != -1){
            //callback(false);
        } else {
            //callback(true)
            socket.nickname = data;
            var joinedtheroom = " joined chat";
            nicknames.push(socket.nickname);
            io.sockets.emit('new message', {msg: joinedtheroom, nick:socket.nickname});
        }
    });

    socket.on('send message', function(data){
        io.sockets.emit('new message', {msg: data, nick: socket.nickname});
    });

    socket.on('disconnect', function(data){
        if(!socket.nickname) return;
        nicknames.splice(nicknames.indexOf(socket.nickname),1);
        io.sockets.emit('usernames', nicknames);
    });

});
