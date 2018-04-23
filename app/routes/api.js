/**
 * External Routing File
 * Contains routing rules for Client -> Server
 */

//NB You don't have to add .js to the end of files, since Node assumes this
var User = require('../models/user');               //This allows the use of the user.js file and accompanying schema
var Adventurer = require('../models/adventurer');         //This allows the use of the adventurer.js file and accompanying schema
var jwt = require('jsonwebtoken');                  //This allows the use of jsontokens
var secret = 'intelcorei5inside';                   //Define encryption secret phrase
var bcrypt = require('bcrypt-nodejs');              //Encryption module

module.exports = function(router) {                  //adding "router" here means we are no longer using, app.use, app.get, app.post etc, but router.use, router.get, router.post etc

    /**
     * User Registration Route
     * http://localhost:8080/api/users
     */
    router.post('/users', function (req, res) {
        //New User - defined by User Schema
        var user = new User();

        //Variables - grab request variables and pass to User Schema
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        user.guildname = req.body.username + "'s Guild";
        user.gold = 1000;                                    //Starting gold is 100;

        //If details not provided - this does a check of the json to ensure they're input - serverside check complementing client side check
        if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == '') {
            res.json({success: false, message: 'Ensure username/password/email provided'});
        }
        //Else details were provided
        else {
            //Save User to MongoDB
            user.save(function (err) {
                //respond
                if (err) {
                    //res.send(err);
                    res.json({success: false, message: 'User name or Email already exists'});
                } else {
                    //save the user to the DB
                    res.json({success: true, message: 'User Created: ' + user.guildname});
                }
            });
        }
    });

    /**
     * Users update route
     */
    router.put('/users', function (req, res){
        //console.log('1 Main Request Body: ' + req.body);
        var requestingUser = req.body.username;
        var query = { username: requestingUser };
        var updateType = req.body.updateType;
        //console.log("My Update Type: " + updateType);
        //Update Password
        if(updateType==1){
            //console.log("password update process started for: " + requestingUser);
            //Variables - grab request variables and pass to User Schema
            var updPassword = req.body.confirmNewPassword;
            //Encrypt password
            bcrypt.hash(updPassword, null, null, function(err, hash){
                if(err) return err;
                else {
                    //console.log("I'm going to update the password now....")
                    updPassword = hash;
                    //console.log(updPassword);
                    User.findOneAndUpdate(query, { $set: {
                            password: updPassword
                        }}, function(err, doc){
                        if(err){
                            console.log("Something wrong when updating data!");
                        }
                        //console.log(doc);
                    });
                }
            });
            res.json({success: true, message: 'Password Updated'});
        }

        //Update Email
        else if(updateType==2){
            //console.log("email update process started for: " + requestingUser);
            //Variables - grab request variables and pass to User Schema
            var updEmail = req.body.confirmNewEmail
            //console.log(updEmail);
            User.findOneAndUpdate(query, { $set: {
                            email: updEmail
            }}, function(err, doc){
                if(err){
                    console.log("Something wrong when updating data!");
                }
                //console.log(doc);
            });
            res.json({success: true, message: 'Email Updated'});
        }

        //Update Guild Name
        else if(updateType==3){
            //console.log("guild name update process started for: " + requestingUser);
            //Variables - grab request variables and pass to User Schema
            var updGuildName = req.body.confirmNewGuildName;
            //console.log(updGuildName);
            User.findOneAndUpdate(query, { $set: {
                            guildname: updGuildName
                        }}, function(err, doc){
                if(err){
                    console.log("Something wrong when updating data!");
                }
                console.log(doc);
            });
            res.json({success: true, message: 'Guild Name Updated'});
        }
        else{
            res.json({success: false, message: 'Unknown Update Attempted'});
        }
    });

    /**
     * User Login Route
     * http://localhost:8080/api/authenticate
     */
    router.post('/authenticate', function (req, res) {
        //Search for a user by username and select (return) their email, username and password.
        User.findOne({username: req.body.username}).select('email username password guildname gold').exec(function (err, user) {
            //If the system returns an error
            if (err) throw err;
            //If the user doesn't exist
            if (!user) {
                res.json({success: false, message: 'Could not Authenticate User'});
            }
            //If the user does exist
            else if (user) {
                //If there is a password parameter
                if (req.body.password) {
                    //Password authentication
                    var validPassword = user.comparePassword(req.body.password);
                    //If password not valid
                    if (!validPassword) {
                        res.json({success: false, message: 'Could not Authenticate Password'});
                    }
                    //Else generate a session token to allow user to be "logged in"
                    else {
                        var token = jwt.sign({
                                //Data to be encrypted into the folder - nothing confidential here - this is data we can use on the front end!
                                username: user.username,
                                email: user.email,
                                guildname: user.guildname,
                                gold: user.gold
                                //Secret
                            }, secret
                            //Expiration details - token will be valid for stated period of time
                            , {expiresIn: '24h'});
                        res.json({success: true, message: 'User Authenticated', token: token});
                    }
                }
                //If there is no password provided then return error
                else {
                    res.json({success: false, message: 'No Password Provided'});
                }
            }
        });
    });

    /**
     * Route to get the current user
     */
    //Middleware
    router.use(function (req, res, next) {
        //Get the token
        var token = req.body.token || req.body.query || req.headers['x-access-token'];
        //Once token detected, validate correct token
        if (token) {
            //verify token
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    res.json({success: false, message: 'Token invalid'});
                }
                else {
                    //assign token to a variable we can use to send back - sends back decoded token, so basically, whatever was put into it, ie username/email
                    req.decoded = decoded;
                    next();
                }
            });
        }
        //If no token detected deny
        else {
            res.json({success: false, message: 'No token provided'});
        }
    });


    /**
     *
     */

    // on routes that end in /users/:user_id
    router.route('/users/:user_id')
    // get the user with that id
        .get(function (req, res) {
            User.findById(req.params.user_id, function (err, user) {
                if (err) return res.send(err);
                // return that user
                res.json(user);
            });
        });

    //on routes that end in /users
    router.route('/users')

        //This route will only work for admins
        .get(function (req, res) {
            User.find(function(err, users){
                if (err) return res.send(err);
                //return all users
                res.json(users);
            });

        });

    /*router.route('/marketplace')
        .get(function (req, res) {
            User.find(function(err, users){
                if (err) return res.send(err);
                //return all users
                res.json(users);
            });

        });*/

    /**
     * Adventurer Creator
     * http://localhost:8080/api/adventurer
     */
    router.post('/adventurer', function (req, res) {
        //New Adventurer - defined by Adventurer Schema
        var adventurer = new Adventurer();
        /*var AdventurerSchema = new Schema ({
            owner: { type: String},                                         //The Owner of the Adventurer
            name: { type: String, index: {unique: true} },                  //Adventurers Name
            class: { type: String},                                         //Adventurers Class
            race:  { type: String},                                         //Adventurers Race
            atk: {type: Number},                                            //Adventurers Attack Stat
            def: {type: Number},                                            //Adventurers Defence Stat
            hp: {type: Number},                                             //Adventurers Hitpoints
            cost: {type: Number}                                            //Adventurers Value exemplified by the cost to buy them
        });*/

        //Variables - grab request variables and pass to User Schema
        adventurer.owner = req.body.owner;
        adventurer.name = req.body.name;
        adventurer.class = req.body.class;
        adventurer.race = req.body.race;
        adventurer.atk = req.body.atk;
        adventurer.def = req.body.def;
        adventurer.hp = req.body.hp;
        adventurer.cost = req.body.cost;

        //If details not provided - this does a check of the json to ensure they're input - serverside check complementing client side check
        if (req.body.owner == null || req.body.owner == ''
            || req.body.name == null || req.body.name == ''
            || req.body.class == null || req.body.class == ''
            || req.body.race == null || req.body.race == ''
            || req.body.atk == null || req.body.atk == ''
            || req.body.def == null || req.body.def == ''
            || req.body.hp == null || req.body.hp == ''
            || req.body.cost == null || req.body.cost == '') {
            res.json({success: false, message: 'Ensure all fields are submitted: owner/name/class/race/atk/def/hp/cost'});
        }
        //Else details were provided
        else {
            //Save User to MongoDB
            adventurer.save(function (err) {
                //respond
                if (err) {
                    res.send(err);
                    //res.json({success: false, message: 'Adventurer Name already exists'});
                } else {
                    //save the user to the DB
                    res.json({success: true, message: 'Adventurer Created: ' + adventurer.name});
                }
            });
        }
    });

    /**
     * This function is getting the individual users adventurers
     */
    router.get('/adventurers', function(req, res){
        //This find function will only allow the user to access their own adventurers
        Adventurer.find({'owner': req.decoded.username}, 'name class race atk def hp cost available', function (err, adventurers) {
            console.log("Owner: " + req.decoded.username + " adventurers requested");
            if (err){
                //console.log("Error Encountered");
                return res.send(err);
            }
            // return the users adventurers
            else {
                //console.log("I technically worked");
                //console.log(req.decoded.username);
                res.json(adventurers);
            }
        });
    });

    /**
     * This function returns the marketplace of adventurers
     */
    // on routes that end in
    router.get('/adventurers/marketplace', function(req, res){
        //This find function will only allow the user to access their own adventurers
        Adventurer.find({'owner': 'marketplace'}, 'owner name class race atk def hp cost', function (err, adventurers) {
            //console.log("Owner: " + req.decoded.username + " adventurers requested");
            if (err){
                //console.log("Error Encountered");
                return res.send(err);
            }
            // return the users adventurers
            else {
                //console.log("Retrieving Marketplace");
                //console.log(req.decoded.username);
                res.json(adventurers);

            }
        });
    });
    /**
     * This function regenerates the token
     */
    router.get('/regenerate/:user_id', function(req, res){
        //console.log(req.params.user_id);
        //console.log("Getting Gold For: " + req.params.user_id);
        console.log("REGENERATING!!!");
        User.findOne({username: req.params.user_id}).select('email username guildname gold').exec(function (err, user) {
            //If the system returns an error
            if (err) throw err;
            //If the user doesn't exist
            if (!user) {
                res.json({success: false, message: 'Could not Authenticate User'});
            }
            //If the user does exist
            else if (user) {
                var token = jwt.sign({
                        //Data to be encrypted into the folder - nothing confidential here - this is data we can use on the front end!
                        username: user.username,
                        email: user.email,
                        guildname: user.guildname,
                        gold: user.gold
                        //Secret
                    }, secret
                    //Expiration details - token will be valid for stated period of time
                    , {expiresIn: '24h'});
                res.json({success: true, message: 'regenerated', token: token});
            }
        });
    });
    /**
     * This function runs A LOT to get the gold...
     */
    router.get('/myGold/:user_id', function(req, res){
        //console.log(req.params.user_id);
        //console.log("Getting Gold For: " + req.params.user_id);
        User.findOne({username: req.params.user_id}).select('gold').exec(function (err, user) {
            //If the system returns an error
            if (err) throw err;
            //If the user doesn't exist
            if (!user) {
                res.json({success: false, message: 'Could not Authenticate User'});
            }
            //If the user does exist
            else if (user) {
                //console.log("Sending back gold from server");
                //console.log("User Gold: " + user.gold);
                res.json({success: true, message: 'User Authenticated', gold: user.gold});
            }
        });
    });


    /**
     * This route buys an Adventurer
     */
    router.put('/buyAdventurer', function (req, res){
        var desiredAdventurer = req.body.name;                              //Adventurer to be purchased
        var requestingUser = req.body.requestingUser;                       //User wanting to purchase
        var cost = req.body.cost;                                           //Cost of adventurer
        var gold = req.body.goldData;                                       //User gold
        var newGold = gold-cost;
        var query = { name: desiredAdventurer };                            //Query for adventurer
        var query2 = { username: requestingUser };                          //Query for user

        /*console.log("Desired Adventurer: " + desiredAdventurer);
        console.log("Requesting User: " + requestingUser);
        console.log("Adventurer Cost: " + cost);
        console.log("Your Gold: " + gold);
        console.log("Modified Gold: "  + newGold);
        console.log("Query 1: " + query);
        console.log("Query 2: " + query2);*/

        Adventurer.findOneAndUpdate(query, { $set: {
                owner: requestingUser
            }}, function(err, doc){
            if(err){
                //console.log("Something wrong when buying adventurer!");
                //console.log(doc);
                res.json({success: false, message: err});
            }
            else{
                //console.log("Changed Owner");
            }
        });
        //console.log("Modify: " + requestingUser + "'s Gold to: " + newGold + " but actually: 999");
        User.findOneAndUpdate(query2, { $set: {
                gold: newGold
            }}, function(err, doc){
            if(err){
                //console.log("Something wrong when updating gold!");
                res.json({success: false, message: err});
            }
            else {
                //console.log("Updated Gold");
            }
        });
        res.json({success: true, message: 'Adventurer Bought, Gold Updated '});
    });
    /**
     * This route sells an Adventurer
     */
    router.put('/sellAdventurer', function (req, res){
        console.log(req.body);
        var desiredAdventurer = req.body.name;                //Adventurer to be sold
        var requestingUser = req.body.requestingUser;                     //User wanting to sell
        var marketplace = "marketplace";                            //Constant declaration of marketplace
        var cost = req.body.cost;                                           //Cost of adventurer
        var gold = req.body.goldData;                                       //User gold
        var newGold = gold+cost;
        var query = { name: desiredAdventurer };                    //Query for adventurer
        var query2 = { username: requestingUser };                          //Query for user

        console.log("Selling: " + desiredAdventurer);
        console.log("Selling Owner: " + requestingUser);
        console.log("Sale Value: " + cost);
        console.log("New Gold: " + newGold);
        Adventurer.findOneAndUpdate(query, { $set: {
                owner: marketplace
            }}, function(err, doc){
            if(err){
                console.log("Something wrong when selling adventurer!");
            }
            else{
                res.json({success: true, message: 'Adventurer Sold'});
            }
            //console.log(doc);
        });
        User.findOneAndUpdate(query2, { $set: {
                gold: newGold
            }}, function(err, doc){
            if(err){
                //console.log("Something wrong when updating gold!");
                res.json({success: false, message: err});
            }
            else {
                //console.log("Updated Gold");
            }
        });
    });

    /**
     * Guild upgrade related function
     * This function will take in the upgrade data and modify all the owners adventurers to account for the upgrade
     * It w
     */
    router.put('/guild/upgrade', function (req, res){
        var upgradeType = req.body.clicked;
        var userGold = req.body.goldData;
        var requestingUser = req.body.username;
        var query = { owner: requestingUser };                          //Query for user
        var upgradeStat = "default";
        var upgradeCost = req.body.upgradeCost;
        var newGold = userGold-upgradeCost;
        var query3 = { username: requestingUser };                          //Query for user
        console.log(upgradeType);
        console.log(userGold);
        console.log(requestingUser);


        //Model.update = function (query, doc, options, callback) { ... }
        //Model.update = function ({}, {cid: ''}, {multi: true}, function(err) { ... });
        //Get all adventurers that match query
        Adventurer.find(query, function(err, adventurers){
            //If query returned adventurers that match the condition
            if(adventurers){
                console.log("1. Adventurer.find was successful");
                //console.log(adventurers);
                var i;
                for(i in adventurers) {
                    var query2 = {name: adventurers[i].name};
                    var upgradeTo = 0;
                    //console.log(query2);
                    switch (upgradeType) {
                        case 1:
                            upgradeTo = (adventurers[i].atk) + 1;
                            upgradeStat = "atk";
                            console.log("Upgrade: " +query2.name + "'s " + upgradeStat + " to " + upgradeTo);
                            Adventurer.findOneAndUpdate(query2, {
                                    $set: {
                                        atk: upgradeTo
                                    }
                                },
                                function (err, res) {
                                    if (err) {
                                        console.log("Not Found nor upgraded");
                                        //console.log(res);
                                    }
                                    else {
                                        //console.log("Found and Upgraded: " + query2.name);
                                        //console.log(res);
                                    }
                                });
                            User.findOneAndUpdate(query3, { $set: {
                                    gold: newGold
                                }}, function(err, doc){
                                if(err){
                                    //console.log("Something wrong when updating gold!");
                                    res.json({success: false, message: err});
                                }
                                else {
                                    //console.log("Updated Gold");
                                }
                            });
                            break;
                        case 5:
                            upgradeTo = (adventurers[i].atk) + 15;
                            upgradeStat = "atk";
                            console.log("Upgrade: " +query2.name + "'s " + upgradeStat + " to " + upgradeTo);
                            Adventurer.findOneAndUpdate(query2, {
                                    $set: {
                                        atk: upgradeTo
                                    }
                                },
                                function (err, res) {
                                    if (err) {
                                        console.log("Not Found nor upgraded");
                                        //console.log(res);
                                    }
                                    else {
                                        //console.log("Found and Upgraded: " + query2.name);
                                        //console.log(res);
                                    }
                                });
                            User.findOneAndUpdate(query3, { $set: {
                                    gold: newGold
                                }}, function(err, doc){
                                if(err){
                                    //console.log("Something wrong when updating gold!");
                                    res.json({success: false, message: err});
                                }
                                else {
                                    //console.log("Updated Gold");
                                }
                            });
                            break;
                        case 2:
                            upgradeTo = (adventurers[i].def) + 1;
                            upgradeStat = "def";
                            console.log("Upgrade: " +query2.name + "'s " + upgradeStat + " to " + upgradeTo);
                            Adventurer.findOneAndUpdate(query2, {
                                    $set: {
                                        def: upgradeTo
                                    }
                                },
                                function (err, res) {
                                    if (err) {
                                        console.log("Not Found nor upgraded");
                                        //console.log(res);
                                    }
                                    else {
                                        //console.log("Found and Upgraded: " + query2.name);
                                        //console.log(res);
                                    }
                                });
                            User.findOneAndUpdate(query3, { $set: {
                                    gold: newGold
                                }}, function(err, doc){
                                if(err){
                                    //console.log("Something wrong when updating gold!");
                                    res.json({success: false, message: err});
                                }
                                else {
                                    //console.log("Updated Gold");
                                }
                            });
                            break;
                        case 6:
                            upgradeTo = (adventurers[i].def) + 15;
                            upgradeStat = "def";
                            console.log("Upgrade: " +query2.name + "'s " + upgradeStat + " to " + upgradeTo);
                            Adventurer.findOneAndUpdate(query2, {
                                    $set: {
                                        def: upgradeTo
                                    }
                                },
                                function (err, res) {
                                    if (err) {
                                        console.log("Not Found nor upgraded");
                                        //console.log(res);
                                    }
                                    else {
                                        //console.log("Found and Upgraded: " + query2.name);
                                        //console.log(res);
                                    }
                                });
                            User.findOneAndUpdate(query3, { $set: {
                                    gold: newGold
                                }}, function(err, doc){
                                if(err){
                                    //console.log("Something wrong when updating gold!");
                                    res.json({success: false, message: err});
                                }
                                else {
                                    //console.log("Updated Gold");
                                }
                            });
                            break;
                        case 3:
                            upgradeTo = (adventurers[i].hp) + 1;
                            upgradeStat = "hp";
                            console.log("Upgrade: " +query2.name + "'s " + upgradeStat + " to " + upgradeTo);
                            Adventurer.findOneAndUpdate(query2, {
                                    $set: {
                                        hp: upgradeTo
                                    }
                                },
                                function (err, res) {
                                    if (err) {
                                        console.log("Not Found nor upgraded");
                                        //console.log(res);
                                    }
                                    else {
                                        //console.log("Found and Upgraded: " + query2.name);
                                        //console.log(res);
                                    }
                                });
                            User.findOneAndUpdate(query3, { $set: {
                                    gold: newGold
                                }}, function(err, doc){
                                if(err){
                                    //console.log("Something wrong when updating gold!");
                                    res.json({success: false, message: err});
                                }
                                else {
                                    //console.log("Updated Gold");
                                }
                            });
                            break;
                        case 7:
                            upgradeTo = (adventurers[i].hp) + 15;
                            upgradeStat = "hp";
                            console.log("Upgrade: " +query2.name + "'s " + upgradeStat + " to " + upgradeTo);
                            Adventurer.findOneAndUpdate(query2, {
                                    $set: {
                                        hp: upgradeTo
                                    }
                                },
                                function (err, res) {
                                    if (err) {
                                        console.log("Not Found nor upgraded");
                                        //console.log(res);
                                    }
                                    else {
                                        //console.log("Found and Upgraded: " + query2.name);
                                        //console.log(res);
                                    }
                                });
                            User.findOneAndUpdate(query3, { $set: {
                                    gold: newGold
                                }}, function(err, doc){
                                if(err){
                                    //console.log("Something wrong when updating gold!");
                                    res.json({success: false, message: err});
                                }
                                else {
                                    //console.log("Updated Gold");
                                }
                            });
                            break;
                        case 4:
                            upgradeTo = (adventurers[i].cost) + 1;
                            upgradeStat = "cost";
                            console.log("Upgrade: " +query2.name + "'s " + upgradeStat + " to " + upgradeTo);
                            Adventurer.findOneAndUpdate(query2, {
                                    $set: {
                                        cost: upgradeTo
                                    }
                                },
                                function (err, res) {
                                    if (err) {
                                        console.log("Not Found nor upgraded");
                                        //console.log(res);
                                    }
                                    else {
                                        //console.log("Found and Upgraded: " + query2.name);
                                        //console.log(res);
                                    }
                                });
                            User.findOneAndUpdate(query3, { $set: {
                                    gold: newGold
                                }}, function(err, doc){
                                if(err){
                                    //console.log("Something wrong when updating gold!");
                                    res.json({success: false, message: err});
                                }
                                else {
                                    //console.log("Updated Gold");
                                }
                            });
                            break;
                        case 8:
                            upgradeTo = (adventurers[i].cost) + 15;
                            upgradeStat = "cost";
                            console.log("Upgrade: " +query2.name + "'s " + upgradeStat + " to " + upgradeTo);
                            Adventurer.findOneAndUpdate(query2, {
                                    $set: {
                                        cost: upgradeTo
                                    }
                                },
                                function (err, res) {
                                    if (err) {
                                        console.log("Not Found nor upgraded");
                                        //console.log(res);
                                    }
                                    else {
                                        //console.log("Found and Upgraded: " + query2.name);
                                        //console.log(res);
                                    }
                                });
                            User.findOneAndUpdate(query3, { $set: {
                                    gold: newGold
                                }}, function(err, doc){
                                if(err){
                                    //console.log("Something wrong when updating gold!");
                                    res.json({success: false, message: err});
                                }
                                else {
                                    //console.log("Updated Gold");
                                }
                            });
                            break;
                        default:
                            upgradeTo = 0;
                            upgradeStat = "default";
                    }
                }
            }
            else{
                console.log("1. Adventurer.find was NOT successful");
                console.log(err);
            }
        });
            res.json({success: true, message: "Updated Heroes"});
        });

    /**
     * Send a hero on an adventure - update the available date of the hero, update the owners gold
     */
    router.put('/goOnAdventure', function (req, res){
        //console.log("Reached API for goonadventure");
        var adventureHero = req.body.hero;
        var requestingUser = req.decoded.username;
        query4 = { username: requestingUser };
        query5 = { name: adventureHero };
        var today = new Date();
        var tomorrow = new Date();
        tomorrow.setDate(today.getDate()+1);
        var tomorrowAsIso = tomorrow.toISOString();
        console.log("Make: " + adventureHero + " available " + tomorrowAsIso);
        Adventurer.findOneAndUpdate(query5, { $set: { available: tomorrowAsIso }},
            function (err, res) {
                if (err) console.log("Not Found nor upgraded");
                else {
                    console.log("Found and Upgraded");
                    var rewardGold = battleCalculator(res);
                    console.log(rewardGold);
                    User.findOne(query4, function(err1, res1){
                        if(err1) console.log("Error");
                        else{
                            var userGold = res1.gold;
                            var newGold = userGold + rewardGold;
                            User.findOneAndUpdate(query4, { $set: {
                                    gold: newGold
                                }}, function(err2, res2){
                                if(err2){
                                    console.log("Something wrong when updating gold!");
                                    //res.json({success: false, message: err});
                                }
                                else{
                                    console.log("gold Updated")
                                }
                            });
                        }
                    });
                }
                //res.json({success:true, message: "What an Adventure!", reward: rewardGold});
            });
        //console.log("You Get: " + rewardGold);
        res.json({success:true, message: "What an Adventure!"});
    });

    /**
     * Get guildscore to create the leaderboard and return it
     * return $http.get('/api/leaderboard/').then(function(res){
     */

    router.get('/leaderboard', function (req, res){
        var marketplace = "marketplace";                            //Constant declaration of marketplace
        var ownersAndScores = {};
        var resultData = {};
        query6 = { owner: { $ne: marketplace } };

        Adventurer.find(query6, function(req, adventurers){

            for(j in adventurers) {
                var heroScore = 0;
                heroScore += (adventurers[j].atk + adventurers[j].def + adventurers[j].hp + adventurers[j].cost);
                ownersAndScores[adventurers[j].name] = { "name": adventurers[j].name, "heroScore": heroScore, "owner": adventurers[j].owner};
                //console.log(adventurers[j].name + ": " + heroScore + ", Owner: " + adventurers[j].owner);
            }
            console.log(ownersAndScores);
            res.json({success:true, message: "Os and Ss", ownersAndScores: ownersAndScores});
        });

        //get users
        /*User.find(query6).exec(function(req, users){
            //If values returned
            if(users){
                //for each user get their adventurers
                for(i in users){
                    var thisUser = users[i].username;
                    console.log(thisUser);
                    query7 = { owner: thisUser };
                    Adventurer.find(query7).exec(function(req, adventurers){
                        var playerScore = 0;
                        for(j in adventurers) {
                            /*var heroScore = 0;
                            heroScore += (adventurers[j].atk + adventurers[j].def + adventurers[j].hp + adventurers[j].cost);
                            //console.log(adventurers[j].name + ": " + heroScore + ", Owner: " + adventurers[j].owner);
                            //ownersAndScores[adventurers[i].name] = { "heroScore": heroScore, "owner": adventurers[i].owner};
                            playerScore += heroScore;
                            //console.log(playerScore);
                            console.log("......." + adventurers[j].name);
                        }

                    });


                }
            }
            //else
            else{
                console.log("No Adventurers found")
            }
        });*/
        //console.log(ownersAndScores);
        //console.log(resultData);
        //generate adventurer score
        //res.json({success:true, message: "Leaderboard"});

    });

    /*var jsonObj = {
    members:
           {
            host: "hostName",
            viewers:
            {
                user1: "value1",
                user2: "value2",
                user3: "value3"
            }
        }
}*/






    /**
     * Get decoded token data
     */
    router.post('/me', function(req, res){
        res.send(req.decoded);
    });
    //Returns router object - export whatever the route is to the server
    return router;
};

/**
 * This function will generate a random monster and make an adventurer "fight" it.
 * @param adventurer
 * @returns {number} The amount of gold that the adventurer gets from the adventure
 */
function battleCalculator(adventurer){
    //Adventurer Variables
    var reward = 100;
    var atk = adventurer.atk;
    var def = adventurer.def;
    var hp = adventurer.hp;
    var monster = randomMonster();
    //Combat
    if((monster[0] - atk) <= 0){
        reward += (atk - monster[0]);
    }
    else{
        console.log("You lost atk");
    }
    if((monster[1] - def) <= 0){
        reward += (def - monster[1]);
    }
    else{
        console.log("You lost def");
    }
    if((monster[2] - hp) <= 0){
        reward += (hp - monster[2]);
    }
    else{
        console.log("You lost hp");
    }
    return reward;
}

/**
 * Generates a random monster
 * @returns {*[]} the monster
 */
function randomMonster(){
    var monsterAtk = Math.floor((Math.random()* 1000)+1);
    var monsterDef = Math.floor((Math.random()* 1000)+1);
    var monsterHp = Math.floor((Math.random()* 1000)+1);
    var monster = [monsterAtk, monsterDef, monsterHp];
    console.log(monster.toString());
    return monster;
}