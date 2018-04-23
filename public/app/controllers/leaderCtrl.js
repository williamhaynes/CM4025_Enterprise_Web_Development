/**
 *  Leader Controller related functions for leaderboard details
 */

angular.module('leaderController', ['leaderboardServices'])
    .controller('leaderCtrl', function($timeout, $location, Auth, Leader) {
        var app = this;
        if(Auth.isLoggedIn) {
            //Adv.get
            app.leaderboard = [];
            //console.log("Hello Potato");
                Leader.getLB().then(function(data){
                    app.leaderboard = data.data.ownersAndScores;
                    console.log("Back from request");
                });
        }
        else{
            console.log("Failed to access Adv");
        }


    });