/**
 * This class contains all the services related to managing adventurers
 * Allows adventurers to be bought to user
 * Allows adventurers to be sold to marketplace
 */
angular.module('adventurerServices', [])
    .factory('Adv', function($http){
        adventurerFactory = {};

        /**
         * Create a new adventurer
         */
        adventurerFactory.create = function(adventurerData){
            return $http.post('/api/adventurer', adventurerData)
        };
        /**
         * Get users adventurers
         */
        //Get a single users adventurers
        adventurerFactory.get = function(){
            //console.log("off I go to /api/adventurers");
            return $http.get('/api/adventurers/');
        };

        /**
         * Get marketplace adventurers
         */
        adventurerFactory.getMarketplace = function(){
            //console.log("off I go to /api/adventurers/marketplace");
            return $http.get('/api/adventurers/marketplace/');
        };

        /**
         * Purchase an adventurer from the marketplace - changes the owner to player
         */
        adventurerFactory.buyAdventurer = function(purchaseData){
            //console.log("off I go to /api/buyAdventurer");
            return $http.put('/api/buyAdventurer', purchaseData).then(function(res){
                console.log(res);
                return res;
            });
        };

        /**
         * Sell an adventurer to the marketplace - changes the owner to marketplace
         */
        adventurerFactory.sellAdventurer = function(saleData){
            console.log("off I go to /api/sellAdventurer");
            return $http.put('/api/sellAdventurer', saleData).then(function(res){
                console.log(res);
                return res;
            });
        };

        /**
         * Send an adventurer on an adventure
         */
        adventurerFactory.goOnAdventure = function(adventureData){
            console.log("off I go to /api/goOnAdventure");
            return $http.put('/api/goOnAdventure/', adventureData).then(function(res){
                console.log(res);
                return res;
            })
        };



        return adventurerFactory;
    });


/*
Complete list of shortcut methods:

$http.get
$http.head
$http.post
$http.put
$http.delete
$http.jsonp
$http.patch
 */