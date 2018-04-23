/**
 * Rather than adding to the route with other controllers
 * mainController is injected to index to allow controller to maintain
 * on all views, since it controls the process of logging in
 * Currently the system does not clear the username or password field but persists them after values have been typed in, this is a potential security issue,
 * this has been resolved with page refreshing, this is inefficient but safe. If possible find a better solution.
 */

angular.module('mainController', ['authorizationServices', 'adventurerServices'])

.controller('mainCtrl', function(Auth, $timeout, $location, $rootScope, User, $scope){
    //Function for register button
    var app = this;

    //used to hide html until angular data has been grabbed
    app.loadme = false;

    //On every new view or route re-invoke everything inside here
    $rootScope.$on('$routeChangeStart', function(){
        /**
         * Check if user is logged in
         */
        if(Auth.isLoggedIn()){
            //console.log("Success: User is logged in");
            app.isLoggedIn = true;
            //If the User is logged in then get their data - this is taken from the token, so only changes on sign-in/out
            Auth.getUser().then(function(data){
                app.username = data.data.username;
                app.email = data.data.email;
                app.guildname = data.data.guildname;
                //app.gold = data.data.gold;
                //console.log(data);
                //console.log(data.data.guildname);
                app.loadme = true;
                //console.log(app.username);
                //Get the gold value for updating...
                User.getGold(app.username).then(function(data1){
                    //console.log("Get Gold Run!");
                    //console.log(data1);
                    app.gold = data1.data.gold;
                    //console.log("Gold: " + app.gold);
                });
            });

        }
        else{
            //console.log("Failure: User is not logged in");
            app.isLoggedIn = false;
            app.username = {};

            app.loadme = true;
        }
    });

    /**
     * Function for the register button
     */
    this.doLogin = function(logData){

        //Clear/set error/success message parameters
        app.loading = true;
        app.errorMsg = false;
        app.successMsg = false;

        //Attempt to login the user
            Auth.login(app.logData).then(function(data){
                //If successfully done, login the user
                if(data.data.success){
                    //Create success message
                    app.loading = false;
                    app.successMsg = data.data.message;
                    ////Redirect to the homepage with Timeout
                    $timeout(function(){
                        //redirect
                        $location.path('/');
                        //Clear login data
                        app.logData = {};
                        //clear success message
                        app.successMsg = false;
                    }, 1000);
                }
                //Else, return an error message
                else {
                    //Create error message
                    app.loading = false;
                    app.errorMsg = data.data.message;
                }
            });
    };
    /**
     * Function to logout the user
     * When logout is selected, log user out and redirect to logout page
     */
    this.logout = function(){
        Auth.logout();
        $location.path('/logout');
        $timeout(function(){
            $location.path('/')
        }, 2000);
    };

    //Function for the update Password form
    this.updUser1 = function(updateData){
        console.log('Started User Update');
        //Initialize variables
        var returnMsg = "";                         //String Variable for useful error messages
        var pMatch = false;                         //Boolean to store whether passwords match
        //Check to see if the passwords match
        if(app.updateData.newPassword == app.updateData.confirmNewPassword){
            pMatch = true;
        }
        else returnMsg = "Passwords Do Not Match";
        //add username to sent data
        app.updateData.username = app.username;
        app.updateData.updateType = 1;
        if(pMatch){
            User.updateUser(app.updateData).then(function(data){
                if(data.data.success){
                    //Create success message & show a loading bar
                    app.pSuccessMsg = data.data.message;
                    app.updated = true;
                    //Reset the modal
                    //Redirect to the account after a Timeout
                    $timeout(Auth.regenerate(), 100);
                    $timeout(function(){$location.path('/myAccount');}, 100);
                    $timeout(function(){$location.path('/');}, 100);
                } else {
                    //Create error message & show a loading bar
                    app.updated = false;
                    app.pErrorMsg = data.data.message;
                }
            });
        }
        else{
            app.updated = false;
            app.pErrorMsg = returnMsg;
        }
    };
    //Function for the update Email form
    this.updUser2 = function(updateData){
        console.log('Started Email Update');
        //Initialize variables
        var returnMsg = "";                         //String Variable for useful error messages
        var eMatch = false;                         //Boolean to store whether emails match
        //If the form email field matches the confirm email field
        if(app.updateData.newEmail == app.updateData.confirmNewEmail){
            //Make Boolean for passwords match true.
            eMatch = true;
        }
        else{
            returnMsg = "Emails Do Not Match";
        }
        //add username to sent data
        app.updateData.username = app.username;
        app.updateData.updateType = 2;
        if(eMatch){
            User.updateUser(app.updateData).then(function(data){
                if(data.data.success){
                    //Create success message & show a loading bar
                    app.eSuccessMsg = data.data.message;
                    app.updated = true;
                    //update the value on the account page
                    app.email = app.updateData.confirmNewEmail;
                    //Reset the modal
                    //Redirect to the account after a Timeout
                    $timeout(Auth.regenerate(), 100);
                    $timeout(function(){$location.path('/myAccount');}, 100);
                    $timeout(function(){$location.path('/');}, 100);
                } else {
                    //Create error message & show a loading bar
                    app.updated = false;
                    app.eErrorMsg = data.data.message;
                }

            });
        }
        else{
            app.updated = false;
            app.eErrorMsg = returnMsg;
        }
    };
    //Function for the update Guild Name form
    this.updUser3 = function(updateData){
        console.log('Started User Update');
        //Initialize variables
        var returnMsg = "";                         //String Variable for useful error messages
        var gMatch = false;                         //Boolean to store whether emails match
        //If the form email field matches the confirm email field
        if(app.updateData.newGuildName == app.updateData.confirmNewGuildName){
            //Make Boolean for passwords match true.
            gMatch = true;
        }
        else{
            returnMsg = "Passwords Do Not Match";
        }
        //add username to sent data
        app.updateData.username = app.username;
        app.updateData.updateType = 3;
        if(gMatch){
            User.updateUser(app.updateData).then(function(data){
                if(data.data.success){
                    app.updated = true;
                    //update the value on the account page
                    app.guildname = app.updateData.confirmNewGuildName;
                    //Reset the modal
                    //Redirect to the account after a Timeout
                    $timeout(Auth.regenerate(), 100);
                    $timeout(function(){$location.path('/myAccount');}, 100);
                    $timeout(function(){$location.path('/');}, 100);
                } else {
                    //Create error message & show a loading bar
                    app.updated = false;
                    app.gErrorMsg = data.data.message;
                }

            });
        }
        else{
            app.updated = false;
            app.gErrorMsg = returnMsg;
        }
    }

    /**
     * Functions to buy
     */
});

