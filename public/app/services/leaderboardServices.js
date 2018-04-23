angular.module('leaderboardServices', [])
    .factory('Leader', function($http) {
        leaderFactory = {};
        /**
         * Get Leaderboard
         */
        //Get a single users adventurers
        leaderFactory.getLB = function(){
            //console.log("off I go to /api/adventurers");
            return $http.get('/api/leaderboard').then(function(res){
                console.log(res);
                return res;
            });
        };
        return leaderFactory;
    });