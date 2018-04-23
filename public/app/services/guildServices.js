/**
 * This class contains all the services related to managing the guild
 */
angular.module('guildServices', [])
    .factory('Gui', function($http){
        guildFactory = {};
        /**
         * Upgrade Guild Building
         */
        guildFactory.upgradeBuilding = function(clicked, goldData, username, upgradeCost){
            console.log("Upgrade a Building Clicked @ " + clicked + " gold: " + goldData + " username: " + username);
            //return $http.put('/api/guild/upgrade');
            var upgradeData = {
                "clicked"  :  clicked,
                "goldData"   :  goldData,
                "username"      :  username,
                "upgradeCost" : upgradeCost
            };
            return $http.put('/api/guild/upgrade', upgradeData).then(function(res){
                console.log(res);
                return res;
            });
        };
        return guildFactory;
    });