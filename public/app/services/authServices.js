//console.log("testing auth services connectivity");
/**
 * This class contains all the services related to authorizing the connectivity of a user
 * Specifically it generates tokens on successful login
 * Checks for token
 * Allows users to login
 * Allows users to logout
 */
angular.module('authorizationServices', [])

    /**
     * Factory to login
     */
    .factory('Auth', function($http, AuthToken){
        var authFactory = {};
        //Auth.login(logData)
        // Login function called when login button pushed
        authFactory.login = function(logData){
            return $http.post('/api/authenticate', logData).then(function(data){
                AuthToken.setToken(data.data.token);
                return data;
            });
        };
        // Auth.isLoggedIn()
        // Function which returns Boolean on whether the user is logged in or not
        authFactory.isLoggedIn = function(){
            //If the user is logged in then return true
            if(AuthToken.getToken()){
                return true;
            }
            //Else return false - the user is not logged in
            else{
                return false;
            }
        };
        authFactory.regenerate = function(){
            console.log("Running Regeneration Service!");
            return $http.get('/regenerate').then(function(data){
                console.log("Regeneration Complete!");
                AuthToken.setToken(data.data.token);
                alert("Details Updated: You must sign back in");
               return data;
            });
        };
        /**
         * This function needs to be built
         * Currently it will say true
         * @returns {boolean}
         */
        //Auth.isAdministrator()
        authFactory.isAdministrator = function(){
            //If the user is an Administrator
            if(true){
                return true;
            }
            //Else return false - the user is not Admin
            else{
                return false;
            }
        };

        //Auth.getUser
        authFactory.getUser = function(){
            if(AuthToken.getToken()){
                return $http.post('/api/me')
            }
            else{
                $q.reject({message: 'User has no token'});
            }
        };

        // Auth.logout()
        // Function to logout user
        authFactory.logout = function(){
            //removes the token
            AuthToken.setToken();
        };

        return authFactory;
    })

    /**
     * Factory to set the token and push to browser
     */
    .factory('AuthToken', function($window){
        var authTokenFactory = {};

        authTokenFactory.setToken = function(token){
            //Save token into the local storage of the browsers
            if(token) {
                $window.localStorage.setItem('token', token);
            }
            else{
                $window.localStorage.removeItem('token');
            }
        };
        authTokenFactory.getToken = function(){
          return  $window.localStorage.getItem('token');
        };
        return authTokenFactory;
    })

    /**
     * Factory which detects for tokens on every request
     */
    .factory('AuthInterceptors', function(AuthToken){
        var authInterceptorsFactory = {};

        authInterceptorsFactory.request = function(config) {
            var token = AuthToken.getToken();

            if (token) {
                config.headers['x-access-token'] = token;
            }


            return config;
        }

        return authInterceptorsFactory;
    })