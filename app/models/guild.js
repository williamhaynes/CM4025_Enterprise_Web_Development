/**
 * Serverside adventurer related controls
 */

var mongoose = require('mongoose');                 //import mongoose, allow MongoDB connectivity
var Schema = mongoose.Schema;                       //Schema - allows you to create set JSON format documents to be used with MongoDB //More detail on sch

/**
 * Schema for Guild
 */

var GuildSchema = new Schema ({
    owner: { type: String},
    humandwellings: {type: Number},
    nonhumandwellings: {type: Number},
    swordsmith: {type: Number},
    armourer: {type: Number},
    medic: {type: Number},
    merchant: {type: Number}
});

module.exports = mongoose.model('Guild', GuildSchema);

/*
 class related dwellings +5 stat boost for class per level
 race related dwellings +1 stat boost per level
 atk related dwellings +3 stat boost per level
 def related dwellings +3 stat boost per level
 hp related dwellings +3 stat boost per level
 marketplace related dwellings -10% cost per level (stacks on 10%'s not cumalative ie, 10% off, then 10 % off remaining, not 20% off)
 */