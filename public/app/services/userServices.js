/**
 * Factory to post create user function - for registration process
 */

angular.module('userServices', [])
    .factory('User', function($http){
        userFactory = {};

        //Create a new User
        userFactory.create = function(regData){
            console.log('Attempting to create user');
            return $http.post('/api/users', regData);
        };

        //Update a User
        userFactory.updateUser = function(updateData){
            console.log('Attempting to update user');
            return $http.put('/api/users', updateData).then(function(res){
                console.log(res);
                return res;
            });
        };

        //Delete a User
        userFactory.delete = function(id){
            return $http.delete('/api/users/' + id);
        };

        //Get a single users adventurers
        userFactory.get =function(){
            return $http.get('/api/users/:user_id');
        };

        //Get users gold value
        userFactory.getGold = function(user){
            //console.log(user);
            //console.log("In Services - get gold for: " + user);
            return $http.get('/api/myGold/' + user).then(function(res){
                //console.log("Res: ");
                //console.log(res);
                return res;
            });
        };

        //Get all users
        /**
         * Admin only route - currently very dangerous
         */
        userFactory.get =function(){
            return $http.get('/api/users');
        };

        //Get marketplace heroes
        userFactory.get = function(){
            return $http.put('/api/marketplace');
        };

        /**
         * Create Adventurer
         * @param advData
         * @returns {*|IDBRequest|Promise<void>}
         */
        /*userFactory.create = function(advData){
            return $http.put('/api/adventurer', advData);
        };*/


        return userFactory;
    });
