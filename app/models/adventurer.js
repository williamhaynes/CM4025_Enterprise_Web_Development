/**
 * Serverside adventurer related controls
 */

var mongoose = require('mongoose');                 //import mongoose, allow MongoDB connectivity
var Schema = mongoose.Schema;                       //Schema - allows you to create set JSON format documents to be used with MongoDB //More detail on sch

/**
 * Schema for Adventurers
 */
var AdventurerSchema = new Schema ({
    owner: { type: String},                                         //The Owner of the Adventurer
    name: { type: String, index: {unique: true} },                  //Adventurers Name
    class: { type: String},                                         //Adventurers Class
    race:  { type: String},                                         //Adventurers Race
    atk: {type: Number},                                            //Adventurers Attack Stat
    def: {type: Number},                                            //Adventurers Defence Stat
    hp: {type: Number},                                             //Adventurers Hitpoints
    cost: {type: Number},                                           //Adventurers Value exemplified by the cost to buy them
    available: {type: Date, default: Date.now}                      //Adventurer available on this date
});

module.exports = mongoose.model('Adventurer', AdventurerSchema);